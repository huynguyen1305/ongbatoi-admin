import { useQuery } from "react-query";
import {
  Flex,
  Typography,
  Button,
  Table,
  TableProps,
  Tag,
  Image,
  Space,
} from "antd";

import { useNavigate } from "react-router-dom";
import baseClient from "@/configs/baseClient";
import PreviewModal from "@/components/PreviewModal/PreviewModal";
import { useState } from "react";

// interface DataType {
//   key: string;
//   title: string;
//   description: number;
//   category: string[];
//   isPublic: boolean;
// }

const PostPage = () => {
  const navigate = useNavigate();
  const [isOpenPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const { data: dataPost, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await baseClient.get(`/post`);
      return res.data.data;
    },
  });

  const columns: TableProps["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Typography.Link
          onClick={() => {
            setOpenPreviewModal(true);
            setSelectedPost(record);
          }}
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
        return record.isPublic === true ? (
          <div className="bg-green-500 w-4 h-4 rounded-xl" />
        ) : (
          <div className="bg-red-500 w-4 h-4 rounded-xl" />
        );
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
    {
      title: "Action",
      key: "action",
      render: (_, _record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/edit-post/${_record.slug}`)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              await baseClient.delete(`/post/${_record.slug}`);
              refetch();
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isOpenPreviewModal && selectedPost && (
        <PreviewModal
          open={isOpenPreviewModal}
          close={() => {
            setOpenPreviewModal(false);
            setSelectedPost(null);
          }}
          data={selectedPost}
        />
      )}
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
    </>
  );
};

export default PostPage;
