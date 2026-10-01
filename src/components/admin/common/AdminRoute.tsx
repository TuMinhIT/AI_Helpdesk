import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/app/store/authStore";
import AccessDenied from "@/components/common/AccessDenied";
import { hasAllowedRole } from "./adminRoles";

type AdminRouteProps = {
  allowedRoles?: readonly string[];
};

const AdminRoute = ({ allowedRoles = ["admin"] }: AdminRouteProps) => {
  const { user, accessToken, isSessionReady } = useAuth();

  if (!isSessionReady) {
    return <div aria-busy="true" className="min-h-screen" />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !hasAllowedRole(user.role, allowedRoles)) {
    return <AccessDenied />;
  }

  return <Outlet />;
};

export default AdminRoute;
