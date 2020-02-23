import React from 'react';
import { Input, Button, PageHeader, Icon } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

const PortfolioEdit = ({
  handleGoBack,
  handleKeyUp
}) => {
  return (
    <>
      <PageHeader
        onBack={handleGoBack}
        title="포트폴리오 편집기"
        style={{padding: "16px 0" }}/>
      <div class="flex-container-row-reverse" style={{padding: "0 0 15px"}}><Button type="primary"><Icon type="save" /></Button></div>      
      <TitleContainer>
        <h4>마크다운</h4>
        <h4>미리보기</h4>
      </TitleContainer>
      <MarkedContainer>
        <MarkedTextarea
          placeholder="마크다운 형식으로 입력하세요."
          className="markdown-textarea" 
          allowClear={true}
          onKeyUp={handleKeyUp}/>
        <Icon type="arrow-right" style={{alignSelf: "center"}}/>
        <MarkedIframe className="convert-preview"src="/preview.html"></MarkedIframe>
      </MarkedContainer>
    </>
  );
}

const MarkedContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(80vh - 68px);
  box-sizing: border-box;
`;
const MarkedIframe = styled.iframe`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 4px 11px;
  padding-right: 22px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin-bottom: 5px;
  h4 {
    width: 50%;
    text-align: center;
  }
`  
const MarkedTextarea = styled(TextArea)`
  height: 100%;
`;
export default PortfolioEdit;