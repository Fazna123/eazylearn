import AdminReportsList from "../components/admin/AdminReportsList";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

const AdminCourses = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminReportsList isDashboard={false} />
    </div>
  );
};

export default AdminCourses;
