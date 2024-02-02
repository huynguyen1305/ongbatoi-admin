import { useRef, useState } from "react";
import type SunEditorCore from "suneditor/src/lib/core";
import SunEditor, { buttonList } from "suneditor-react";
import baseClient from "@/configs/baseClient";

interface SunEditorCompProps {
  handleEditorChange: (text: string) => void;
  value: string;
  height?: string;
}

export default function SunEditorComp({
  handleEditorChange,
  value = "",
  height = "400px",
}: SunEditorCompProps) {
  const [content, setContent] = useState(value);

  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const onImageUploadBefore = (
    file: File[],
    _info: any,
    uploadHandler: any
  ) => {
    const formData = new FormData();
    file.forEach((element) => {
      formData.append("file", element);
    });
    // not use async await because uploadHandler is a callback
    baseClient
      .post(`/upload/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) =>
        uploadHandler({
          result: [
            {
              url: res.data.data[0].url,
              name: res.data.data[0].name,
              size: Number(res.data.data[0].size),
            },
          ],
        })
      );

    return undefined;
  };

  return (
    <SunEditor
      getSunEditorInstance={getSunEditorInstance}
      onImageUploadBefore={onImageUploadBefore}
      setContents={content}
      defaultValue={value}
      autoFocus={false}
      onInput={(text) => {
        handleEditorChange((text.target as HTMLTextAreaElement).innerHTML);
        setContent((text.target as HTMLTextAreaElement).innerHTML);
      }}
      onChange={(text) => {
        handleEditorChange(text);
        setContent(text);
      }}
      setAllPlugins={true}
      setDefaultStyle={`min-height: ${height}; max-height: 50vh`}
      setOptions={{
        buttonList: buttonList.complex,
      }}
    />
  );
}
