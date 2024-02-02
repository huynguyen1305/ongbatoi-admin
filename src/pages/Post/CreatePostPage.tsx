import SunEditorComp from "@/components/SunEditorComp";
import { convertToSlug } from "@/utils";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  UploadProps,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import baseClient from "@/configs/baseClient";
import { useState } from "react";
import PreviewModal from "@/components/PreviewModal/PreviewModal";

const CreatePostPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await baseClient.get(`/category`);
      return res.data.data;
    },
  });
  const [form] = useForm();
  const initForm = {
    title: "",
    description: "",
    feature_image: null,
    feature_audio: null,
    category: [],
    isPublic: false,
    content: "",
  };
  const slugValue = Form.useWatch("title", form) || "";

  const [isOpenPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const uploadImageProps: UploadProps = {
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
  const uploadAudioProps: UploadProps = {
    action: `${import.meta.env.VITE_BASE_API_URL}/api/upload/files`,
    multiple: false,
    accept: "audio/*",
    onChange: (info) => {
      if (info.file.status === "done") {
        form.setFieldsValue({
          feature_audio: info.file.response.data,
        });
      }
    },
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const data = {
      title: values.title,
      description: values.description,
      slug: convertToSlug(values.title),
      feature_image: values.feature_image ? values.feature_image[0]?.url : null,
      feature_audio: values.feature_audio ? values.feature_audio[0]?.url : null,
      category: values.category,
      isPublic: values.isPublic,
      content: values.content,
    };
    try {
      const rest = await baseClient.post(`/post`, data);
      api.success({
        message: rest.data.message,
      });
      console.log(rest.data);
      form.resetFields();
      setTimeout(() => {
        navigate("/posts");
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
      {isOpenPreviewModal && selectedPost && (
        <PreviewModal
          open={isOpenPreviewModal}
          close={() => {
            setOpenPreviewModal(false);
            setSelectedPost(null);
          }}
          data={selectedPost}
        />
      )}
      <Flex vertical gap={40} className="relative w-full h-full">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          initialValues={initForm}
          onFinish={onFinish}
        >
          <div className="flex w-[1280px] gap-10">
            <Flex vertical className="w-1/2">
              <Form.Item
                label="Title"
                className="min-w-[400px]"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input name="title" />
              </Form.Item>
              <Form.Item label="Slug" className="min-w-[400px]">
                {convertToSlug(slugValue)}
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your description!" },
                  { max: 120, message: "Maximum 120 characters!" },
                ]}
              >
                <Input.TextArea rows={2} name="description" />
              </Form.Item>
              <Form.Item
                label="Feature Image"
                valuePropName="feature_image"
                name="feature_image"
              >
                <Upload {...uploadImageProps} listType="picture">
                  <button type="button" className="p-4 rounded-xl">
                    <PlusOutlined />
                    <div>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            </Flex>
            <Flex vertical className="w-1/2">
              <Form.Item
                label="Category"
                valuePropName="checked"
                name="category"
                rules={[
                  { required: true, message: "Please select at least 1 item" },
                ]}
              >
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Please select"
                  style={{ width: "100%" }}
                  options={
                    dataCategory
                      ? dataCategory.map((item: any) => ({
                          label: item.title,
                          value: item.slug,
                        }))
                      : []
                  }
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
                valuePropName="feature_audio"
                name="feature_audio"
              >
                <Upload
                  {...uploadAudioProps}
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
          <Form.Item
            valuePropName="content"
            name="content"
            wrapperCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please input your content!" },
              {
                min: 15,
              },
            ]}
          >
            <SunEditorComp
              handleEditorChange={(value) => {
                console.log("value", value);
                form.setFieldsValue({
                  content: value,
                });
              }}
              value=""
              height="375px"
            />
          </Form.Item>
          <Flex gap={20} className="py-4 justify-end">
            <Button
              type="primary"
              onClick={() => {
                setOpenPreviewModal(true);
                setSelectedPost(form.getFieldsValue());
              }}
            >
              Preview
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Flex>
    </>
  );
};

export default CreatePostPage;
