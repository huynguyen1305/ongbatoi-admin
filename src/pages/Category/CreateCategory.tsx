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
import { useNavigate } from "react-router-dom";
import {
  CreateCategoryFormValue,
  CreateCategoryPayload,
} from "@/interface/category";
import { useCreateCategory } from "@/hooks/category";

const initialValues: CreateCategoryFormValue = {
  slug: "",
  title: "",
  description: "",
  feature_image: [],
};

const CreateCategory = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const { mutate: createCategory } = useCreateCategory();

  const slugValue = Form.useWatch("title", form) || "";

  const uploadProps: UploadProps = {
    action: `${import.meta.env.VITE_BASE_API_URL}/api/upload/files`,
    multiple: false,
    accept: "image/*",
    onChange: (info) => {
      if (info.file.status === "done") {
        form.setFieldsValue({
          feature_image: info.file.response.data,
        });
      }
    },
  };

  const onFinish = async (values: CreateCategoryFormValue) => {
    console.log("Success:", values);
    const data: CreateCategoryPayload = {
      ...values,
      slug: convertToSlug(values.title),
      feature_image: values.feature_image[0]?.url,
    };
    try {
      createCategory(data, {
        onSuccess: (res) =>
          api.success({
            message: res.data.message,
          }),
      });
      form.resetFields();
      setTimeout(() => {
        navigate("/category");
      }, 500);
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
          initialValues={initialValues}
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
