import { useEffect, useState } from "react";
import { getCourses } from "../utils/endPoint";
import CourseCard from "./CourseCard";

type Props = {};

const CourseList = (props: Props) => {
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const { success, error, data } = await getCourses();

    if (success) {
      setCourses(data?.courses);
      console.log(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <div className="mx-auto w-full bg-blue-50 h-full pb-24">
        <div className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-1 sm:py-16 h-full">
          <div className="relative z-10 max-w-screen-xl px-2  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 h-full">
            {/* <div className=" sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto h-full">
              <div className="w-[98%] sm:w-[80%] m-auto"> */}
            {/* <h1 className="text-center text-[25px] leading-[35px] sm:text-3xl lg:text-4xl sm:leading-[60px] text-[#000] font-[700] tracking-tight">
                Expand Your Career{" "}
                <span className="text-gradient">Oppurtunity</span>
                <br />
                Oppurtunity with our courses
              </h1> */}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
              {courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
            </div>
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseList;
