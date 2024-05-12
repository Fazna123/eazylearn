import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseList from "../components/CourseList";

type Props = {};

const Courses = (props: Props) => {
  return (
    <>
      <Header />
      <CourseList />
      <Footer />
    </>
  );
};

export default Courses;
