import AdminCategoriesList from "../components/admin/AdminCategoriesList";
import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";

const AdminCategories = () => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <AdminCategoriesList />
    </div>
  );
};

export default AdminCategories;
