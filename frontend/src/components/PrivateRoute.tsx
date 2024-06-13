import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../utils/UserContext";
//import Spinner from "./Spinner";

export default function PrivateRoute() {
  //const { currentUser } = useSelector((state: any) => state.user);

  const userContext = useUser();

  if (!userContext) {
    return <Navigate to="/signin" />;
  }

  const { currentUser, loading, fetchMyData } = userContext;

  useEffect(() => {
    fetchMyData();
  }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }
  const activeUser = currentUser && currentUser.user?.isBlock === false;
  //return currentUser ? <Outlet /> : <Navigate to="/signin" />;
  //const activeUser = currentUser.user.isBlock === false;
  return activeUser ? <Outlet /> : <Navigate to="/signin" />;
}
