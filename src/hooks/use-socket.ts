import { io } from "socket.io-client";
import { useAuth } from "./use-auth";

export const useSocket = () => {
  const { user } = useAuth();
  return io(import.meta.env.VITE_SOCKET_URL, {
    query: {
      userId: user?.id,
    },
    withCredentials: true,
  });
};
