import { Flex, Typography, Button, Table, Space, TableProps } from "antd";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  title: string;
  description: number;
  category: string[];
  isPublic: boolean;
}

const PostPage = () => {
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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Is Public",
      dataIndex: "isPublic",
      key: "isPublic",
      render(value, record, index) {
        return record.isPublic === true ? "YES" : "NO";
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
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
      category: ["shoes", "hat"],
      isPublic: false,
    },
    {
      key: "2",
      title: "Jim Green",
      description: 42,
      category: ["shoes", "hat"],
      isPublic: true,
    },
    {
      key: "3",
      title: "Joe Black",
      description: 32,
      category: ["shoes", "hat"],
      isPublic: true,
    },
  ];
  return (
    <Flex vertical className="gap-10">
      <Flex justify="space-between">
        <Typography className="text-black text-3xl font-semibold">
          Posts
        </Typography>
        <Button type="primary" onClick={() => navigate("/create-post")}>
          Create Post
        </Button>
      </Flex>
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
};

export default PostPage;
