import { Layout } from "antd";
import SiderComponent from "./layouts/Sider";
import HeaderComponent from "./layouts/Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

function AppLayout() {
  return (
    <Layout className="h-[100vh]">
      <SiderComponent />
      <Layout>
        <HeaderComponent />
        <Content className="bg-gray-400 p-5">
          <div className="w-full h-full bg-white p-5">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
