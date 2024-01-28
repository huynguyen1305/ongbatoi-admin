import { Layout, Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

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
  return (
    <Sider className="min-w-[25%]">
      <Menu
        onClick={onClick}
        className="w-full bg-inherit mt-16"
        defaultSelectedKeys={["posts"]}
        defaultOpenKeys={["posts"]}
        mode="inline"
        items={items}
        theme="dark"
      />
    </Sider>
  );
};

export default SiderComponent;
