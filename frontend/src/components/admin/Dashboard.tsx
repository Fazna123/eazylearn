import { useState } from "react";
import DashboardWidgets from "./DashboardWidgets";

type Props = {
  isDashboard: boolean;
};

const Dashboard = ({ isDashboard }: Props) => {
  const [open] = useState(false);
  return (
    <div className="w-full">
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default Dashboard;
