import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  signOut,
} from "../redux/user/userSlice";

import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  //console.log("formdata", formData);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const admin = currentUser.user.role === "admin";

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleFileUpload = async (image: File | undefined) => {
    const storage = getStorage(app);
    if (image) {
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          console.log(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, profilePicture: downloadURL })
          );
        }
      );
    }
  };

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("form data", formData);
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/updateuser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //const data = datarecieved
      console.log("data", data);

      if (!res.ok) {
        dispatch(updateUserFailure(data));
        return;
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/logout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
      alert("Logout failed. Please try again later.");
    }
  };

  return (
    <>
      {!admin && <Header />}
      {/* <Header /> */}
      <div className="bg-blue-50 p-10 h-full">
        <div className="p-3 max-w-lg mx-auto bg-white h-auto">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                //setImage(e.target.files[0])
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setImage(selectedFile);
                }
              }}
            />
            <img
              src={formData.profilePicture || currentUser.user.avatar}
              alt="👤"
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
              onClick={() => fileRef.current?.click()}
            />
            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-red-700">
                  Error Uploading(Size should be less than 2MB)
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-slate-700">{`Uploadng Image...${imagePercent}%`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-700">
                  Image Uploaded Successfully
                </span>
              ) : (
                ""
              )}
            </p>
            <input
              defaultValue={currentUser.user.name}
              type="text"
              id="name"
              placeholder="Username"
              className="bg-blue-50 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.user.email}
              type="email"
              id="email"
              placeholder="Email"
              className="bg-blue-50 rounded-lg p-3"
              //onChange={handleChange}
              disabled={true}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-blue-50 rounded-lg p-3"
              onChange={handleChange}
            />
            <button className="bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              {loading ? "Loading.." : "Update"}
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <span
              className=" p-1 text-red-700 hover:font-semibold hover:text-blue-900 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </span>
            {/* <span
            className="text-red-700 cursor-pointer"
            // onClick={handleDeleteAccount}
          >
            Delete Account
          </span> */}
            {admin ? (
              <Link
                to="/admin"
                className="text-red-700 cursor-pointer"
                // onClick={handleDeleteAccount}
              >
                Back to Dashboard
              </Link>
            ) : (
              <span
                className="text-red-700 cursor-pointer"
                // onClick={handleDeleteAccount}
              >
                Delete Account
              </span>
            )}
            {admin}
          </div>
          <p className="text-red-700 mt-5">
            {error && "Something went wrong!"}
          </p>
          <p className="text-green-700 mt-5">
            {updateSuccess && "User updated successfully!"}
          </p>
        </div>
      </div>
      {/* <Footer /> */}
      {!admin && <Footer />}
    </>
  );
}
