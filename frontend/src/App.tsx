import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import Otp from "./pages/Otp";
import PrivateRoute from "./components/PrivateRoute";
import Instructor from "./pages/Instructor";
import MyTeachings from "./pages/MyTeachings";
import Admin from "./pages/Admin";
import CreateCourse from "./pages/CreateCourse";
import AdminCourses from "./pages/AdminCourses";
import AdminCourseView from "./pages/AdminCourseView";
import AdminInstructors from "./pages/AdminInstructors";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor/dashboard" element={<Instructor />} />
          <Route path="/instructor/myteachings" element={<MyTeachings />} />
          <Route path="/instructor/createcourse" element={<CreateCourse />} />
        </Route>

        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route
            path="/admin/course-details/:id"
            element={<AdminCourseView />}
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
