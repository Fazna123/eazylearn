import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/endPoint";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CourseAccessContent from "../components/CourseAccessContent";

const CourseAccessPage = () => {
  const params = useParams<{ id?: string }>();
  const id = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { success, data, error } = await getUserInfo();
      console.log("data in access page", data);

      if (success && data) {
        setUser(data);
        setLoading(false);
        const isPurchased = data.courses.find((item: any) => item._id === id);

        if (!isPurchased) {
          navigate("/");
        }
        if (error) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>{id && <CourseAccessContent id={id} user={user} />}</div>
      )}
    </>
  );
};

export default CourseAccessPage;
