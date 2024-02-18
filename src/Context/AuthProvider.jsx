import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token || loggedIn) {
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          `http://13.229.77.43/api/auth/user-info`,
          { token },
          header
        )
        .then((res) => {
          if (res.data.data) {
            const userinfo = res.data.data;
            setLoggedIn(true);
            setUser(userinfo);
            setLoading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token, loggedIn]);

  const logout = () => {
    Cookies.remove("accessToken");
    setLoading(false);
    setLoggedIn(false);
    setUser(null);
  };

  const authContextValue = {
    user,
    setLoggedIn,
    setLoading,
    loading,
    logout,
    setUser,
    loggedIn,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
