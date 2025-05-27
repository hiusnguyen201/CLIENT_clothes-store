import { useCallback } from "react";
import { useSocketStore } from "./use-socket-store";

export const useSocketEmit = () => {
  const socket = useSocketStore((state) => state.socket);

  return useCallback(
    (eventName: string, data?: any): void => {
      if (socket?.connected) {
        socket.emit(eventName, data);
      } else {
        console.warn(`Cannot emit ${eventName}: Socket not connected`);
      }
    },
    [socket]
  );
};
