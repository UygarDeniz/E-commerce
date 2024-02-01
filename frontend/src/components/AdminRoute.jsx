import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default AdminRoute;
