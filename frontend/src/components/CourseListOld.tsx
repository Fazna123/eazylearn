import { useEffect, useState } from "react";
import { getCourses } from "../utils/endPoint";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
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
  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      navigate(`/courses?title=${search}`);
    }
  };

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
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full py-2 pl-10 pr-4 text-blue-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSearch}
                className="absolute top-0 right-0 p-2 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-blue-700"
              >
                {/* <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg> */}
                Search
              </button>
            </div>
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
