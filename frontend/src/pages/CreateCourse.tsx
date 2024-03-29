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

export default function MyTeachings() {
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
      suggessions: "",
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
      desciption: courseInfo.description,
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
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
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
                />
              )}
            </div>
            <div className="w-[20%] h-full -z-0 top-20 mt-[100px] right-0">
              <CourseOptions active={active} setActive={setActive} />
            </div>
          </div>
        </div>
      </InstructorLayout>
      <Footer />
    </>
  );
}
