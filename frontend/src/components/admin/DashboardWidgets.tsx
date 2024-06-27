import { FC, useEffect, useState } from "react";
import UserAnalytics from "./UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
//import { Box, CircularProgress } from "@mui/material";
import { PiBookOpen, PiCurrencyDollar, PiUsersFourLight } from "react-icons/pi";
import OrderAnalytics from "./OrderAnalytics";
import AllInvoices from "../AllInvoices";
import { getAllOrders, getDashboardData } from "../../utils/endPoint";
//import CourseAnalytics from "./CourseAnalytics";

type Props = {
  open: boolean;
  value?: number;
};

// const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
//   return (
//     <Box sx={{ position: "relative", display: "inline-flex" }}>
//       <CircularProgress
//         variant="determinate"
//         value={value}
//         size={45}
//         color={value && value > 99 ? "info" : "error"}
//         thickness={4}
//         style={{ zIndex: open ? -1 : 1 }}
//       />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       ></Box>
//     </Box>
//   );
// };

const DashboardWidgets: FC<Props> = ({}: Props) => {
  const [dashData, setDashData] = useState<{
    totalCourses: any;
    totalOrders: any;
    totalStudents: any;
  }>({ totalCourses: 0, totalStudents: 0, totalOrders: 0 });
  const [orderData, setOrderData] = useState([]);

  const fetchOrderAnalytics = async () => {
    try {
      const { success, data, error } = await getAllOrders();
      if (success) {
        console.log(data);
        setOrderData(data?.orders);
      } else {
        console.log(error.message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const fetchDashboardData = async () => {
    const { success, error, data } = await getDashboardData();
    if (success) {
      setDashData(data.data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    fetchOrderAnalytics();
  }, []);

  const totalProfit = orderData?.reduce((total: number, order: any) => {
    return total + (order.courseId.price || 0);
  }, 0);
  return (
    <div className="mt-[20px] min-h-screen w-full flex flex-col">
      <div className="w-full grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pr-8 pt-[80px]">
          <div className="w-full rounded-sm shadow bg-white">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="text-[30px]" />
                <h5 className="pt-2 text-[20px]">{dashData?.totalOrders}</h5>
                <h5 className="py-2 text-[20px] font-[400]">Total Orders</h5>
              </div>
              <div>
                <PiCurrencyDollar className="text-[30px]" />
                <h5 className="pt-2 text-[20px]">{totalProfit}</h5>
                <h5 className="py-2 text-[20px] font-[400]">Total Profit</h5>
                {/* <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">+120%</h5> */}
              </div>
            </div>
          </div>

          <div className="w-full rounded-sm shadow my-8 bg-white">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="text-[30px]" />
                <h5 className="pt-2 text-[20px]">{dashData?.totalStudents}</h5>
                <h5 className="py-2 text-[20px] font-[400]">Total Users</h5>
              </div>
              <div>
                <PiBookOpen className="text-[30px]" />
                <h5 className="pt-2 text-[20px]">{dashData?.totalCourses}</h5>
                <h5 className="py-2 text-[20px] font-[400]">Total Courses</h5>
                {/* <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">+150%</h5> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-[65%,35%] p-0">
        <div className="w-[94%] h-[30vh] shadow-sm pl-8 !pt-0 !mt-0 !pr-0">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5 bg-white pl-0 pr-1 ml-0 mr-2">
          <h5 className="text-[20px] font-[400] pb-0 pl-1">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
