import React from "react";
import { Divider, Tag, Typography } from "antd";
import ConvertHTML from "components/base/convertHTML";
import Utteranc from "components/base/utteranc";
import { getTitleRegExp, getDateRegExp, getCategoryRegExp } from "utils/regExp";

const Post = ({ post }) => {
  return (
    <>
      <Typography.Title level={3}>{getTitleRegExp(post)}</Typography.Title>
      <Typography.Text className="text-grey right-space-sm">
        {getDateRegExp(post)}
      </Typography.Text>
      <Tag color="purple"># {getCategoryRegExp(post)}</Tag>
      <Divider />
      <ConvertHTML html={post} className={`blog-content`} />
      <Utteranc />
    </>
  );
};

export default Post;
