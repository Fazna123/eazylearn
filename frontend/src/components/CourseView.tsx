import { FC, useEffect, useState } from "react";
import CoursePlayer from "../utils/CoursePlayer";
import Ratings from "../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";

type Props = {
  courseId: string;
};

const CourseView: FC<Props> = ({ courseId }) => {
  const [courseData, setCourseData] = useState({
    estimatedPrice: 0,
    price: 0,
    videoUrl: "",
    title: "",
    demoUrl: "",
    name: "",
    prerequisites: [],
    benefits: [],
    description: "",
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await fetch(
        `${BASE_URL}/api/user/get-course/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you need
          },
          credentials: "include", // Include cookies in the request
        }
      );
      const data = await response.json();
      console.log("data.course", data);
      setCourseData(data.course);
    };

    fetchCourseData();
  }, []);

  const navigate = useNavigate();
  const discountPercentage =
    (((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
      100) |
    0;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    navigate("/admin/courses");
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10 mb-0">
          <CoursePlayer videoUrl={courseData?.demoUrl} />
        </div>
        <div className="flex items-center mt-0">
          <h1 className="pt-0 mt-0 text-[25px]">
            {courseData.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div className="w-fit px-10 py-2 h-[40px] !bg-red-500 text-center text-white rounded mt-2 cursor-not-allowed">
            Buy Now @{courseData?.price}$
          </div>
        </div>
        {/* <div className="flex items-center mt-2 mb-3">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount Code..."
            className="shadow appearance-none border border-blue-400 rounded w-80 !h-min !py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="w-fit px-10 py-2 h-[40px] !bg-blue-500 text-center text-white rounded cursor-not-allowed">
            Apply
          </div>
        </div> */}
        {/* <p className="pb-1">• Source code included</p>
        <p className="pb-1">• Lifetime access on all materials</p>
        <p className="pb-1">• Certificate of completion</p>
        <p className="pb-1">• Premium Support</p> */}
      </div>
      <div className="w-full">
        <div className="w-full sm:pr-5">
          <h1 className="text-[25px] font-[600] mt-2">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-[600]">
            What will you learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex sm:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] font-[600]">
          What are the prerequisites needed for this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex sm:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-[600]">Course Details</h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full sm:w-[180px] flex items-center justify-center h-[40px] bg-blue-900 text-white text-center rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default CourseView;
