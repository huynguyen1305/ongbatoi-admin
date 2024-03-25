import { useEffect, useRef } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $insertNodes } from "lexical";

import { $getRoot } from "lexical";

interface Props {
  initialHtml?: string;
  onHtmlChanged: (html: string) => void;
}

const HtmlPlugin = ({ initialHtml, onHtmlChanged }: Props) => {
  const [editor] = useLexicalComposerContext();

  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!initialHtml || isMountedRef.current) {
      return;
    }

    editor.update(() => {
      $getRoot()
        .getChildren()
        .forEach((n) => n.remove());
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      console.log("dom", dom);
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log("dom, nodes", dom, nodes);
      $insertNodes(nodes);
      // const paragraphNode = $createParagraphNode();
      // nodes.forEach((n) => paragraphNode.append(n));
      // $getRoot().append(paragraphNode);
    });
  }, []);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default HtmlPlugin;
