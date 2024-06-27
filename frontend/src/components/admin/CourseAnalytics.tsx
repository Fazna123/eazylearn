import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Spinner from "../Spinner";
import { useEffect, useState } from "react";
import { getCourseAnalytics } from "../../utils/endPoint";

const CourseAnalytics = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { success, data, error } = await getCourseAnalytics();
      if (success) {
        setCourseData(data?.courses?.last12Months || []);
      } else {
        setError(error.message);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseAnalytics();
  }, []);

  const analyticsData = courseData.map((item: any) => ({
    name: item.month,
    uv: item.count,
  }));

  const minValue = 0;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center mt-5">{error}</div>
      ) : (
        <div className="h-screen w-full">
          <div className="mt-[50px]">
            <h1 className="text-blue-950 !text-start font-[700] ml-5 text-[25px]">
              Course Analytics
            </h1>
            <p className="text-slate-600 px-5">Last 12 Months analytics data</p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center p-10">
            <ResponsiveContainer width="100%" height="50%">
              <BarChart width={100} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#001a75">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
