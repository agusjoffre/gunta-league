import DashboardSelector from "@/components/dashboard/dashboard-selector";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <DashboardSelector />
    </div>
  );
};

export default Dashboard;
