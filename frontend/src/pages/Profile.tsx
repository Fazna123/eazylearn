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
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
//import { CHANGE_PASSWORD } from "../utils/api";
import { changePasswordAPI } from "../utils/endPoint";

export default function Profile() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  //const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  // const [passwordError, setPasswordError] = useState("");
  // const [passwordSuccess, setPasswordSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("formdata", formData);

  const { currentUser, loading, error } = useSelector(
    (state: any) => state.user
  );
  const admin = currentUser.user.role === "admin";

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  //----------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------------------------

  const handleChange = (e: { target: { id: string; value: string } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
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
        swal(data.message);
        return;
      } else {
        dispatch(updateUserSuccess(data));
        //setUpdateSuccess(true);
        swal("User updated successfully", { icon: "success" });
        //swal(data.message);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  //-----------------------------------------------------------------------------------

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/logout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
      swal("Logout failed. Please try again later.");
    }
  };

  //---------------------------------------------------------------------------------------

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, oldPassword: e.target.value });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, newPassword: e.target.value });
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordData({ ...passwordData, confirmNewPassword: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handle password submit");
    try {
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        swal("New password and confirm password do not match.");
        return;
      }
      const { success, data, error } = await changePasswordAPI(
        passwordData.oldPassword,
        passwordData.newPassword
      );

      if (!success) {
        swal(error.message, { icon: "error" });
      } else {
        swal(data.message, { icon: "success" });
        clearPasswordFields(); // Clear password fields
      }

      // const res = await fetch(CHANGE_PASSWORD, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     oldPassword: passwordData.oldPassword,
      //     newPassword: passwordData.newPassword,
      //   }),
      // });
      // const res = change_password(
      //   passwordData.oldPassword,
      //   passwordData.newPassword
      // );
      // const data = await res.json();
      // if (!res.ok) {
      //   swal(data.message, { icon: "error" });
      // } else {
      //   swal("Password changed successfully", { icon: "success" });
      //   clearPasswordFields(); // Clear password fields
      // }
    } catch (error: any) {
      swal(error, { icon: "error" });
    }
  };
  const clearPasswordFields = () => {
    console.log("Clearing password fields");
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  //-------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    console.log("Component re-rendered"); // Add this line
  });

  //-------------------------------------------------------------------------------------------------------

  return (
    <>
      {!admin && <Header />}
      {/* <Header /> */}
      <div className="bg-blue-50 py-5 px-10 h-full flex flex-row justify-center">
        <div className="p-5 max-w-lg my-auto bg-white h-auto w-[30%]">
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
            {/* <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-blue-50 rounded-lg p-3"
              onChange={handleChange}
            /> */}

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
                to="/admin/dashboard"
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
          {/* <p className="text-red-700 mt-5">
            {error && "Something went wrong!"}
          </p>
          <p className="text-green-700 mt-5">
            {updateSuccess && "User updated successfully!"}
          </p> */}
        </div>
        <div className="p-5 max-w-lg my-auto ml-10 bg-white h-auto w-[30%]">
          <h2 className="text-xl font-semibold mt-5 mb-3 text-center">
            Change Password
          </h2>
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              id="oldPassword"
              required
              minLength={6}
              placeholder="Old Password"
              className="bg-blue-50 rounded-lg p-3"
              //onChange={handlePasswordChange}
              value={passwordData.oldPassword}
              onChange={handleOldPasswordChange}
            />
            <input
              type="password"
              id="newPassword"
              required
              minLength={6}
              placeholder="New Password"
              className="bg-blue-50 rounded-lg p-3"
              value={passwordData.newPassword}
              onChange={handleNewPasswordChange}
              //onChange={handlePasswordChange}
            />
            <label
              htmlFor="newPassword"
              className="text-green-600 mt-0 pt-0 font-light text-xs text-end"
            >
              New Password (min 6 characters)
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              required
              minLength={6}
              placeholder="Confirm New Password"
              className="bg-blue-50 rounded-lg p-3"
              value={passwordData.confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              //onChange={handlePasswordChange}
            />
            <button className="bg-blue-950 text-white p-3 rounded-lg uppercase hover:opacity-95">
              {loading ? "Loading.." : "Change Password"}
            </button>
            {/* {passwordError && <p className="text-red-700">{passwordError}</p>}
            {passwordSuccess && (
              <p className="text-green-700">Password changed successfully!</p>
            )} */}
          </form>
        </div>
      </div>
      {/* <Footer /> */}
      {!admin && <Footer />}
    </>
  );
}
