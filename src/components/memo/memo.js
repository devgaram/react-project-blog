import React from 'react';
import { Button, Icon, Tooltip, Tag, Input } from 'antd';
import styled from 'styled-components';

const Memo = ({
  inputVisible,
  tagArray,
  newTagValue,
  handleShowInput,
  handleNewTagInputChange,
  handleNewTagInputConfirm,
  handleTagClose,
  saveNewTagInputRef,
}) => {


  return (
    <>
      <div className="top-space-mid">
        <div className="memo-container">
          <div style={{ display: "flex", flexDirection: "row-reverse"}} hidden>
            <Icon style={{ cursor: "pointer", opacity: ".71", position: "absolute", fontSize: "1.3rem", padding: "12px 16px" }} type="pushpin" rotate={315}/>
          </div>
          <div className="memo-title title-label label label-large" hidden>제목</div>
          <div 
            className="memo-title title-edit edit" 
            placeholder="제목" 
            contentEditable="true"
            role="textbox" 
            aria-multiline="false" 
            tabIndex="1"
            hidden></div>
          <div className="memo-content content-label label label-large">메모 작성...</div>
          <div 
            className="memo-content content-edit edit"
            aria-label="메모 작성..."
            contentEditable="true" 
            role="textbox" 
            aria-multiline="true" 
            tabIndex="0"></div>
          <div className="memo-tags memo-option" hidden>
            {
              tagArray.map((tag, index) => {
                return <Tag 
                  key={tag} 
                  closable={true} 
                  onClose={() => handleTagClose(tag)}>
                  {tag}
                </Tag>
              })}
            {
              inputVisible 
              && 
              <NewInput
                ref={saveNewTagInputRef}
                type="text"
                size="small"
                value={newTagValue}
                onChange={handleNewTagInputChange}
                onBlur={handleNewTagInputConfirm}
                onPressEnter={handleNewTagInputConfirm} />
            }
            {
              !inputVisible
              &&
              <NewTag onClick={handleShowInput}>
                <Icon type="plus"/>새 태그
              </NewTag>
            }            
          </div>
          <div className="memo-tool-group" hidden>
            <div className="icon-list" role="toolbar">
              <Tooltip title="배경색 변경" placement="bottom"><IconTool className="memo-icons" aria-label="배경색 변경" role="button" type="bg-colors"/></Tooltip>
              <Tooltip title="라벨 추가" placement="bottom"><IconTool className="memo-icons" aria-label="라벨 추가" role="button" type="tags"/></Tooltip>
              <Tooltip title="체크박스 표시" placement="bottom"><IconTool className="memo-icons" aria-label="체크박스 표시" role="button" type="unordered-list"/></Tooltip>
            </div>
            <Button className="memo-btn-close" size="small" type="link" style={{color: "rgb(73, 72, 72)" }}>닫기</Button>
            <Button size="small" type="link">저장</Button>
            <div className="icon-detail">
              <div className="bg-colors-detail">
                <div data-color="#FFFFFF" style={{background: "#FFFFFF"}}></div>
                <div data-color="#F7B9D9" style={{background: "#F7B9D9"}}></div>
                <div data-color="#DDDDFF" style={{background: "#DDDDFF"}}></div>
                <div data-color="#D3F3ED" style={{background: "#D3F3ED"}}></div>
                <div data-color="#FFDDDD" style={{background: "#FFDDDD"}}></div>
                <div data-color="#FFDDA6" style={{background: "#FFDDA6"}}></div>
              </div>
            </div>              
          </div>
        </div>
      </div>
    </>
  )
}

const IconTool = styled(Icon)`
  font-size: 16px;
  width: 35px;
  cursor: pointer;
  opacity: .71;
  padding: 10px 0;
  margin-right: 1rem;

  &:hover {
    background: #80808045;
    border-radius: 18px;
    opacity: 1;
  }
`;

const NewTag = styled(Tag)`
  border-style: dashed !important;
`;

const NewInput = styled(Input)`
  width: 69px !important;
  font-size: 12px !important;
`;

export default Memo;