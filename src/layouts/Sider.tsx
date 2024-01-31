import { Layout, Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

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
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    "",
    "",
    null,
    [getItem("Posts", "posts"), getItem("Category", "category")],
    "group"
  ),
];

const SiderComponent = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.keyPath[0]);
  };
  const location = useLocation();

  return (
    <Sider className="min-w-[25%]">
      <div className="bg-white h-16 w-full flex items-center justify-center"></div>
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
