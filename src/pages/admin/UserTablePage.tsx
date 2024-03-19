import { Flex, Typography, Button, Table, TableProps, Space } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const dataSource = [
  { username: "Peter" },
  { username: "Peter" },
  { username: "Peter" },
  { username: "Peter" },
  { username: "Peter" },
];

const UserTablePage = () => {
  const navigate = useNavigate();
  const columns: TableProps["columns"] = useMemo(
    () => [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Action",
        key: "action",
        render: (_, _record) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => navigate(`/users/${_record.slug}`)}
            >
              Edit
            </Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [navigate]
  );
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
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        rowKey="_id"
      />
    </Flex>
  );
};

export default UserTablePage;
