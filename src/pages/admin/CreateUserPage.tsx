import { registerApi } from "@/apis/auth";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Typography,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
  displayName: string;
};

const CreateUserPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await registerApi({
      username: values.username,
      password: values.password,
      displayName: values.displayName,
    });
    if (res.status === 200) {
      console.log(res.data.data);
      api.success({
        message: "Create success",
      });
      setTimeout(() => {
        navigate("/users");
      }, 1000);
    }
  };
  return (
    <>
      {contextHolder}
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
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="rounded-[6px] border-[#d9d9d9] max-h-[34px]"
                size="small"
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Display Name"
              name="displayName"
              rules={[
                { required: true, message: "Please input your Display Name!" },
              ]}
            >
              <Input
                className="rounded-[6px] border-[#d9d9d9] max-h-[34px]"
                size="small"
              />
            </Form.Item>
            <Flex align="center" gap={20} className="absolute bottom-5 right-5">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateUserPage;
