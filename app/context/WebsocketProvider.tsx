import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { messageHandlers } from "@/components/handlers/messageHandlers";

const WebSocketContext = createContext(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const connectingRef = useRef(false);

  useEffect(() => {
    const token = Cookies.get("auth");

    if (!isConnected && !connectingRef.current && token) {
      connectingRef.current = true;
      connectWebSocket(token);
    }

    return () => {
      if (socketRef.current) {
        console.log("Cleaning up WebSocket connection");
        socketRef.current.close();
        socketRef.current = null;
        setIsConnected(false);
        connectingRef.current = false;
      }
    };
  }, []);

  const connectWebSocket = (token: string) => {
    if (socketRef.current || connectingRef.current) {
      console.log("WebSocket already connecting or connected");
      return;
    }

    try {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL}/api/web/ws`
      );
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        connectingRef.current = false;
        socket.send(JSON.stringify({ type: "auth", token }));
      };

      socket.onclose = (event) => {
        console.log("WebSocket disconnected", event.code, event.reason);
        setIsConnected(false);
        socketRef.current = null;
        connectingRef.current = false;

        // Attempt to reconnect after a delay (optional)
        if (event.code !== 1000) {
          // Not a normal closure
          setTimeout(() => {
            const newToken = Cookies.get("auth");
            if (newToken && !connectingRef.current) {
              console.log("Attempting to reconnect...");
              connectWebSocket(newToken);
            }
          }, 3000);
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        connectingRef.current = false;
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const { type, data } = message;

          const handler = messageHandlers[type];

          if (handler) {
            handler(data);
          } else {
            console.warn("No handler for message type:", type);
          }
        } catch (err) {
          console.error("Invalid WebSocket message:", event.data, err);
        }
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      connectingRef.current = false;
    }
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close(1000, "Manual disconnect");
      socketRef.current = null;
      setIsConnected(false);
      connectingRef.current = false;
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        connectWebSocket,
        disconnectWebSocket,
        socket: socketRef.current,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
