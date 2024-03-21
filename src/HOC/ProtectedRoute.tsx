import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(!token || token === "");
  }, [token]);

  if (
    !token ||
    token === "" ||
    token === null ||
    token === undefined ||
    token === "undefined"
  ) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default ProtectedRoute;
