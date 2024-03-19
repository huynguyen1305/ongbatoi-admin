import { Button, Flex, Form, FormProps, Input, Typography } from "antd";

type FieldType = {
  username: string;
  password: string;
};

const CreateUserPage = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <Flex vertical className="gap-10 h-full">
      <Typography className="text-black text-3xl font-semibold">
        Create User
      </Typography>
      <Flex vertical gap={40} className="relative w-full h-full">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="rounded-[6px] border-[#d9d9d9] max-h-[34px]"
              size="small"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Flex align="center" gap={20} className="absolute bottom-5 right-5">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default CreateUserPage;
