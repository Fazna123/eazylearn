import { useParams } from "react-router-dom";
import CourseDetail from "../components/CourseDetail";

const SingleCourse = () => {
  const params = useParams();
  const id = params?.id;
  return (
    <div>
      <CourseDetail id={id} />
    </div>
  );
};

export default SingleCourse;
