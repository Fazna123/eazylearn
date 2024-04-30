//import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InstructorHeader from "../components/instructor/InstructorHeader";
import InstructorLayout from "./InstructorLayout";
//import { Link } from "react-router-dom";
import AllCourses from "../components/instructor/AllCourses";

export default function MyTeachings() {
  // const [active, setActive] = useState(0);
  // const [courseInfo, setCourseInfo] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   estimatedPrice: "",
  //   tags: "",
  //   level: "",
  //   demoUrl: "",
  //   thumbnail: "",
  // });
  // const [benefits, setBenefits] = useState([{ title: "" }]);
  // const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  // const [courseContentData, setCourseContentData] = useState([
  //   {
  //     videoUrl: "",
  //     title: "",
  //     description: "",
  //     videoSection: "Untitled Scetion",
  //     links: [
  //       {
  //         title: "",
  //         url: "",
  //       },
  //     ],
  //     suggessions: "",
  //   },
  // ]);
  // const [courseData, setCourseData] = useState({});
  return (
    <>
      <Header />
      <InstructorLayout>
        <InstructorHeader />
        {/* <div className="w-full bg-blue-50 m-0 h-full">
          <div className="w-4/5 m-auto h-4/5 p-5 bg-white border-blue-100 border h-100 my-10">
            <h1>My Teachings</h1>
            <div className="flex flex-row p-10 max-h-fit justify-between">
              <form>
                <input
                  type="text"
                  id="search"
                  placeholder="Search your courses... "
                  className="bg-blue-50 p-3 w-auto m-auto mr-0"
                />
                <button className="bg-blue-950 text-white p-3 ml-0">
                  Search
                </button>
              </form>
              <Link
                to="/instructor/createcourse"
                className="bg-blue-950 text-white p-3 ml-0"
              >
                Create Course
              </Link>
            </div>
            <div className="flex flex-wrap"></div>
          </div>
        </div> */}
        <AllCourses />
      </InstructorLayout>
      <Footer />
    </>
  );
}
