import { Modal, Typography, Image, Breadcrumb, Button, Collapse } from "antd";
import avatarDefault from "@/assets/images/avatar-default.png";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";

import TableOfContent from "@/components/TableOfContent/TableOfContent";
import { convertToSlug } from "@/utils";
import { useState } from "react";

const PreviewModal = ({
  open,
  close,
  data,
}: {
  data: any;
  open: any;
  close: any;
}) => {
  const [fontSize, setFontSize] = useState(16);

  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      // Replace Accordion
      if ((domNode as Element | any).tagName === "details") {
        console.log("domNode", domNode);
        const sub = domNode as Element | any;
        const [isActive, setActive] = useState(false);
        console.log(
          "Title",
          sub.children[0],
          domToReact(sub.children[0].children)
        );
        const item = [
          {
            key: "1",
            label: (
              <div
                style={{ fontSize: "inherit" }}
                className={`header-accordion ${isActive ? "active" : ""}`}
              >
                {domToReact(sub.children[0].children)}
              </div>
            ),
            children: (
              <span style={{ fontSize: "inherit" }}>
                {domToReact(sub.children[1].children)}
              </span>
            ),
          },
        ];
        return (
          <Collapse
            bordered
            ghost
            onChange={() => setActive(!isActive)}
            defaultActiveKey={[]}
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
              isActive ? (
                <div
                  style={{
                    fontSize: "2rem",
                    verticalAlign: "middle",
                    color: "#235C52",
                    fontWeight: "bold",
                  }}
                >
                  -
                </div>
              ) : (
                <div
                  style={{
                    fontSize: "1.5rem",
                    verticalAlign: "middle",
                    color: "#235C52",
                    fontWeight: "bold",
                  }}
                >
                  +
                </div>
              )
            }
            items={item}
          />
        );
      }

      // Replace heading
      if ((domNode as Element).attribs && (domNode as Element).name === "h3") {
        const itemDom = domNode as Element | any;
        return (
          <h3
            id={convertToSlug(
              itemDom?.children[0]?.data ||
                itemDom.children[0]?.children[0]?.data ||
                ""
            )}
          >
            {domToReact(itemDom.children)}
          </h3>
        );
      }

      if ((domNode as Element).attribs && (domNode as Element).name === "h5") {
        return <TableOfContent currentPost={data} />;
      }

      if (
        (domNode as Element).name === "span" &&
        (domNode as Element).attribs
      ) {
        const isText = (domNode as Element).attribs.style.includes("font-size");
        const textNode = domNode as Element | any;
        if (isText) {
          return (
            <span style={{ fontSize: "inherit" }}>
              {domToReact(textNode.children)}
            </span>
          );
        }
      }
    },
  };

  if (!data.content) return null;

  return (
    <>
      <Modal footer={null} open={open} onCancel={close} width="80%">
        <div
          className="w-full h-full min-h-[500px] modalPreview"
          style={{ fontSize: "16px" }}
        >
          <div className="container mx-auto flex gap-5">
            <div className="w-[800px] h-full">
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
                      width={60}
                      height={60}
                      alt="ongbatoi.vn"
                      className="rounded-full max-h-[4rem] border p-2 border-[#235C52]"
                    />

                    <div className="flex flex-col">
                      <Typography className="text-[20px] text-[#235C52] font-bold fontTitle">
                        {data?.author?.displayName}
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
                    <div className="flex items-center ml-10">
                      <Button
                        shape="circle"
                        onClick={() => setFontSize(fontSize - 1)}
                      >
                        -
                      </Button>
                      <div className="mx-4">Font: {fontSize}</div>
                      <Button
                        shape="circle"
                        onClick={() => setFontSize(fontSize + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className="modalPreviewContent prose lg:prose-lg max-w-[100%]"
                  style={{ fontSize }}
                >
                  {/* <div dangerouslySetInnerHTML={{ __html: data.content }} /> */}
                  {data?.content && parse(data.content, options)}
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
