import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import AdminInstructorApprovalList from "../components/admin/AdminInstructorApprovalList";

const AdminInstructors = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminInstructorApprovalList />
    </div>
  );
};

export default AdminInstructors;
