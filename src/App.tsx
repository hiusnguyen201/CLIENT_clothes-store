import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigate, useLocation } from "react-router-dom";
import { useSocketStore } from "./hooks/socket/use-socket-store";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const { isInitialized, user } = useAuth();
  const { connectSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    if (user?.id) {
      connectSocket(user.id);
    } else {
      disconnectSocket();
    }
  }, [user, connectSocket, disconnectSocket]);

  if (location.pathname === "/") {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div>
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
