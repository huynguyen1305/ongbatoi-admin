import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(!token || token === "");
  }, [token]);

  if (!token || token === "") {
    return <Navigate to="/login" />;
  } else return <Outlet />;
};

export default ProtectedRoute;
