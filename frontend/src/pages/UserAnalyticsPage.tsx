import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import UserAnalytics from "../components/admin/UserAnalytics";

type Props = {};

const UserAnalyticsPage = (props: Props) => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <UserAnalytics isDashboard={false} />
    </div>
  );
};

export default UserAnalyticsPage;
