/**
 * Server-Sent Events utility for payment status monitoring
 */
import Cookies from "js-cookie";

/**
 * Creates a payment status monitor with proper Authorization header
 * @param txId The transaction ID to monitor
 * @param onPaymentSuccess Callback function when payment is successful
 * @param onError Callback function when an error occurs
 * @returns Object with close method to stop the monitor
 */
export const createPaymentStatusMonitor = (
  txId: string,
  onPaymentSuccess: () => void,
  onError: (error: any) => void
) => {
  if (!txId) {
    onError(new Error("Transaction ID is required"));
    return { close: () => {} };
  }

  // Get auth token from cookies
  const authToken = Cookies.get("auth");

  if (!authToken) {
    onError(new Error("Not authenticated"));
    return { close: () => {} };
  }

  let isActive = true;
  let controller = new AbortController();

  const startMonitoring = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_AWS_URL || "";
    const apiUrl = `${baseUrl}/api/web/private/payment/${txId}`;

    console.log(`Starting payment monitor for: ${apiUrl}`);

    try {
      // Use fetch with Authorization header
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "text/event-stream",
        },
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Process the SSE stream
      while (isActive) {
        try {
          const { done, value } = await reader.read();

          if (done) {
            console.log("Stream closed by server");
            break;
          }

          // Decode chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });

          // Log raw buffer for debugging
          console.log("Raw SSE data received:", buffer);

          // Process complete events in buffer
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || ""; // Keep the unfinished part

          for (const eventText of lines) {
            if (!eventText.trim()) continue;

            // Extract and parse data
            const dataMatch = eventText.match(/data: (.+)$/m);
            if (dataMatch && dataMatch[1]) {
              try {
                // Trim the data to remove any whitespace
                const trimmedData = dataMatch[1].trim();
                console.log("Attempting to parse:", trimmedData);

                // Handle different data formats
                let data;
                try {
                  // Try standard JSON parse
                  data = JSON.parse(trimmedData);
                } catch (jsonError) {
                  console.log(
                    "Standard JSON parse failed, trying alternative approaches"
                  );

                  // Check if it's a boolean string "true" or "false"
                  if (trimmedData === "true") {
                    data = { isPaid: true };
                  } else if (trimmedData === "false") {
                    data = { isPaid: false };
                  } else {
                    // Try to extract a valid JSON part if any
                    const possibleJsonMatch = trimmedData.match(/\{.*\}/);
                    if (possibleJsonMatch) {
                      try {
                        data = JSON.parse(possibleJsonMatch[0]);
                      } catch (e) {
                        // Still failed, log the error
                        console.error("Could not extract valid JSON:", e);
                        throw jsonError; // throw the original error
                      }
                    } else {
                      throw jsonError; // throw the original error
                    }
                  }
                }

                console.log("Received payment data:", data);

                // Check both possible property names: isPaid and IsPaid
                if (data && (data.isPaid === true || data.IsPaid === true)) {
                  console.log("Payment successful!");
                  onPaymentSuccess();
                  isActive = false;
                  return;
                }
              } catch (err) {
                console.error("Error parsing SSE data:", err);
                console.error("Raw data that failed to parse:", dataMatch[1]);
              }
            }
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Stream reading aborted");
            break;
          }
          console.error("Error reading stream:", err);
          onError(err);
          break;
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Payment monitoring error:", error);
        onError(error);
      }
    }
  };

  // Start the monitoring process
  startMonitoring();

  // Return control object
  return {
    close: () => {
      console.log("Closing payment monitor");
      isActive = false;
      controller.abort();
    },
  };
};

/**
 * Safely closes a payment monitor
 * @param monitor The payment monitor to close
 */
export const closePaymentMonitor = (
  monitor?: { close: () => void } | null
): void => {
  if (monitor) {
    monitor.close();
  }
};
