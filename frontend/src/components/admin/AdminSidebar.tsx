import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fetch("/api/user/logout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-950 text-slate-200 h-screen w-64 flex flex-col">
      <div className="p-10">
        <h1 className="text-2xl font-bold">Admin</h1>
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

              <span>Course Management</span>
            </NavLink>
          </li>
          <li className="p-2">
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
                <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                <path
                  fillRule="evenodd"
                  d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                  clipRule="evenodd"
                />
                <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
              </svg>

              <span>Instructor Management</span>
            </NavLink>
          </li>
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
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>

              <span>Student Management</span>
            </NavLink>
          </li>
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
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
              </svg>

              <span>Sales Report</span>
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
