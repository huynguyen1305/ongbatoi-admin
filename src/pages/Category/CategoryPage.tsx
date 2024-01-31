import { Button, Flex, Image, Space, Table, Typography } from "antd";
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
  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/category`
      );
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
      render: (text) => (
        <div className="">
          <Image
            src={text}
            alt="feature-image"
            width={100}
            height={75}
            className="object-contain"
          />
        </div>
      ),
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
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    </Flex>
  );
};

export default CategoryPage;
