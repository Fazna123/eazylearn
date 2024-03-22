import { useSelector } from "react-redux";
import InstructorApproval from "./InstructorApproval";
import InstructorDashboard from "./InstructorDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Instructor() {
  const { currentUser } = useSelector((state) => state.user);

  const role: boolean = currentUser.user.role === "instructor";

  return (
    <>
      <Header />
      {role ? <InstructorDashboard /> : <InstructorApproval />}
      <Footer />
    </>
  );
}
