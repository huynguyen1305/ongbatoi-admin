import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import avatar from "@/assets/images/avatar-default.png";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/${key}`}>{label}</Link>,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    "",
    "",
    null,
    [
      getItem("Posts", "posts"),
      getItem("Category", "category"),
      getItem("User", "users"),
    ],
    "group"
  ),
];

const SiderComponent = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.keyPath[0]);
  };
  const location = useLocation();

  return (
    <Sider
      className="min-w-[25%]"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Link to="/">
        <div className="bg-white h-16 w-full flex items-center justify-center">
          <img src={avatar} style={{ width: "40px", height: "40px" }} />
        </div>
      </Link>

      <Menu
        onClick={onClick}
        className="w-full bg-inherit"
        defaultSelectedKeys={[location.pathname.replace(/[\/]/g, "")]}
        defaultOpenKeys={[location.pathname.replace(/[\/]/g, "")]}
        mode="inline"
        items={items}
        theme="dark"
      />
    </Sider>
  );
};

export default SiderComponent;
