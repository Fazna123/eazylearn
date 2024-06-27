//import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
//import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
//import { format } from "timeago.js";
import CoursePlayer from "../utils/CoursePlayer";
import { Link, useNavigate } from "react-router-dom";
import CourseContentList from "./CourseContentList";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import Ratings from "../utils/Ratings";
import { format } from "timeago.js";
import { createConversation, getMyInfo } from "../utils/endPoint";
//import Instructor from "../pages/Instructor";
import swal from "sweetalert";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetailView = ({ data, stripePromise, clientSecret }: Props) => {
  const navigate = useNavigate();
  console.log("data", data);
  console.log("instructor", data.instructor);
  console.log("stripe promise", stripePromise);
  console.log("client secret", clientSecret);

  const currentCourseId = data?._id;
  const courseDetails = data;
  //console.log("courseDetails", courseDetails);
  console.log(courseDetails.instructor);

  const { currentUser: user } = useSelector((state: any) => state.user);
  const [currentUser, setCurrentUser] = useState<{ _id: any; courses: any }>({
    _id: undefined,
    courses: {},
  });
  const [open, setOpen] = useState(false);
  //const [isPurchased, setIsPurchased] = useState(false);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.price) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const handleOrder = () => {
    if (!user || !user.user) {
      navigate("/signin");
    } else {
      setOpen(true);
    }
  };

  const handleMessageSubmit = async () => {
    const groupTitle = courseDetails.instructor + currentUser._id;
    const userId = currentUser._id;
    const instructorId = courseDetails.instructor;
    const { success, error, data } = await createConversation(
      groupTitle,
      userId,
      instructorId
    );
    if (success) {
      navigate(`/inbox?/${data.conversation._id}`);
    } else {
      swal(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { success, data, error } = await getMyInfo();
      console.log("fetch data of user");
      console.log("data in details page", data);
      console.log("User info:", data); // Log user info
      console.log("Current course ID:", currentCourseId); // Log current course ID
      if (success) {
        //setCurrentUser(data.user);
        setCurrentUser(data.user || { _id: undefined, courses: [] });

        //setIsPurchased(data.courses.includes(currentCourseId));
      } else {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log("current user", currentUser);

  // const isPurchased =
  //   currentUser &&
  //   currentUser?.courses?.find((item: any) => item._id === currentCourseId);
  const isPurchased =
    currentUser &&
    Array.isArray(currentUser.courses) &&
    currentUser.courses.find((item: any) => item._id === currentCourseId);
  console.log(currentUser);
  console.log("current user courses", currentUser.courses);
  console.log("purchased", isPurchased);
  //   const preprocessData = (data) => {
  //     // Iterate over each section
  //     const newData = data.map((section) => {
  //       // Iterate over each video in the section
  //       const newVideos = section.videos.map((video) => {
  //         // Calculate total video length in seconds
  //         const videoLengthInSeconds = video.content.reduce(
  //           (total, contentItem) => total + contentItem.duration,
  //           0
  //         );
  //         // Add the videoLength property to the video object
  //         return { ...video, videoLength: videoLengthInSeconds };
  //       });
  //       // Replace the videos array in the section with the updated one
  //       return { ...section, videos: newVideos };
  //     });
  //     return newData;
  //   };
  //   const preprocessedData = preprocessData(data.courseData);
  return (
    <div className="bg-blue-50">
      <div className="w-[90%] sm:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-[65%] sm:pr-5">
            <h1 className="text-[35px] font-[600] text-blue-900">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black">{data.reviews?.length} Reviews</h5>
              </div>
              <h5 className="text-black">{data.purchased} Students</h5>
            </div>
            <br />
            <h1 className="text-[25px] font-[600] text-black">
              What will you learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="w-full flex sm:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} className="text-black" />
                  </div>
                  <p className="pl-2 text-black">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-[600] text-black">
              What are the prerequisites needed for this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex sm:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} className="text-black" />
                </div>
                <p className="pl-2 text-black">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-[600] text-black">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-[600] text-black">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="sm:flex items-left flex-col">
                {/* <Ratings rating={data?.ratings} /> */}
                {/* <div className="mb-2 sm:mb-[unset]">
                  <h5 className="text-[25px] text-black">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}
                    {""}
                    Course Rating · {data?.reviews?.length} Reviews
                  </h5>
                </div> */}
                <div className="mb-3 sm:mb-[unset]">
                  <div className="flex">
                    <h2 className="text-[25px] text-black">
                      {typeof data?.ratings === "number"
                        ? (Math.round(data.ratings * 10) / 10).toFixed(1)
                        : "N/A"}{" "}
                      Course Rating & {data?.reviews?.length} Reviews
                    </h2>
                  </div>
                </div>

                <div className="flex mt-2">
                  {data?.reviews &&
                    [...data.reviews]
                      .reverse()
                      .map((item: any, index: number) => (
                        <div className="w-full pb-4" key={index}>
                          <div className="flex">
                            <div className="w-[50px] h-[50px]">
                              <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                <h1 className="uppercase text-[18px] text-black">
                                  {item.user.name.slice(0, 2)}
                                </h1>
                              </div>
                            </div>
                            <div className="hidden sm:block pl-2">
                              <div className="flex items-center">
                                <h5 className="text-[18px] pr-2 text-black">
                                  {item.user.name}
                                </h5>
                                <Ratings rating={item.rating} />
                              </div>
                              <p className="text-black">{item.comment}</p>
                              <small className="text-[#000000d1]">
                                {format(item.createdAt)}
                              </small>
                            </div>
                            <div className="pl-2 flex sm:hidden items-center">
                              <h5 className="text-[18px] pr-2 text-black">
                                {item.user.name}
                              </h5>
                              <Ratings rating={item.ratings} />
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-[35%] relative">
            <div className="top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} />
            </div>
            <div className="flex items-center">
              <h1 className="pt-3 text-[25px] text-black">
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black">
                {data.estimatedPrice}
              </h5>
              <h4 className="pl-5 pt-4 text-[22px] text-black">
                {discountPercentagePrice}% Off
              </h4>
            </div>
            <div className="flex items-center">
              {isPurchased ? (
                <Link
                  className="!w-[180px] text-white text-center rounded-full p-3 my-3 cursor-pointer bg-red-600 border border-white font-[600] hover:bg-blue-500"
                  to={`/course-access/${data._id}`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  className="!w-[180px] text-white text-center rounded-full p-3 my-3 cursor-pointer bg-red-600 border border-white font-[600] hover:bg-blue-500"
                  onClick={handleOrder}
                >
                  Buy Now @ {data.price}$
                </div>
              )}
            </div>
            <div className="flex items-center">
              {isPurchased ? (
                <div
                  className="!w-[190px] text-white text-center rounded-full p-3 my-3 cursor-pointer bg-blue-800 border border-white font-[600] hover:bg-blue-500"
                  onClick={handleMessageSubmit}
                >
                  Chat with Instructor
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <br />
            <p className="pb-1 text-black">Source Code Included</p>
            <p className="pb-1 text-black">Full Lifetime Access</p>
            <p className="pb-1 text-black">Certificate after completion</p>
            <p className="pb-1 text-black">Premium Spport</p>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm
                      setOpen={setOpen}
                      data={data}
                      user={currentUser}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetailView;
