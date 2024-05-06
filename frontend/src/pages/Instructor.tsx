import { useSelector } from "react-redux";
//import InstructorApproval from "./InstructorApproval";
import InstructorDashboard from "./InstructorDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstructorAuthorize from "./InstructorAuthorize";

export default function Instructor() {
  const { currentUser } = useSelector((state: any) => state.user);

  const role: boolean = currentUser.user.role === "instructor";

  return (
    <>
      <Header />
      {role ? <InstructorDashboard /> : <InstructorAuthorize />}
      <Footer />
    </>
  );
}
