import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
//import { signOut } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  //const dispatch = useDispatch();

  // const handleSignOut = async () => {
  //   try {
  //     await fetch("/api/user/logout");
  //     dispatch(signOut());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-blue-900 px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src="/logonew.png" className=" mr-3 h-14" alt="Logo" />
          </Link>
          <div className="flex items-center lg:order-2">
            {/* <Link
              to="/signin"
              className="text-blue-900 hover:bg-blue-950 hover:text-white focus:ring-2 focus:ring-slate-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link> */}
            {currentUser ? (
              <Link
                to="/mycourses"
                //onClick={handleSignOut}
                className="text-blue-900 hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-slate-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                My Courses
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-blue-900 hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-slate-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
            )}

            {currentUser ? (
              <>
                <Link to="/profile">
                  <img
                    src={currentUser.user.avatar}
                    alt="👤"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="text-white bg-blue-900 hover:bg-blue-950 focus:ring-2 focus:ring-slate-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Sign Up
              </Link>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-600 underline" : "text-blue-900"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-600 underline" : "text-blue-900"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-600 lg:p-0`
                  }
                >
                  Courses
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-600 underline" : "text-blue-900"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-600 lg:p-0`
                  }
                >
                  Categories
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/instructor"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-600 underline" : "text-blue-900"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-600 lg:p-0`
                  }
                >
                  Teach on EazyLearN
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                      isActive ? "text-orange-600 underline" : "text-blue-900"
                    } lg:hover:bg-transparent lg:border-0 hover:text-orange-600 lg:p-0`
                  }
                >
                  About Us
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
