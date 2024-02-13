import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const senddata = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };

      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(senddata),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        const errorData = await res.json();
        dispatch(signInFailure(errorData));
        toast.error(errorData.message);
        console.error("Error during Google authentication:", errorData);
        // Display or log the error message received from the server
      }
    } catch (error) {
      console.log("Couldn't login with Google", error);
    }
  };

  return (
    <div className="w-full mx-auto">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white p-3 w-full rounded-lg uppercase hover:opacity-95 px-20"
      >
        Continue with google
      </button>
    </div>
  );
}
