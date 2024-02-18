import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (user?.role === "admin") {
    return children;
  }

  return router.replace("/login");
};

export default AdminRoute;
