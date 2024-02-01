import { useQuery } from "@tanstack/react-query";
import { Flex, Typography, Button, Table, TableProps, Tag, Image } from "antd";
import axios from "axios";
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
  const { data: dataPost } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/api/post`
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
      title: "Value Search",
      dataIndex: "valueSearch",
      key: "valueSearch",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value) => {
        return (
          <div>
            {value.map((item: any) => (
              <Tag key={item} className="mr-2">
                {item}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Is Public",
      dataIndex: "isPublic",
      key: "isPublic",
      render(_value, record) {
        return record.isPublic === true ? "YES" : "NO";
      },
    },
    {
      title: "Feature Image",
      dataIndex: "feature_image",
      key: "feature_image",
      render: (text) => (
        <div className="">
          {text ? (
            <Image
              src={text}
              alt="feature-image"
              width={100}
              height={75}
              className="object-contain"
            />
          ) : (
            "No data"
          )}
        </div>
      ),
    },
    {
      title: "Feature Audio",
      dataIndex: "feature_audio",
      key: "feature_audio",
      render: (text) => (
        <div>
          {text ? (
            <audio controls className="w-[250px]">
              <source src={text} />
              Your browser does not support the audio element.
            </audio>
          ) : (
            "No data"
          )}
        </div>
      ),
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => <div>{new Date(value).toLocaleString()}</div>,
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
      <Table
        columns={columns}
        dataSource={dataPost}
        rowKey="_id"
        pagination={false}
        bordered
      />
    </Flex>
  );
};

export default PostPage;
