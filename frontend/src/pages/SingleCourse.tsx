import { useParams } from "react-router-dom";
import CourseDetail from "../components/CourseDetail";

const SingleCourse = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  if (!id) {
    // Optional: Redirect or handle the case where id is not available
    return <div>No course ID provided</div>;
  }
  return (
    <div>
      <CourseDetail id={id} />
    </div>
  );
};

export default SingleCourse;
