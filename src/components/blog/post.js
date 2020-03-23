import React from "react";
import { Divider, Tag, Typography, Button, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ConvertHTML from "components/base/convertHTML";
import Utteranc from "components/base/utteranc";
import { getTitleRegExp, getDateRegExp, getCategoryRegExp } from "utils/regExp";
const Post = ({ post, handleEditBtnClickListener }) => {
  return (
    <>
      <Typography.Title level={3}>{getTitleRegExp(post)}</Typography.Title>
      <Row>
        <Col span={8}>
          <Typography.Text className="text-grey right-space-sm">
            {getDateRegExp(post)}
          </Typography.Text>
          <Tag color="purple"># {getCategoryRegExp(post)}</Tag>
        </Col>
        <Col span={8} offset={8} style={{ textAlign: "right" }}>
          <Button size="small" onClick={handleEditBtnClickListener}>
            <EditOutlined />
          </Button>
        </Col>
      </Row>

      <Divider />
      <ConvertHTML html={post} className={`blog-content`} />
      <Utteranc />
    </>
  );
};

export default Post;
