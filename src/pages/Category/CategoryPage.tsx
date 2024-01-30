import { Button, Flex, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface DataType {
  key: string;
  title: string;
  description: number;
}

const CategoryPage = () => {
  const navigate = useNavigate();
  const {
    data: dataCategory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/category");
      return res.data.data;
    },
  });
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
      title: "Feature Image",
      dataIndex: "feature-image",
      key: "feature-image",
    },
    {
      title: "Action",
      key: "action",
      render: (_, _record) => (
        <Space size="middle">
          <a>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] =
    dataCategory?.map((item: any) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      "feature-image": item.feature_image,
    })) || [];
  console.log(dataCategory, isLoading, isError);
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
