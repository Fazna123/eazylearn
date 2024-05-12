import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getCourses } from "../utils/endPoint";
import CourseCard from "../components/CourseCard";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Reviews from "../components/Reviews";

export default function Home() {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const { success, error, data } = await getCourses();

    if (success) {
      setCourses(data?.courses);
      setVisibleCourses(data?.courses.slice(0, 10));
      console.log(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    updateVisibleCourses();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    updateVisibleCourses();
  };

  const updateVisibleCourses = () => {
    const start = currentIndex * 10;
    const end = start + 10;
    setVisibleCourses(courses.slice(start, end));
  };
  return (
    <>
      <Header />
      <div className="mx-auto w-full bg-blue-50 h-full pb-10">
        <div className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-1 sm:py-16 h-full">
          <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8 h-full">
            <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto h-full">
              <h2 className="text-4xl font-bold sm:text-5xl">
                Elevate your intellect with our EazyLearN
                <span className="hidden sm:block text-4xl"></span>
              </h2>

              <Link
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                to="/courses"
              >
                <svg
                  fill="white"
                  width="25"
                  height="25"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                >
                  <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                </svg>
                &nbsp; Get Started
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
            <img
              className="w-auto h-auto"
              src="https://i.ibb.co/5BCcDYB/Remote2.png"
              alt="image1"
            />
          </div>
        </div>
        <br />
        <br />
        <hr className="mt-8 mb-8 border-gray-400" />
        <br />
        <br />
        <div className="w-[98%] sm:w-[80%] m-auto">
          <h1 className="text-center text-[25px] leading-[35px] sm:text-3xl lg:text-4xl sm:leading-[60px] text-[#000] font-[700] tracking-tight">
            Expand Your Career{" "}
            <span className="text-gradient">Oppurtunity</span>
            <br />
            Start learning with our courses
          </h1>
          <br />
          <br />
          {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
            {courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
          </div> */}
        </div>
        <div className="flex justify-center items-center space-x-4 xl:px-10 xl:mx-20">
          <AiOutlineArrowLeft
            className="cursor-pointer"
            size={40}
            onClick={handlePrev}
            style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
          />
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[35px] mb-12 border-0">
            {visibleCourses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
          </div>
          <AiOutlineArrowRight
            className="cursor-pointer"
            size={40}
            onClick={handleNext}
            style={{
              visibility:
                (currentIndex + 1) * 10 >= courses.length
                  ? "hidden"
                  : "visible",
            }}
          />
        </div>

        {/* <div className="grid  place-items-center sm:mt-20">
        <img
          className="sm:w-96 w-48"
          src="https://i.ibb.co/2M7rtLk/Remote1.png"
          alt="image2"
        />
      </div>

      <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">
        Lorem Ipsum Yojo
      </h1> */}
      </div>

      <Reviews />
      <Footer />
    </>
  );
}
