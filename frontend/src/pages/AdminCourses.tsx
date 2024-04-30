import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import AdminCourseList from "../components/admin/AdminCourseList";

const AdminCourses = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminCourseList />
    </div>
  );
};

export default AdminCourses;
