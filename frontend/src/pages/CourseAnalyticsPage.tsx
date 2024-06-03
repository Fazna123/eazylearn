import CourseAnalytics from "../components/admin/CourseAnalytics";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

type Props = {};

const CourseAnalyticsPage = (props: Props) => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <CourseAnalytics />
    </div>
  );
};

export default CourseAnalyticsPage;
