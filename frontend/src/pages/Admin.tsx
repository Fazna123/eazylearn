import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import Dashboard from "../components/admin/Dashboard";

export default function AdminCourses() {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <Dashboard isDashboard={true} />
    </div>
  );
}
