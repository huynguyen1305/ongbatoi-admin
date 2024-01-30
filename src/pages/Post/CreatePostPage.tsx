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
        onFinish={onFinish}
      >
        <div className="flex w-[1280px] gap-10">
          <Flex vertical className="w-1/2">
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
              <Upload listType="picture">
                <button type="button" className="p-4 rounded-xl">
                  <PlusOutlined />
                  <div>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Flex>
          <Flex vertical className="w-1/2">
            <Form.Item label="Category" valuePropName="checked" name="category">
              <Select
                mode="multiple"
                size="middle"
                placeholder="Please select"
                style={{ width: "100%" }}
                options={options}
              />
            </Form.Item>
            <Form.Item
              label="Is Public"
              valuePropName="checked"
              name="isPublic"
            >
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
                listType="picture"
                className="min-w-[400px]"
              >
                <button type="button" className="p-4 rounded-xl">
                  <PlusOutlined />
                  <div>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Flex>
        </div>
        <div>
          <Typography className="text-black">Content:</Typography>
        </div>
        <Flex align="center" gap={20} className="absolute bottom-5 right-5">
          <Button type="primary">Preview</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};

export default CreatePostPage;
