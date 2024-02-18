import Loader from "@/Components/Shared/Loader/Loader";
import { AuthContext } from "@/Context/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return router.replace("/login");
};

export default PrivateRoute;
