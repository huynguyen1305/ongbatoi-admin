import { Button, Flex, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: string;
  title: string;
  description: number;
}

const CategoryPage = () => {
  const navigate = useNavigate();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.title}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      title: "John Brown",
      description: 32,
    },
    {
      key: "2",
      title: "Jim Green",
      description: 42,
    },
    {
      key: "3",
      title: "Joe Black",
      description: 32,
    },
  ];
  return (
    <Flex vertical className="gap-10">
      <Flex justify="space-between">
        <Typography className="text-black text-3xl font-semibold">
          Category
        </Typography>
        <Button type="primary" onClick={() => navigate("/create-category")}>
          Create category
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
};

export default CategoryPage;
