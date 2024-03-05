import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminHeader() {
  const { currentAdmin } = useSelector((state) => state.admin);

  console.log(currentAdmin);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="#">
          <h1 className="font-bold">Dashboard</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="#">
            <li>AdminHome</li>
          </Link>

          <Link to="#">
            {currentAdmin ? (
              <img
                src={currentAdmin.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
          {currentAdmin ? <span>Sign Out</span> : ""}
        </ul>
      </div>
    </div>
  );
}

export default AdminHeader;
