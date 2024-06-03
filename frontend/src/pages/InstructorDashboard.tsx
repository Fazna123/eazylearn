import InstructorDashboardView from "../components/instructor/InstructorDashboardView";
import InstructorHeader from "../components/instructor/InstructorHeader";
import InstructorLayout from "./InstructorLayout";

InstructorLayout;

export default function InstructorDashboard() {
  return (
    <InstructorLayout>
      {/* Your instructor dashboard content goes here */}
      <div className="w-full bg-blue-50 m-0 h-full">
        {/* <h2 className="text-2xl font-bold p-10">Dashboard Content</h2> */}
        <InstructorHeader />
        <InstructorDashboardView />
      </div>
    </InstructorLayout>
  );
}
