import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
  isHybrid?: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { singnedIn, user } = useAuth();
  console.log("🚀 ~ AuthGuard ~ user:", user)

  if (!singnedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && singnedIn) {
      return <Navigate to="/home" replace />;
  }
  return <Outlet />;
}
