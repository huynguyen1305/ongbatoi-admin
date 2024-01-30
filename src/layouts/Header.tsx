import { Layout, Typography } from "antd";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const { pathname } = useLocation();
  return (
    <Header className="flex flex-col justify-center h-16 px-10">
      <Typography className="text-2xl font-semibold capitalize">
        {pathname.replace(/[\/-]/g, " ")}
      </Typography>
    </Header>
  );
};

export default HeaderComponent;
