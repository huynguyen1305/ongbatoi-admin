import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";

const options = [
  {
    label: "Book",
    value: "book",
  },
  {
    label: "Clothes",
    value: "clothes",
  },
  {
    label: "Shoes",
    value: "Shoes",
  },
];

const CreatePostPage = () => {
  const [form] = useForm();
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <Flex vertical gap={40} className="relative w-full h-full">
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        className="flex w-full gap-10"
        onFinish={onFinish}
      >
        <Flex vertical>
          <Form.Item label="Title" className="min-w-[400px]" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea rows={2} name="description" />
          </Form.Item>
          <Form.Item
            label="Feature Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="feature_image"
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Flex>
        <Flex vertical>
          <Form.Item label="Category" valuePropName="checked" name="category">
            <Select
              mode="multiple"
              size="middle"
              placeholder="Please select"
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
          <Form.Item label="Is Public" valuePropName="checked" name="isPublic">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Feature Audio"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="feature_audio"
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              className="min-w-[400px]"
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Flex>
        <Flex align="center" gap={20} className="absolute bottom-5 right-5">
          <Button type="primary">Preview</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form>
      <Typography className="text-black">Content:</Typography>
    </Flex>
  );
};

export default CreatePostPage;
