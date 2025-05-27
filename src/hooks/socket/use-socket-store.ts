import { create } from "zustand";
import { io, Socket, SocketOptions } from "socket.io-client";
import { Nullable } from "@/types/common";

type SocketState = {
  socket: Nullable<Socket>;
  isConnected: boolean;
  connectSocket: (userId: string, options?: SocketOptions) => Nullable<Socket>;
  disconnectSocket: () => void;
};

export const useSocketStore = create<SocketState>((set, get) => {
  let socketRef: Nullable<Socket> = null;

  const connectSocket = (userId: string, options: SocketOptions = {}): Nullable<Socket> => {
    if (socketRef?.connected) {
      return socketRef;
    }

    if (socketRef) {
      socketRef.disconnect();
      socketRef = null;
    }

    try {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
        query: { userId },
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        ...options,
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        set({ isConnected: true });
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        set({ isConnected: false });
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        set({ isConnected: false });
      });

      newSocket.on("reconnect", (attemptNumber) => {
        console.log("Socket reconnected after", attemptNumber, "attempts");
        set({ isConnected: true });
      });

      newSocket.on("reconnect_error", (error) => {
        console.error("Socket reconnection error:", error);
      });

      socketRef = newSocket;
      set({ socket: newSocket });
      return newSocket;
    } catch (error) {
      console.error("Failed to create socket connection:", error);
      return null;
    }
  };

  const disconnectSocket = () => {
    if (socketRef) {
      socketRef.disconnect();
      socketRef = null;
      set({ socket: null, isConnected: false });
      console.log("Socket disconnected manually");
    }
  };

  return {
    socket: null,
    isConnected: false,
    connectSocket,
    disconnectSocket,
  };
});
