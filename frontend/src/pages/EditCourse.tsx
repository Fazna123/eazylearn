import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InstructorHeader from "../components/instructor/InstructorHeader";
import InstructorLayout from "./InstructorLayout";
import CourseOptions from "../components/instructor/CourseOptions";
import CourseInformation from "../components/instructor/CourseInformation";
import CourseData from "../components/instructor/CourseData";
import CourseContent from "../components/instructor/CourseContent";
import CoursePreview from "../components/instructor/CoursePreview";
import { useDispatch } from "react-redux";
import { createCourseFailure } from "../redux/courses/courseSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../utils/api";

export default function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [courseFetchData, setCourseFetchData] = useState({});

  const params = useParams();
  const id = params?.id;
  console.log(id);
  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-allcourses`, {
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => {
        const courseDetails = data?.courses.find((i: any) => i._id === id);
        console.log(courseDetails);
        if (courseDetails) {
          setCourseInfo({
            name: courseDetails.name,
            description: courseDetails.description,
            price: courseDetails.price,
            estimatedPrice: courseDetails?.estimatedPrice,
            tags: courseDetails.tags,
            level: courseDetails.level,
            demoUrl: courseDetails.demoUrl,
            thumbnail: courseDetails?.thumbnail,
          });
          setBenefits(courseDetails.benefits);
          setPrerequisites(courseDetails.prerequisites);
          setCourseContentData(courseDetails.courseData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // useEffect(() => {
  //   if (courseFetchData) {
  //     setCourseInfo({
  //       name: courseFetchData.name,
  //       description: courseFetchData.description,
  //       price: "",
  //       estimatedPrice: "",
  //       tags: "",
  //       level: "",
  //       demoUrl: "",
  //       thumbnail: "",
  //     });
  //   }
  // },[courseFetchData]);

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
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };
  // const {  courseSuccess, courseLoaading, courseError } =
  //   useSelector((state: any) => state.course);
  const handleCourseCreate = async () => {
    const data = courseData;
    if (Object.keys(data).length === 0) {
      toast("Fill all the fields and try again");
    } else {
      try {
        const res = await fetch(`${BASE_URL}/api/user/edit-course/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json();
          toast.error(err.data.message || "Something went wrong!");
          return;
        } else {
          toast.success("Course Updated Successfully");
          navigate("/instructor/myteachings");
        }
      } catch (error) {
        dispatch(createCourseFailure(error));
      }
    }
  };
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
                  isEdit={true}
                />
              )}
            </div>
            <div className="w-[20%] h-full -z-0 top-20 mt-[100px] right-0">
              <CourseOptions active={active} />
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
