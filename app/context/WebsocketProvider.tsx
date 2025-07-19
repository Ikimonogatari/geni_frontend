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

  useEffect(() => {
    if (!isConnected) {
      connectWebSocket(Cookies.get("auth"));
      console.log("socket connect from useEffect");
    }
  }, [isConnected]);

  const connectWebSocket = (token: string) => {
    if (socketRef.current) return;

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/api/web/ws`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      socket.send(JSON.stringify({ type: "auth", token }));
    };

    socket.onclose = () => {
      setIsConnected(false);
      socketRef.current = null;
      console.log("WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
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
  };

  const disconnectWebSocket = () => {
    socketRef.current?.close();
    socketRef.current = null;
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
