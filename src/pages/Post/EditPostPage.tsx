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
import { useNavigate, useParams } from "react-router-dom";
import baseClient from "@/configs/baseClient";
import { useEffect, useState } from "react";
import PreviewModal from "@/components/PreviewModal/PreviewModal";
import PlaygroundApp from "@/components/LexicalEditor/src/PlaygroundApp";

const EditPostPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await baseClient.get(`/category`);
      return res.data.data;
    },
  });
  const { data: dataPostDetail, isLoading } = useQuery({
    queryKey: ["posts", slug],
    queryFn: async () => {
      const res = await baseClient.get(`/post/${slug}`);
      return res.data.data;
    },
    cacheTime: 0,
  });

  const { data: author } = useQuery({
    queryKey: ["author"],
    queryFn: async () => {
      const res = await baseClient.get(
        `/user/find-by-id/${dataPostDetail?.author}`
      );
      return res.data.data;
    },

    enabled: !!dataPostDetail,
  });
  console.log("author", author);
  const [urlImage, setUrlImage] = useState<any>(dataPostDetail?.feature_image);
  const [urlAudio, setUrlAudio] = useState<any>(dataPostDetail?.feature_audio);

  const [form] = useForm();

  const slugValue = Form.useWatch("title", form) || "";

  const [isOpenPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const uploadImageProps: UploadProps = {
    action: `${import.meta.env.VITE_BASE_API_URL}/api/upload/files`,
    multiple: false,
    accept: "image/*",
    onChange: (info) => {
      console.log(info.file.status);
      if (info.file.status === "done") {
        form.setFieldsValue({
          feature_image: info.file.response.data,
        });
        setUrlImage(info.file.response.data[0].url);
      }
      if (info.file.status === "removed") {
        setUrlImage(null);
      }
    },
    onRemove: () => {
      form.setFieldsValue({
        feature_image: null,
      });
    },
  };
  const uploadAudioProps: UploadProps = {
    action: `${import.meta.env.VITE_BASE_API_URL}/api/upload/files`,
    multiple: false,
    accept: "audio/*",
    onChange: (info) => {
      console.log(info.file.status);
      if (info.file.status === "done") {
        console.log(info.file.response.data);
        form.setFieldsValue({
          feature_audio: info.file.response.data,
        });
        setUrlAudio(info.file.response.data[0].url);
      }
      if (info.file.status === "removed") {
        setUrlAudio(null);
      }
    },
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const data = {
      title: values.title,
      description: values.description,
      slug: convertToSlug(values.title),
      feature_image: urlImage ? urlImage : null,
      feature_audio: urlAudio ? urlAudio : null,
      category: values.category,
      isPublic: values.isPublic,
      isVideo: values.isVideo,
      content: values.content,
    };
    console.log(data);
    try {
      const rest = await baseClient.patch(`/post/${slug}`, data);
      api.success({
        message: rest.data.message,
      });
      console.log(rest.data);
      form.resetFields();
      setUrlAudio(null);
      setUrlImage(null);
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

  useEffect(() => {
    if (dataPostDetail) {
      setUrlAudio(dataPostDetail?.feature_audio);
      setUrlImage(dataPostDetail?.feature_image);
    }
  }, [dataPostDetail]);

  console.log("dataPostDetail", dataPostDetail);

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
          initialValues={dataPostDetail}
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
                  initialHtml={dataPostDetail?.content}
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
                name="category"
                // initialValue={dataPostDetail?.category}
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
              <Form.Item label="Author" name="author">
                {author && author?.displayName}
              </Form.Item>
              <Form.Item
                label="Feature Image"
                valuePropName="feature_image"
                name="feature_image"
              >
                <Upload
                  {...uploadImageProps}
                  listType="picture"
                  maxCount={1}
                  defaultFileList={
                    dataPostDetail?.feature_image
                      ? [
                          {
                            uid: "1",
                            name: "",
                            status: "done",
                            url: dataPostDetail?.feature_image,
                          },
                        ]
                      : []
                  }
                >
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
                <Upload
                  {...uploadAudioProps}
                  listType="picture"
                  maxCount={1}
                  defaultFileList={
                    dataPostDetail?.feature_audio
                      ? [
                          {
                            uid: "1",
                            name: "audio.mp3",
                            status: "done",
                            url: dataPostDetail?.feature_audio,
                          },
                        ]
                      : []
                  }
                >
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

export default EditPostPage;
