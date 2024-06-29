import Header from "../components/Header";
import Footer from "../components/Footer";
import MyCourseList from "../components/MyCourseList";
import { useEffect, useState } from "react";
import { getMyInfo } from "../utils/endPoint";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";
// import { useEffect } from "react";
// import { getMyInfo } from "../utils/endPoint";
// import { signOut, updateUserSuccess } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";

const MyCourses = () => {
  const [, setFetching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyInfo = async () => {
      setFetching(true);
      const { success, error, data } = await getMyInfo();
      if (success) {
        if (data.user.isBlock === true) {
          await fetch(`${BASE_URL}/api/user/logout`);
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
      <MyCourseList />
      <Footer />
    </>
  );
};

export default MyCourses;
