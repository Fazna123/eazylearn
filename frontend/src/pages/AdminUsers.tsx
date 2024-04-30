import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import AdminStudentsList from "../components/admin/AdminStudentsList";

const AdminUsers = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminStudentsList />
    </div>
  );
};

export default AdminUsers;
