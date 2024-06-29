import { useDispatch, useSelector } from "react-redux";
//import InstructorApproval from "./InstructorApproval";
import InstructorDashboard from "./InstructorDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstructorAuthorize from "./InstructorAuthorize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../utils/endPoint";
import { signOut } from "../redux/user/userSlice";
import { BASE_URL } from "../utils/api";
//import SignIn from "./SignIn";

export default function Instructor() {
  const { currentUser } = useSelector((state: any) => state.user);
  //const navigate = useNavigate()
  // if (!currentUser) {
  //   return <SignIn />;
  // }

  const role: boolean = currentUser && currentUser.user.role === "instructor";
  const [, setFetching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyInfo = async () => {
      setFetching(true);
      const { success, error, data } = await getMyInfo();
      if (success) {
        if (data.user.isBlock === true) {
          await fetch(`${BASE_URL}/api/user/logout`, {
            headers: {
              "Content-Type": "application/json",
              // Add any other headers you need
            },
            credentials: "include", // Include cookies in the request
          });
          dispatch(signOut());
          navigate("/signin");
        }
      } else {
        console.log(error);
      }
      setFetching(false);
    };
    fetchMyInfo();
  }, []);

  return (
    <>
      <Header />
      {role ? <InstructorDashboard /> : <InstructorAuthorize />}
      <Footer />
    </>
  );
}
