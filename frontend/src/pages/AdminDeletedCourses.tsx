import AdminDeleteCourseList from "../components/admin/AdminDeleteCourseList";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

const AdminDeletedCourses = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminDeleteCourseList />
    </div>
  );
};

export default AdminDeletedCourses;
