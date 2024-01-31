import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Upload,
  UploadProps,
  notification,
} from "antd";

import { convertToSlug } from "@/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initForm = {
    title: "",
    description: "",
    feature_image: "",
  };
  const slugValue = Form.useWatch("title", form) || "";

  const uploadProps: UploadProps = {
    action: `${import.meta.env.VITE_BASE_API_URL}/api/upload/files`,
    multiple: false,
    onChange: (info) => {
      if (info.file.status === "done") {
        form.setFieldsValue({
          feature_image: info.file.response.data,
        });
      }
    },
  };

  const onFinish = async (values: any) => {
    const data = {
      title: values.title,
      description: values.description,
      slug: convertToSlug(values.title),
      feature_image: values.feature_image[0]?.url,
    };
    try {
      const rest = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/category`,
        data
      );
      api.success({
        message: rest.data.message,
      });
      form.resetFields();
      setTimeout(() => {
        navigate("/category");
      }, 1000);
    } catch (error) {
      console.error(error);
      api.error({
        message: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Flex vertical gap={40} className="relative w-full h-full">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={initForm}
          layout="horizontal"
          className="flex w-full gap-10"
          onFinish={onFinish}
        >
          <Flex vertical>
            <Form.Item
              label="Title"
              className="min-w-[400px]"
              name="title"
              validateDebounce={500}
              required
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Slug" className="min-w-[400px]">
              {convertToSlug(slugValue)}
            </Form.Item>
            <Form.Item
              label="Description"
              className="min-w-[400px]"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
                { max: 120, message: "Maximum 120 characters!" },
              ]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Upload File"
              valuePropName="feature_image"
              // getValueFromEvent={normFile}
              name="feature_image"
            >
              <Upload {...uploadProps} listType="picture">
                <button type="button" className="p-4 rounded-xl">
                  <PlusOutlined />
                  <div>Upload</div>
                </button>
              </Upload>
            </Form.Item>
            <Flex align="center" gap={20} className="absolute bottom-5 right-5">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};

export default CreateCategory;
