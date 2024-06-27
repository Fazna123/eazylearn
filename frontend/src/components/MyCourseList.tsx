import { useEffect, useState } from "react";
//import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyCourses } from "../utils/endPoint";
import Spinner from "./Spinner";
import CourseCard from "./CourseCard";

const MyCourseList = () => {
  //const [searchParams, setSearchParams] = useSearchParams();
  //const [searchData, setSearchData] = useState("");
  //const [courseData, setCourseData] = useState([]);
  const [courses, setCourses] = useState([]);
  //   const [categories, setCategories] = useState([]);
  //   const [category, setCategory] = useState("All");
  //const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const [totalPages, setTotalPages] = useState(1);
  //   const [currentPage, setCurrentPage] = useState(1);

  //const search = searchParams.get("name") || "";
  //const navigate = useNavigate();

  const fetchCourses = async () => {
    console.log("fetch courses called");

    const { success, error, data } = await getMyCourses();

    if (success) {
      console.log("data in search list", data);
      setCourses(data?.courses);
    } else {
      console.log(error);
    }
  };

  //console.log("courseData:", courseData);
  //console.log("courses", courses);

  //   const fetchCategories = async () => {
  //     console.log("fetchCategories is called");
  //     //setLoading(true);
  //     const { success, data, error } = await getCategories();
  //     if (success) {
  //       //setLoading(false);
  //       setCategories(data?.categories);
  //       console.log(data);
  //     } else {
  //       console.log(error);
  //     }
  //   };
  //console.log("cat:", categories);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await fetchCourses();
      //await fetchCategories();
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     let filteredCourses = courseData;
  //     if (category !== "All") {
  //       filteredCourses = filteredCourses.filter(
  //         (item: any) => item.categories === category
  //       );
  //     }

  //     setCourses(filteredCourses);
  //   }, [courseData, category, search]);

  //   const handleSearch = () => {
  //     fetchCourses();
  //   };

  //   const handlePageChange = (page: number) => {
  //     setCurrentPage(page);
  //   };

  return (
    <>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mx-auto w-full bg-blue-50 h-full pb-24 py-5 px-40">
            {/* <input
              type="text"
              value={search}
              onChange={(e) => setSearchParams(e.target.value)}
              placeholder="Search courses..."
              className="block w-full py-2 pl-10 pr-4 text-blue-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-5"
            /> */}

            {/* {courses && courses.length === 0 && (
              <p className="min-h-[58vh] flex items-center justify-center text-slate-700 font-[600]">
                {search
                  ? "No courses found!!"
                  : "No courses found in this category"}
              </p>
            )} */}
            <br />
            <br />
            {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
              {courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
            </div> */}
            {courses ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
                {courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourseList;
