/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { getCookies } from "../../utils";
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ allowedJabatan }) => {
  const [, setTes] = useState(null);
  const token = getCookies("access_token");
  const role = getCookies("user_role");

  const checkCookies = () => {
    const token = getCookies("access_token");
    const role = getCookies("user_role");
    setTes({ token, role });
  };

  useEffect(() => {
    setTes({ token, role });
    const intervalId = setInterval(checkCookies, 3000);
    return () => clearInterval(intervalId);
  }, [token, role]);

  if (!role || !token) {
    return <Navigate to={"/login"} />;
  }

  const isAllowed = allowedJabatan.includes(role);

  return isAllowed ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
