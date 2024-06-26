import AdminCourseReportsList from "../components/admin/AdminCourseReportsList";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

function AdminCourseReports() {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminCourseReportsList />
    </div>
  );
}

export default AdminCourseReports;
