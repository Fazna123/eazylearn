import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state: any) => state.user);
  let activeUser;
  if (!currentUser) {
    activeUser = false;
  } else {
    activeUser = currentUser.user.isBlock === false;
  }

  //return currentUser ? <Outlet /> : <Navigate to="/signin" />;
  //const activeUser = currentUser.user.isBlock === false;
  return activeUser ? <Outlet /> : <Navigate to="/signin" />;
}
