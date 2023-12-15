import React, { useEffect } from "react";

import { convertToRaw, convertFromRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
const RTE = (props) => {
  // Convert Draft.js blocks to HTML
  const contentState = convertFromRaw({
    blocks: [
      {
        key: "2mu54",
        data: {},
        text: "demo",
        type: "unstyled",
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
    ],
    entityMap: {},
  });
  const html = convertToRaw(contentState);
  // Render HTML
  return <div dangerouslySetInnerHTML={{ __html: JSON.stringify(html) }} />;
};

export default RTE;
