import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { BASE_URL } from "../../utils/api";

export default function InstructorSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fetch(`${BASE_URL}/api/user/logout`, {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need
        },
        credentials: "include", // Include cookies in the request
      });
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-950 text-slate-200 h-screen w-1/5 sm:w-[16%] flex flex-col">
      {/* Sidebar Header */}
      <div className="p-10">
        <h1 className="text-2xl font-bold">Instructor</h1>
      </div>
      <hr />

      {/* Sidebar Navigation Links */}
      <nav className="flex-1 p-5">
        <ul className="space-y-2">
          <li className="p-2">
            <NavLink
              to="/instructor/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>

              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              to="/instructor/myteachings"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>

              <span>My Teachings</span>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              to="/instructor/createcourse"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                  clip-rule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>

              <span>Create Course</span>
            </NavLink>
          </li>
          {/* <li className="p-2">
            <NavLink
              to="/instructor/mycommunities"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>My Communities</span>
            </NavLink>
          </li> */}
          <li className="p-2">
            <NavLink
              to="/instructor/chat"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span>Chat</span>
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 hover:text-orange-600 ${
                  isActive
                    ? "text-orange-500 font-semibold underline"
                    : "font-normal"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span>My Profile</span>
            </NavLink>
          </li>
        </ul>

        <button
          onClick={handleSignOut}
          className="bg-white rounded-3xl px-14 py-2 text-blue-950 font-semibold hover:text-red-600 mt-8 ml-4"
        >
          Logout
        </button>
      </nav>

      {/* Sidebar Footer */}
      {/* <div className="p-4">
        <p className="text-sm">Logged in as {}</p> */}
      {/* Add logout or profile links as needed */}
      {/* </div> */}
    </div>
  );
}
