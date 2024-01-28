import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";

const CreateCategory = () => {
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
          <Form.Item
            label="Description"
            className="min-w-[400px]"
            name="description"
          >
            <Input />
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
          <Flex align="center" gap={20} className="absolute bottom-5 right-5">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};

export default CreateCategory;
