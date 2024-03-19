import { Button, Flex, Image, Space, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCategoryList } from "@/hooks/category";
import { CategoryListItem } from "@/interface/category";
import { useMemo } from "react";
import baseClient from "@/configs/baseClient";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { data: dataCategory, refetch } = useGetCategoryList();
  const columns: TableProps<CategoryListItem>["columns"] = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },

      {
        title: "Feature Image",
        dataIndex: "feature_image",
        key: "feature_image",
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
            <Button
              type="primary"
              onClick={() => navigate(`/edit-category/${_record.slug}`)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={async () => {
                await baseClient.delete(`/category/${_record.slug}`);
                refetch();
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [navigate, refetch]
  );

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
      <Table
        columns={columns}
        dataSource={dataCategory}
        pagination={false}
        bordered
        rowKey="_id"
      />
    </Flex>
  );
};

export default CategoryPage;
