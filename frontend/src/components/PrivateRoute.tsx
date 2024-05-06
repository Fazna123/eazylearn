import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state: any) => state.user);

  //return currentUser ? <Outlet /> : <Navigate to="/signin" />;
  const activeUser = currentUser.user.isBlock === false;
  return activeUser ? <Outlet /> : <Navigate to="/signin" />;
}
