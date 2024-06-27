import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { currentAdmin } = useSelector((state: any) => state.admin);
  return currentAdmin ? <Outlet /> : <Navigate to="/admin-sign-in" />;
}
