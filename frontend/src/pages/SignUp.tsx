import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import OAuth from "../components/OAuth";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SignUp() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.name.trim().length < 3) {
        toast.error("Enter a valid name");
      } else {
        setLoading(true);
        setError(false);

        const res = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          toast.error(data.message);
          setError(true);
          return;
        } else {
          const activation_token = data.activationToken;
          const user = data.user;
          navigate("/otp", { state: { activation_token, user } });
          //navigate('/otp')
        }
      }
    } catch (error) {
      //console.log(error)
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="w-full bg-slate-200">
      <Header />
      <div className="p-3 max-w-lg mx-auto py-24">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
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
            disabled={loading}
            className="bg-blue-900 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <ToastContainer autoClose={2000} />
        <p className="text-red-700 mt-5">
          {error
            ? "User Registration Failed!. Try with another email Address "
            : ""}
        </p>
      </div>
      <Footer />
    </div>
  );
}
