import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../utils/endPoint";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMyData = async () => {
    try {
      console.log("fetchMyData called");
      setLoading(true);
      const { success, error, data } = await getMyInfo();
      if (success) {
        setLoading(false);
        if (data?.user?.isBlock === true) {
          setCurrentUser(null);
          console.log("current user", currentUser);
          await fetch("/api/user/logout"); // Ensure user is logged out
          dispatch(signOut());
          navigate("/signin");
        } else {
          setCurrentUser(data);
          console.log("My Details", data);
        }
      } else {
        setLoading(false);
        console.error("Error fetching user info:", error);
        setCurrentUser(null);
        dispatch(signOut());
        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
      console.error("Unexpected error:", error);
      setCurrentUser(null);
      dispatch(signOut());
      navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading, fetchMyData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
