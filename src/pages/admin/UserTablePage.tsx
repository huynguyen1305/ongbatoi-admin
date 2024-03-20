import baseClient from "@/configs/baseClient";
import { Flex, Typography, Button, Table, TableProps, Space } from "antd";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// const dataSource = [
//   { username: "Peter" },
//   { username: "Peter" },
//   { username: "Peter" },
//   { username: "Peter" },
//   { username: "Peter" },
// ];

const UserTablePage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return baseClient.get("/user");
    },
  });
  console.log(data?.data);

  const columns: TableProps["columns"] = isLoading
    ? undefined
    : [
        {
          title: "Username",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "Display Name",
          dataIndex: "displayName",
          key: "displayName",
        },
        {
          title: "Action",
          key: "action",
          render: (_, _record) => (
            <Space size="middle">
              <Button
                type="primary"
                // onClick={() => navigate(`/users/${_record.slug}`)}
              >
                Edit
              </Button>
              <Button type="primary" danger>
                Delete
              </Button>
            </Space>
          ),
        },
      ];

  if (isLoading) return <div></div>;

  return (
    <Flex vertical className="gap-10">
      <Flex justify="space-between">
        <Typography className="text-black text-3xl font-semibold">
          User Table
        </Typography>
        <Button type="primary" onClick={() => navigate("/create-user")}>
          Create user
        </Button>
      </Flex>

      {isLoading ? null : (
        <Table
          columns={columns}
          dataSource={isLoading ? undefined : data?.data.data}
          pagination={false}
          bordered
          rowKey="_id"
        />
      )}
    </Flex>
  );
};

export default UserTablePage;
