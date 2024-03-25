import { useEffect, useRef, useState } from "react";
import { convertToSlug } from "@/utils";
// import { Collapse } from "antd";
// import { CaretRightOutlined } from "@ant-design/icons";

function TableOfContent({ currentPost }: any) {
  const [_nestedHeadings, setNestedHeadings] = useState([]);
  const tocWrapper = useRef<any>(null);

  useEffect(() => {
    const dom = new DOMParser().parseFromString(
      currentPost.content,
      "text/html"
    );

    const headingElements = Array.from(dom.querySelectorAll("h3"));
    const toc = document.createElement("ul");

    const getNestedHeadings = (headingElementsTmp: any[]) => {
      const nestedHeadingsTmp: any[] = [];

      headingElementsTmp.forEach((heading: any) => {
        const listItem = document.createElement("div");
        listItem.textContent = heading.textContent;

        const tag = heading.tagName.toLowerCase(); // Convert to lowercase for comparison

        if (tag === "h3") {
          listItem.classList.add("toc-title"); // Add a class for styling
        } else {
          listItem.classList.add("toc-subtitle"); // Add a class for styling
        }

        // Optionally add anchor links with ID references:
        const anchor = document.createElement("a");
        anchor.href = `#${convertToSlug(heading.textContent)}`;
        anchor.appendChild(listItem);

        toc.appendChild(anchor);
        tocWrapper.current = toc.innerHTML;
      });

      return nestedHeadingsTmp;
    };

    const newNestedHeadings: any = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, [currentPost]);

  return (
    <div className="toc-wrapper">
      <div
        style={{ marginLeft: "1rem" }}
        dangerouslySetInnerHTML={{ __html: tocWrapper.current }}
      ></div>
    </div>
  );
}

export default TableOfContent;
