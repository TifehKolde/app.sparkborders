// components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useVerifyToken } from "../api/hooks/useVerifyToken";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useVerifyToken();
  const location = useLocation(); // ✅ Capture where the user was trying to go

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data?.success) {
    toast.error("Session expired. Please log in again.");

    // ✅ Redirect to login with original path preserved
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  // ✅ Render protected content
  return <Outlet />;
}
