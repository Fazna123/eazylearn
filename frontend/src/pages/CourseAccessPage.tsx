import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/endPoint";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CourseAccessContent from "../components/CourseAccessContent";

type Props = {};

const CourseAccessPage = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { success, data, error } = await getUserInfo();
      console.log("data in access page", data);

      if (data) {
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
        <div>
          <CourseAccessContent id={id} user={user} />
        </div>
      )}
    </>
  );
};

export default CourseAccessPage;
