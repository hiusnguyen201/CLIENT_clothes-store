import { Router } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigate, useLocation } from "react-router-dom";
import { useSocketStore } from "./hooks/socket/use-socket-store";
import { useEffect } from "react";

function App() {
  const { isInitialized, user } = useAuth();
  const { connectSocket } = useSocketStore();
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={"/dashboard"} replace />;
  }

  useEffect(() => {
    if (!user) return;
    connectSocket(user.id);
  }, [user]);

  return (
    <div>
      {isInitialized ? <Router /> : <LoadingScreen />}
      <Toaster />
    </div>
  );
}

export default App;
