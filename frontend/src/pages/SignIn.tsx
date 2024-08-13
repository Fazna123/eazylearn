import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import OAuth from "../components/OAuth";
import "react-toastify/dist/ReactToastify.css";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BASE_URL } from "../utils/api";

export default function SignIn() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { loading, error, currentUser } = useSelector(
    (state: any) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        //setIsVisible(false);
        dispatch(signInFailure(null));
      }, 5000);

      return () => clearTimeout(errorTimer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      if (currentUser.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      if (
        !email ||
        !password ||
        email.trim().length === 0 ||
        password.trim().length === 0
      ) {
        toast.error("Email and password are required");
        dispatch(signInFailure(error));
        return;
      } else {
        dispatch(signInStart());

        const res = await fetch(`${BASE_URL}/api/user/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json();
          dispatch(signInFailure(err.data));
          toast.error(err.data.message || "Something went wrong!");
          return;
        } else {
          const data = await res.json();
          console.log(data);
          dispatch(signInSuccess(data));
          if (data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="w-full bg-slate-200">
      <Header />
      <div className="p-3 max-w-lg mx-auto py-24">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
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
            className="bg-blue-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont Have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>

        <ToastContainer autoClose={2000} />
        {/* <p
          className={`text-red-700 mt-5 transition-opacity ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {error ? toast(error) || "Something went wrong!" : ""}
        </p> */}
        <div className="pt-5 pl-20">
          <p>Instructor Demo Details:</p>
          <p>Email: xyz@gmail.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
