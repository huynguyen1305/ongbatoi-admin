// import SunEditorComp from "@/components/SunEditorComp";
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
import PlaygroundApp from "@/components/LexicalEditor/src/PlaygroundApp";

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

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form] = useForm();
  const initForm = {
    title: "",
    description: "",
    feature_image: null,
    feature_audio: null,
    category: [],
    isPublic: false,
    isVideo: false,
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
      isVideo: values.isVideo,
      content: values.content,
      author: {
        _id: user._id,
      },
    };
    console.log(data);
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
      <Flex vertical className="relative w-full h-full">
        <Form
          form={form}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 24 }}
          layout="horizontal"
          initialValues={initForm}
          onFinish={onFinish}
        >
          <div className="flex w-full flex-wrap">
            <div className="order-2 xl:order-1">
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
                <PlaygroundApp
                  handleEditorChange={(value: string) => {
                    console.log("value", value);
                    form.setFieldsValue({
                      content: value,
                    });
                  }}
                />
              </Form.Item>
              <Flex gap={20} className="py-4">
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
            </div>

            <div className="flex w-[500px] flex-shrink-0 flex-col gap-4 p-4 order-1 xl:order-2">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input your title!" },
                ]}
              >
                <Input name="title" />
              </Form.Item>
              <Form.Item label="Slug">{convertToSlug(slugValue)}</Form.Item>
              <Form.Item
                label={
                  <div className="flex flex-col">
                    <div>Description</div>

                    <small>Max: 300 chars</small>
                  </div>
                }
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your description!",
                  },
                ]}
              >
                <Input.TextArea rows={2} name="description" />
              </Form.Item>
              <Form.Item
                label="Category"
                valuePropName="checked"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select at least 1 item",
                  },
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
              <Form.Item label="Author" name="author">
                {user.displayName}
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
              <Form.Item
                label="Feature Audio"
                valuePropName="feature_audio"
                name="feature_audio"
              >
                <Upload {...uploadAudioProps} listType="picture">
                  <button type="button" className="p-4 rounded-xl">
                    <PlusOutlined />
                    <div>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Is Video"
                valuePropName="checked"
                name="isVideo"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Is Public"
                valuePropName="checked"
                name="isPublic"
              >
                <Switch />
              </Form.Item>
            </div>
          </div>

          {/* aaaaa */}
        </Form>
      </Flex>
    </>
  );
};

export default CreatePostPage;
