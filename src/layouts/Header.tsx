import { Layout, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  return (
    <Header className="flex items-center justify-between h-16 px-10">
      <Typography className="text-2xl font-semibold capitalize">
        {pathname.substring(1).replace(/[\/]/g, " > ").replace(/[\/-]/g, " ")}
      </Typography>
      <div className="flex gap-2">
        <Typography className="text-2xl font-semibold">
          {user?.username},
        </Typography>
        <Typography
          className="text-2xl font-semibold capitalize cursor-pointer"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Log out
        </Typography>
      </div>
    </Header>
  );
};

export default HeaderComponent;
