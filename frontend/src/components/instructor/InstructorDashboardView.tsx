import { useEffect, useState } from "react";
import {
  getInstructorDashboardAnaytics,
  getMyTeachings,
} from "../../utils/endPoint";
import swal from "sweetalert";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { PiBookOpen, PiUsersFourLight } from "react-icons/pi";

const InstructorDashboardView = () => {
  const [courseData, setCourseData] = useState([]);
  const [dashData, setDashData] = useState({
    monthlyCount: [],
    monthlyRevenue: [],
  });

  const fetchMyTeachings = async () => {
    const { success, error, data } = await getMyTeachings();
    if (success) {
      setCourseData(data.courses);
    } else {
      swal(error.message);
    }
  };

  const fetchAnalytics = async () => {
    const { success, error, data } = await getInstructorDashboardAnaytics();
    if (success) {
      setDashData(data.data);
    } else {
      swal(error.message);
    }
  };

  useEffect(() => {
    fetchMyTeachings();
    fetchAnalytics();
  }, []);

  const processData = (data: any) => {
    const { monthlyRevenue, monthlyCount } = dashData;

    // Assuming monthlyRevenue and monthlyCount are ordered and match by index
    return monthlyRevenue.map((revenue, index) => {
      const count = monthlyCount[index]?.count;
      return {
        name: `${revenue.year}-${revenue.month}`,
        Amount: Math.floor(revenue.totalAmount),
        count: count,
      };
    });
  };
  const chartData = processData(dashData);

  const data = courseData.map((course: any) => {
    return {
      name: course.name,
      Purchased: course.purchased,
    };
  });
  const totalPurchased = courseData.reduce((total: number, course: any) => {
    return total + course.purchased;
  }, 0);
  return (
    <div className="w-full flex flex-col p-2">
      <div className=" w-[96%] flex items-start flex-row justify-between mt-14 ml-10">
        <div className="flex p-5 text-lg text-[25px] rounded-sm shadow bg-white">
          <>
            <PiUsersFourLight className="text-[30px] mr-2" />

            <h5 className="py-2 text-[20px] font-[400]">
              Total Enrollments : {totalPurchased}
            </h5>
          </>
        </div>
        <div className="flex p-5 text-lg text-[25px] rounded-sm shadow bg-white">
          <>
            <PiBookOpen className="text-[30px] mr-2" />

            <h5 className="py-2 text-[20px] font-[400]">
              Total Courses : {courseData.length}{" "}
            </h5>
          </>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-full grid grid-cols-1">
          <div className="h-[60vh] bg-white p-10 ml-10 mt-3 rounded-sm shadow-md">
            <h5 className="text-[25px] font-[600] text-blue-950 mb-2 ">
              My course enrollment analysis
            </h5>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="Purchased"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                {/* <Bar
          dataKey="pv"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full grid grid-cols-1">
          <div className="h-[60vh] bg-white p-10 ml-5 mt-3 mr-5 rounded-sm shadow-md">
            <h5 className="text-[25px] font-[600] text-blue-950 mb-2 ">
              Monthly Revenue analysis
            </h5>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Amount"
                  stroke="#001a75"
                  fill="#334d99"
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardView;
