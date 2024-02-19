import { Modal, Typography, Image, Breadcrumb } from "antd";
import avatarDefault from "@/assets/images/avatar-default.png";

const PreviewModal = ({
  open,
  close,
  data,
}: {
  data: any;
  open: any;
  close: any;
}) => {
  console.log(data);

  return (
    <>
      <Modal footer={null} open={open} onCancel={close} width="80%">
        <div
          className="w-full h-full min-h-[500px] modalPreview"
          style={{ fontSize: "16px" }}
        >
          <div className="container mx-auto flex gap-5">
            <div className="w-2/3 h-full">
              <div className="w-full h-[auto] flex flex-col rounded-2xl border py-4 px-8 border-[#235C52] gap-5">
                <Breadcrumb
                  separator=">"
                  items={[
                    { title: "Home" },
                    { title: "Posts" },
                    { title: data.title },
                  ]}
                  className="fontTitle text-[16px]"
                ></Breadcrumb>

                <Typography className="text-[#235C52] text-[60px] fontTitle">
                  {data.title}
                </Typography>
                <div className="flex justify-between items-center">
                  <div className="w-fit flex gap-2 items-center">
                    <Image
                      preview={false}
                      src={avatarDefault}
                      alt="ongbatoi.vn"
                      className="rounded-full max-h-[4rem] border p-2 border-[#235C52]"
                    />

                    <div className="flex flex-col">
                      <Typography className="text-[20px] text-[#235C52] font-bold fontTitle">
                        Ông Bà Tôi
                      </Typography>
                      <Typography className="text-black italic fontText">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {data.feature_audio && (
                      <audio controls>
                        <source src={data.feature_audio} />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </div>
                <div className="modalPreviewContent sun-editor-editable prose lg:prose-lg max-w-[100%] fontText">
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
