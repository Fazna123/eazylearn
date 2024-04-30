import { FC } from "react";
import { useParams } from "react-router-dom";

import CourseView from "../components/CourseView";

type Props = {};

const AdminCourseView: FC<Props> = ({}) => {
  const params = useParams();
  const courseId: string = params.id;

  return (
    <div className="bg-blue-50 px-[10%] py-[3%] h-full">
      <div className="bg-white p-5 h-full">
        <CourseView courseId={courseId} />
      </div>
    </div>
  );
};

export default AdminCourseView;
