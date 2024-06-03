import AdminSidebar from "../components/admin/AdminSidebar";
import Adminheader from "../components/admin/Adminheader";
import OrderAnalytics from "../components/admin/OrderAnalytics";

type Props = {};

const OrderAnalyticsPage = (props: Props) => {
  return (
    <div className="flex w-full bg-blue-50 m-0 h-screen">
      <AdminSidebar />
      <Adminheader />
      <OrderAnalytics isDashboard={false} />
    </div>
  );
};

export default OrderAnalyticsPage;
