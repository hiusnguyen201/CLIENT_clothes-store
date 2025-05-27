import { useEffect } from "react";
import { useSocketStore } from "./use-socket-store";

export const useSocketEvent = <T = any>(
  eventName: string,
  handler: (data: T) => void,
  deps: React.DependencyList = []
): void => {
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (socket) {
      socket.on(eventName, handler);
      return () => {
        socket.off(eventName, handler);
      };
    }
  }, [socket, eventName, ...deps]);
};
