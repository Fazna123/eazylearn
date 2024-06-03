import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import { getUserAnalytics } from "../../utils/endPoint";

type Props = {
  isDashboard?: boolean;
};

const CourseAnalytics = ({ isDashboard }: Props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserAnalytics = async () => {
    setLoading(true);

    try {
      const { success, data, error } = await getUserAnalytics();
      if (success) {
        setLoading(false);
        setUserData(data?.users?.last12Months || []);
      } else {
        setLoading(false);
        console.log(error.message);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserAnalytics();
  }, []);

  const analyticsData = userData.map((item: any) => ({
    name: item.month,
    count: item.count,
  }));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full bg-white">
          <div
            className={`${
              !isDashboard ? "mt-[10px]" : "mt-[50px] shadow-sm pb-2 rounded-sm"
            }`}
          >
            <div className={`${isDashboard ? "!pt-5" : ""}`}>
              <h1 className="text-blue-950 !text-start font-[700] ml-5 text-[25px]">
                User Analytics
              </h1>
              {!isDashboard && (
                <p className="text-slate-600 px-5">
                  Last 12 Months analytics data
                </p>
              )}
            </div>

            <div
              className={`w-full ${
                isDashboard ? "h-[33vh]" : "h-[80vh]"
              } flex items-center justify-center p-5`}
            >
              <ResponsiveContainer
                width={isDashboard ? "100%" : "90%"}
                height={isDashboard ? "100%" : "100%"}
              >
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#001a75"
                    fill="#334d99"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
