import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InstructorHeader from "../components/instructor/InstructorHeader";
import InstructorLayout from "./InstructorLayout";
import CourseOptions from "../components/instructor/CourseOptions";
import CourseInformation from "../components/instructor/CourseInformation";
import CourseData from "../components/instructor/CourseData";
import CourseContent from "../components/instructor/CourseContent";
import CoursePreview from "../components/instructor/CoursePreview";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourseStart,
  createCourseSuccess,
  createCourseFailure,
} from "../redux/courses/courseSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function CreateCourse() {
  const { currentUser } = useSelector((state) => state.user);
  const isNotApproved = currentUser?.user?.isApproved === false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPreRequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestions: courseContent.suggestions,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPreRequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };
  // const {  courseSuccess, courseLoaading, courseError } =
  //   useSelector((state: any) => state.course);
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (Object.keys(data).length === 0) {
      toast("Fill all the fields and try again");
    } else {
      try {
        dispatch(createCourseStart());
        const res = await fetch("/api/user/create-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json();
          dispatch(createCourseFailure(err.data));
          toast.error(err.data.message || "Something went wrong!");
          return;
        } else {
          dispatch(createCourseSuccess());
          toast.success("Course Created Successfully");
          navigate("/instructor/myteachings");
        }
      } catch (error) {
        dispatch(createCourseFailure(error));
      }
    }
  };
  if (isNotApproved) {
    return (
      <>
        <Header />
        <InstructorLayout>
          <InstructorHeader />
          <div className="w-full bg-blue-50 h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-4">
                You are not approved to create a course at the moment.
              </p>
              <button
                onClick={() => navigate("/instructor")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ok
              </button>
            </div>
          </div>
        </InstructorLayout>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header />
        <InstructorLayout>
          <InstructorHeader />
          <div className="w-full bg-blue-50 m-0 h-full">
            <div className="w-[90%] flex m-auto h-fit p-5 bg-white border-blue-100 border h-100 my-10">
              <div className="w-[80%]">
                {active === 0 && (
                  <CourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                  />
                )}
                {active === 1 && (
                  <CourseData
                    benefits={benefits}
                    setBenefits={setBenefits}
                    prerequisites={prerequisites}
                    setPrerequisites={setPrerequisites}
                    active={active}
                    setActive={setActive}
                  />
                )}
                {active === 2 && (
                  <CourseContent
                    active={active}
                    setActive={setActive}
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleSubmit}
                  />
                )}
                {active === 3 && (
                  <CoursePreview
                    active={active}
                    setActive={setActive}
                    courseData={courseData}
                    handleCourseCreate={handleCourseCreate}
                    isEdit={false}
                  />
                )}
              </div>
              <div className="w-[20%] h-full -z-0 top-20 mt-[100px] right-0">
                <CourseOptions active={active} setActive={setActive} />
              </div>
            </div>
            <div>
              <ToastContainer autoClose={2000} />
            </div>
          </div>
        </InstructorLayout>
        <Footer />
      </>
    );
  }
}
