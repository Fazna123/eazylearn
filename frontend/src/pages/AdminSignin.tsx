import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  adminSigninStart,
  adminSigninSuccess,
  adminSigninFailure,
} from "../redux/user/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";

export default function AdminSignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.admin);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        setIsVisible(false);
        dispatch(adminSigninFailure(null));
      }, 5000);

      return () => clearTimeout(errorTimer);
    }
  }, [error, dispatch]);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      dispatch(adminSigninStart());
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(adminSigninFailure(data));
        return;
      }
      dispatch(adminSigninSuccess(data));
      navigate("/admin");
    } catch (error) {
      dispatch(adminSigninFailure(error));
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">
          Admin Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <Link to="/sign-in">
          <span className="text-blue-500">User Sign In</span>
        </Link>
        <p
          className={`text-red-700 mt-5 transition-opacity ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}
