import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Otp from "./pages/Otp";
import PrivateRoute from "./components/PrivateRoute";
import AdminHome from "./pages/AdminHome";
import AdminSignIn from "./pages/AdminSignin";
//import AdminPrivateRoute from "./components/AdminPrivateRoute";
//import AdminHeader from "./components/AdminHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminSignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
