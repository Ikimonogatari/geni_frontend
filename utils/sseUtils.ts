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

  // Get auth token from cookies - use 'authToken' which is the correct cookie name
  const authToken =
    Cookies.get("authToken") ||
    document.cookie.split("authToken=")[1]?.split(";")[0];

  if (!authToken) {
    onError(new Error("Not authenticated"));
    return { close: () => {} };
  }

  let isActive = true;
  let controller = new AbortController();
  let lastStatus = false;

  const startMonitoring = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_AWS_URL || "";
    const apiUrl = `${baseUrl}api/web/private/payment/${txId}`;

    console.log(`Starting payment monitor for: ${apiUrl}`);

    try {
      // Use fetch with Authorization header
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
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
          const events = buffer.split("\n\n");
          buffer = events.pop() || ""; // Keep the unfinished part

          for (const eventText of events) {
            if (!eventText.trim()) continue;

            // Process each line of the event
            const lines = eventText.split("\n");
            let currentData = {};

            for (const line of lines) {
              if (line.startsWith("data:")) {
                const dataContent = line.substring(5).trim();

                try {
                  // Try to parse as JSON first
                  try {
                    currentData = JSON.parse(dataContent);
                  } catch (jsonError) {
                    // Handle "status: true/false" format
                    if (dataContent.includes("status:")) {
                      const statusValue = dataContent.includes("true");
                      currentData = {
                        status: statusValue,
                        isPaid: statusValue,
                      };
                      console.log("Parsed status value:", statusValue);
                    }
                    // Handle plain boolean values
                    else if (dataContent === "true") {
                      currentData = { isPaid: true, status: true };
                    } else if (dataContent === "false") {
                      currentData = { isPaid: false, status: false };
                    } else {
                      // Try to extract JSON from a mixed format
                      const jsonMatch = dataContent.match(/\{.*\}/);
                      if (jsonMatch) {
                        try {
                          currentData = JSON.parse(jsonMatch[0]);
                        } catch (e) {
                          console.error("Failed to extract JSON:", e);
                        }
                      }
                    }
                  }

                  console.log("Received payment data:", currentData);

                  // Check if status changed from previous state
                  const isPaid = !!(
                    currentData["isPaid"] ||
                    currentData["IsPaid"] ||
                    currentData["status"]
                  );

                  if (isPaid !== lastStatus) {
                    console.log(
                      `Payment status changed: ${lastStatus} -> ${isPaid}`
                    );
                    lastStatus = isPaid;

                    if (isPaid) {
                      console.log("Payment successful!");
                      onPaymentSuccess();
                      isActive = false;
                      return;
                    }
                  }
                } catch (err) {
                  console.error("Error processing SSE data:", err);
                }
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

export const createStorepayStatusMonitor = (
  txId: string,
  onPaymentSuccess: () => void,
  onError: (error: any) => void
) => {
  if (!txId) {
    onError(new Error("Transaction ID is required"));
    return { close: () => {} };
  }

  const authToken =
    Cookies.get("auth") ||
    document.cookie.split("authToken=")[1]?.split(";")[0];

  if (!authToken) {
    onError(new Error("Not authenticated"));
    return { close: () => {} };
  }

  let isActive = true;
  let controller = new AbortController();
  let lastStatus = false;

  const startMonitoring = async () => {
    let baseUrl = process.env.NEXT_PUBLIC_AWS_URL || "";
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    const apiUrl = `${baseUrl}/api/web/private/payment/storepay/status/${txId}`;

    console.log(`Starting payment monitor for: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
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
          const events = buffer.split("\n\n");
          buffer = events.pop() || ""; // Keep the unfinished part

          for (const eventText of events) {
            if (!eventText.trim()) continue;

            // Process each line of the event
            const lines = eventText.split("\n");
            let currentData = {};

            for (const line of lines) {
              if (line.startsWith("data:")) {
                const dataContent = line.substring(5).trim();

                try {
                  // Try to parse as JSON first
                  try {
                    currentData = JSON.parse(dataContent);
                  } catch (jsonError) {
                    console.log("json error", jsonError);
                  }

                  console.log("Received payment data:", currentData);

                  const isPaid = !!(currentData["is_confirmed"] == true);

                  if (isPaid !== lastStatus) {
                    console.log(
                      `Payment status changed: ${lastStatus} -> ${isPaid}`
                    );
                    lastStatus = isPaid;

                    if (isPaid) {
                      console.log("Payment successful!");
                      onPaymentSuccess();
                      isActive = false;
                      return;
                    }
                  }
                } catch (err) {
                  console.error("Error processing SSE data:", err);
                }
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

  startMonitoring();

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
