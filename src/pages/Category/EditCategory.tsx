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
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateCategoryFormValue,
  CreateCategoryPayload,
} from "@/interface/category";
// import { useCreateCategory } from "@/hooks/category";
import { useQuery } from "react-query";
import baseClient from "@/configs/baseClient";
import { useEffect, useState } from "react";

const EditCategory = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: dataCategoryDetail, isLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await baseClient.get(`/category/${slug}`);
      return res.data.data;
    },
    cacheTime: 0,
  });
  console.log(dataCategoryDetail);

  const [urlImage, setUrlImage] = useState<any>(
    dataCategoryDetail?.feature_image
  );

  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  //   const { mutate: createCategory } = useCreateCategory();

  const slugValue = Form.useWatch("title", form) || "";

  const uploadProps: UploadProps = {
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

  const onFinish = async (values: CreateCategoryFormValue) => {
    console.log("Success:", values);
    const data: CreateCategoryPayload = {
      ...values,
      feature_image: urlImage ? urlImage : null,
    };
    try {
      const res = await baseClient.patch(`/category/${slug}`, data);
      api.success({
        message: res.data.message,
      });
      form.resetFields();
      setUrlImage(null);
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

  useEffect(() => {
    if (dataCategoryDetail) {
      setUrlImage(dataCategoryDetail?.feature_image);
    }
  }, [dataCategoryDetail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextHolder}
      <Flex vertical gap={40} className="relative w-full h-full">
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={dataCategoryDetail}
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
              <Input disabled />
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
              label="Feature Image"
              valuePropName="feature_image"
              name="feature_image"
            >
              <Upload
                {...uploadProps}
                listType="picture"
                maxCount={1}
                defaultFileList={
                  dataCategoryDetail?.feature_image
                    ? [
                        {
                          uid: "1",
                          name: "",
                          status: "done",
                          url: dataCategoryDetail?.feature_image,
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

export default EditCategory;
