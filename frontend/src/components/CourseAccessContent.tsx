import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { getCourseInfo } from "../utils/endPoint";
import Header from "./Header";
import Footer from "./Footer";
import CourseContentMedia from "./CourseContentMedia";
import { toast } from "react-toastify";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseAccessContent = ({ id, user }: Props) => {
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [courseContent, setCourseContent] = useState({});
  const [activeVideo, setActiveVideo] = useState(0);
  const fetchData = async (id: string) => {
    setLoading(true);
    const { success, error, data } = await getCourseInfo(id);
    console.log(data);
    if (data.course && data.course.courseData) {
      setLoading(false);
      setCourseContent(data.course.courseData);
    } else {
      // Handle the case where courseData is undefined or empty
      toast("Course data not found");
    }
    // if (data) {
    //   setLoading(false);
    //   setCourseContent(data.course.courseData);
    // }
    // if (error) {
    //   toast(`Course is not fetched ${error}`);
    // }
  };
  useEffect(() => {
    fetchData(id);
  }, []);
  console.log("course content", courseContent);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <div className="w-full bg-blue-50 grid sm:grid-cols-10">
            <div className="col-span-7">
              <CourseContentMedia
                data={courseContent}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                fetchData={fetchData}
              />
            </div>
            <div className="hidden sm:block sm:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={courseContent}
                activeVideo={activeVideo}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseAccessContent;
