import React from "react";
import marked from "marked";
import { Divider, Tag } from "antd";

const Post = ({ category, post }) => {
  return (
    <>
      <Tag color="purple"># {category}</Tag>
      <Divider />
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{
          __html: post && marked(post.text).replace(/<hr>((.|\n)*)<hr>/gi, "")
        }}
      />
    </>
  );
};

export default Post;
