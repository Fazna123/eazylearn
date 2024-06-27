import CourseAnalytics from "../components/admin/CourseAnalytics";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

const CourseAnalyticsPage = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <CourseAnalytics />
    </div>
  );
};

export default CourseAnalyticsPage;
