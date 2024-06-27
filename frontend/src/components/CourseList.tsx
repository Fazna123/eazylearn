import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getCoursesSearch } from "../utils/endPoint";
import Spinner from "./Spinner";
import CourseCard from "./CourseCard";

const debounce = (func: any, delay: number) => {
  let timeout: any;
  return (...args: []) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const CourseList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchData, setSearchData] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");
  //const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const search = searchParams.get("name") || "";
  //const navigate = useNavigate();

  const fetchCourses = async () => {
    console.log("fetch courses called");

    const { success, error, data } = await getCoursesSearch({
      search,
      category,
      page: currentPage,
      pageSize: 10,
    });

    if (success) {
      console.log("data in search list", data);
      setCourseData(data?.courses);

      setTotalPages(data?.totalPages);
      setCurrentPage(data?.currentPage);
    } else {
      console.log(error);
    }
  };

  console.log("courseData:", courseData);
  console.log("courses", courses);

  const fetchCategories = async () => {
    console.log("fetchCategories is called");
    //setLoading(true);
    const { success, data, error } = await getCategories();
    if (success) {
      //setLoading(false);
      setCategories(data?.categories);
      console.log(data);
    } else {
      console.log(error);
    }
  };
  console.log("cat:", categories);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      await fetchCourses();
      await fetchCategories();
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredCourses = courseData;
    if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (item: any) => item.categories === category
      );
    }
    // if (search) {
    //   filteredCourses = filteredCourses.filter((item: any) =>
    //     item.name.toLowerCase().includes(search.toLowerCase())
    //   );
    // }
    setCourses(filteredCourses);
  }, [courseData, category, search]);

  const handleSearch = (e: any) => {
    let name = e.target.value;
    setSearchParams({ name: name });
    // fetchCourses();
    if (search === "") {
      setSearchParams({ name: search });
      fetchCourses();
      //return;
    } else {
      setSearchParams({ name: search });
      fetchCourses();
      // // Use navigate to update URL
      // navigate(`/courses?name=${search}`);

      //}
    }
  };

  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    setSearchParams({ name: value });
    fetchCourses();
  };

  const debouncedHandleSearchChange = (e: any) =>
    useCallback(debounce(handleSearchChange(e), 300), []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mx-auto w-full bg-blue-50 h-full pb-24 py-5 px-40">
            <div className="w-full flex items-center flex-wrap pt-2 m-10">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-blue-800"
                } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer text-white`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.name ? "bg-[crimson]" : "bg-blue-800"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer text-white`}
                      onClick={() => setCategory(item.name)}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
            </div>
            {/* <input
              type="text"
              value={search}
              onChange={(e) => setSearchParams(e.target.value)}
              placeholder="Search courses..."
              className="block w-full py-2 pl-10 pr-4 text-blue-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 mb-5"
            /> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                //onChange={(e) => setSearchParams({ name: e.target.value })}
                onChange={(e) => debouncedHandleSearchChange(e)}
                className="block w-full py-2 pl-10 pr-4 text-blue-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={(e) => handleSearch(e)}
                className="absolute top-0 right-0 p-2 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500  bg-blue-700"
              >
                Search
              </button>
            </div>
            {courses && courses.length === 0 && (
              <p className="min-h-[58vh] flex items-center justify-center text-slate-700 font-[600]">
                {search
                  ? "No courses found!!"
                  : "No courses found in this category"}
              </p>
            )}
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
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 text-white bg-blue-500 rounded"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === index + 1 ? "bg-blue-700" : "bg-blue-500"
                  } text-white rounded`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 text-white bg-blue-500 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseList;
