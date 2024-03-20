import { loginApi } from "@/apis/auth";
import { Button, Flex, Form, FormProps, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res = await loginApi({
      username: values.username,
      password: values.password,
    });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.data);
      navigate("/");
    }
  };
  return (
    <Flex
      vertical
      className="h-[100vh] bg-slate-400"
      justify="center"
      align="center"
    >
      <Flex
        vertical
        align="center"
        gap={40}
        className="bg-lime-100 px-20 py-10 rounded-3xl"
      >
        <Typography className="text-black font-semibold text-2xl">
          Login Form
        </Typography>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
