import React, { ReactNode } from "react";
import InstructorSideBar from "../components/instructor/InstructorSideBar";
//import InstructorHeader from "../components/instructor/InstructorHeader";

interface InstructorLayoutProps {
  children: ReactNode;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <InstructorSideBar />
      {/* <InstructorHeader /> */}
      <div className="flex-1 p-0 bg-blue-50">{children}</div>
    </div>
  );
};

export default InstructorLayout;
