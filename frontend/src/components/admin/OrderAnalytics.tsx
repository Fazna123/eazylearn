import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import { getOrderAnalytics } from "../../utils/endPoint";

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderAnalytics = async () => {
    setLoading(true);

    try {
      const { success, data, error } = await getOrderAnalytics();
      if (success) {
        setLoading(false);
        console.log(data);
        setOrderData(data?.orders?.last12Months || []);
      } else {
        setLoading(false);
        console.log(error.message);
      }
    } catch (err: any) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderAnalytics();
  }, []);

  const analyticsData = orderData.map((item: any) => ({
    name: item.month,
    count: item.count,
  }));

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full bg-white">
          <div
            className={`${
              !isDashboard ? "mt-[10px]" : "mt-[0px] shadow-sm pb-0 rounded-sm"
            }`}
          >
            <div className={`${isDashboard ? "!pt-5" : ""}`}>
              <h1 className="text-blue-950 !text-start font-[700] ml-5 text-[25px]">
                Order Analytics
              </h1>
              {!isDashboard && (
                <p className="text-slate-600 px-5">
                  Last 12 Months analytics data
                </p>
              )}
            </div>
            <div
              className={`w-full ${
                isDashboard ? "h-[40vh]" : "h-[80vh]"
              } flex items-center justify-center p-5`}
            >
              <ResponsiveContainer
                width={isDashboard ? "100%" : "100%"}
                height={isDashboard ? "100%" : "100%"}
              >
                <LineChart
                  width={500}
                  height={500}
                  data={analyticsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#001a75" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
