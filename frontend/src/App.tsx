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
import EditCourse from "./pages/EditCourse";
import AdminInstructorApproval from "./pages/AdminInstructorApproval";
import AdminCategories from "./pages/AdminCategories";
import Courses from "./pages/Courses";
import SingleCourse from "./pages/SingleCourse";
import CourseAccessPage from "./pages/CourseAccessPage";
import AdminDeletedCourses from "./pages/AdminDeletedCourses";
import AdminCourseApproval from "./pages/AdminCourseApproval";
import AdminReports from "./pages/AdminReports";
import UserAnalyticsPage from "./pages/UserAnalyticsPage";
import OrderAnalyticsPage from "./pages/OrderAnalyticsPage";
import CourseAnalyticsPage from "./pages/CourseAnalyticsPage";
import MyCourses from "./pages/MyCourses";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<SingleCourse />} />

        <Route element={<PrivateRoute />}>
          {/* <Route path="/course/:id" element={<SingleCourse />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/course-access/:id" element={<CourseAccessPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor/dashboard" element={<Instructor />} />
          <Route path="/instructor/myteachings" element={<MyTeachings />} />
          <Route path="/instructor/createcourse" element={<CreateCourse />} />
          <Route path="/instructor/edit-course/:id" element={<EditCourse />} />
        </Route>

        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route
            path="/admin/instructor-approval"
            element={<AdminInstructorApproval />}
          />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route
            path="/admin/course-details/:id"
            element={<AdminCourseView />}
          />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/report" element={<AdminReports />} />
          <Route path="/admin/useranalytics" element={<UserAnalyticsPage />} />
          <Route
            path="/admin/orderanalytics"
            element={<OrderAnalyticsPage />}
          />
          <Route
            path="/admin/courseanalytics"
            element={<CourseAnalyticsPage />}
          />
          <Route
            path="/admin/deletedcourses"
            element={<AdminDeletedCourses />}
          />
          <Route
            path="/admin/course-approval"
            element={<AdminCourseApproval />}
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
