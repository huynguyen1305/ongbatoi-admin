import baseClient from "@/configs/baseClient";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { data } = useQuery({
    queryKey: ["user/me"],
    queryFn: async () => {
      const res = await baseClient.get("/user/me");

      return res.data;
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    staleTime: 43200000,
    cacheTime: 43200000,
  });

  if (data?.data) {
    localStorage.setItem("user", JSON.stringify(data?.data));
  }

  useEffect(() => {
    console.log(
      !token ||
        token === "" ||
        token === null ||
        token === undefined ||
        token === "undefined",
      token
    );
  }, [token]);

  if (
    !token ||
    token === "" ||
    token === null ||
    token === undefined ||
    token === "undefined"
  ) {
    return <Navigate to="/login" />;
  } else {
    baseClient.defaults.headers.common["Authorization"] = token;
    return <Outlet />;
  }
};

export default ProtectedRoute;
