import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import AdminInstructorsList from "../components/admin/AdminInstructorLIst";

const AdminInstructors = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminInstructorsList />
    </div>
  );
};

export default AdminInstructors;
