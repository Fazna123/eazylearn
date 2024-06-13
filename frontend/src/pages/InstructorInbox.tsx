import Footer from "../components/Footer";
import Header from "../components/Header";
import InstructorHeader from "../components/instructor/InstructorHeader";
import InstructorMessages from "../components/instructor/InstructorMessages";
import InstructorLayout from "./InstructorLayout";

const InstructorInbox = () => {
  return (
    <>
      <Header />
      <InstructorLayout>
        <InstructorHeader />
        <InstructorMessages />
      </InstructorLayout>
      <Footer />
    </>
  );
};

export default InstructorInbox;
