import RecentUsers from "../../Dashboard/RecentUsers/RecentUsers";
import AdminBarChart from "../../Dashboard/AdminBarChart/AdminBarChart";
import AdminTopCards from "../AdminTopCards/AdminTopCards";

const AdminDashboard = () => {
  return (
    <div className="px-6  min-h-screen w-full">
      <AdminTopCards></AdminTopCards>
      <div className="flex items-center">
        <AdminBarChart></AdminBarChart>
        <RecentUsers></RecentUsers>
      </div>
    </div>
  );
};

export default AdminDashboard;
