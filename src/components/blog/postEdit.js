import React from "react";
import { Input, Button, PageHeader, Icon, Row, Col, Typography } from "antd";
import styled from "styled-components";
import ConvertHTML from "components/base/convertHTML";

const { TextArea } = Input;

const PostEdit = ({ handleChange, postContent, handleSaveClick }) => {
  return (
    <>
      <RowWidth100>
        <Col span={24}>
          <PageHeader title="🖋 마크다운 수정" style={{ padding: "16px 0" }} />
        </Col>
      </RowWidth100>
      <RowWidth100 style={{ top: "20vh" }}>
        <Col span={24} style={{ padding: "0 0 15px", textAlign: "right" }}>
          <Button onClick={handleSaveClick}>저장</Button>
        </Col>
      </RowWidth100>
      <RowWidth100 style={{ top: "25vh" }}>
        <ColHeight100 span={12}>
          <MarkedTextarea
            placeholder="마크다운 형식으로 입력하세요."
            className="markdown-textarea"
            allowClear={true}
            onChange={handleChange}
            value={postContent}
          />
        </ColHeight100>
        <ColHeight100 span={12}>
          <ConvertedContainer>
            <ConvertHTML html={postContent} className={`blog-content`} />
          </ConvertedContainer>
        </ColHeight100>
      </RowWidth100>
    </>
  );
};

const RowWidth100 = styled(Row)`
  position: absolute !important;
  width: 100%;
  left: 0;
  padding: 0 3vh 50px;
`;

const ColHeight100 = styled(Col)`
  height: 100vh;
`;

const MarkedTextarea = styled(TextArea)`
  height: 100%;
`;

const ConvertedContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 5px;
`;

export default PostEdit;
