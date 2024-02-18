import UserBarChart from "../../Dashboard/UserBarChart/UserBarChart";
import UserTopCards from "../UserTopCards/UserTopCards";

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-6 py-8 min-h-screen">
      <UserTopCards></UserTopCards>
      <div className="flex items-center">
        <UserBarChart></UserBarChart>
      </div>
    </div>
  );
};

export default UserDashboard;
