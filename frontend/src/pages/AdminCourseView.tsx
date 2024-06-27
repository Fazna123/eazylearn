import { FC } from "react";
import { useParams } from "react-router-dom";

import CourseView from "../components/CourseView";

type Props = {};

const AdminCourseView: FC<Props> = ({}) => {
  const params = useParams<{ id?: string }>();
  const courseId: string | undefined = params.id;

  if (!courseId) {
    // Handle case where courseId is undefined (optional)
    return <div>No course ID provided!</div>;
  }

  return (
    <div className="bg-blue-50 px-[10%] py-[3%] h-full">
      <div className="bg-white p-5 h-full">
        <CourseView courseId={courseId} />
      </div>
    </div>
  );
};

export default AdminCourseView;
