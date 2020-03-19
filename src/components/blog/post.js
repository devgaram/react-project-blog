import React from "react";
import { Divider, Tag } from "antd";
import ConvertHTML from "components/base/convertHTML";

const Post = ({ category, post }) => {
  return (
    <>
      <Tag color="purple"># {category}</Tag>
      <Divider />
      <ConvertHTML html={post} className={`blog-content`} />
    </>
  );
};

export default Post;
