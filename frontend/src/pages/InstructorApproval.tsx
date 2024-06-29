import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../utils/api";

export default function InstructorApproval() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.user);
  const id = currentUser?.user?._id;
  console.log(currentUser);

  console.log(id);

  const handleRequest = async () => {
    const res = await fetch(`${BASE_URL}/api/user/instructor/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "instructor" }),
    });
    if (res.ok) {
      swal("Request is sent to Admin!", { icon: "success" });
      console.log("Request sent!");
      navigate("/instructor");
    } else {
      const err = await res.json();
      swal(err.data.message || "Request failed to sent", { icon: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mt-5">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Request Instructor Approval</h1>
        <p className="text-gray-700 mb-4">
          Send a request to be an instructor.
        </p>
        <button
          onClick={handleRequest}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Request
        </button>
      </div>
    </div>
  );
}
