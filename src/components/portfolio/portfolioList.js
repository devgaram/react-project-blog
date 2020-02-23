import React from 'react';
import { PageHeader, List, Empty, Button, Divider, Icon, Tooltip } from 'antd';
import styled from 'styled-components';

const PortfolioListt = ({
  handleGoBack,  
  handleItemDragStart,
  handleItemDrag,
  handleItemDragEnd,
  handleItemDrop,
  handleallowDragOver,
  handleDragLeave,
  handleMovePage
}) => {
  
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  let data1=[];
  return (
    <>     
      <PageHeader
        onBack={handleGoBack}
        title="포트폴리오 관리"
        subTitle="편집과 미리보기 버튼을 이용하여 포트폴리오를 관리하세요."
        style={{padding: "16px 0" }}/>        
      <p className="space"></p>
      <div><Icon type="pushpin" theme="twoTone" twoToneColor="#BC61F4" rotate={315}/> 공개됨</div>
      <ListSection
        onDrop={handleItemDrop}
        onDragOver={handleallowDragOver}
        onDragLeave={handleDragLeave}>            
      <List         
          size="large"
          itemLayout="horizontal"
          dataSource={data1}
          locale={{ emptyText: <Empty description="여기에 드래그 하세요"/>}}
          renderItem={item => (
            <ListItem              
              actions={
                [
                  <Tooltip title="편집하기" placement="bottom"><a><Icon type="edit" /></a></Tooltip>, 
                  <Tooltip title="미리보기" placement="bottom"><a><Icon type="eye" /></a></Tooltip>,                  
                ]
              }>
              <List.Item.Meta
                title={`ㅇㅇㅇㅇ`}
                ></List.Item.Meta>
              <div className="opacity-lg">2020-02-14</div>
            </ListItem>
            )}/>
      </ListSection>
      <Divider />
      <div style={{display: "flex", flexDirection: "row-reverse"}}>
        <Button type="primary" onClick={() => handleMovePage("new")}><Icon type="file-add" /> New</Button>
      </div>
      <ListSection>
        <List
          size="large"
          itemLayout="horizontal"
          dataSource={data}
          locale={{ emptyText: <Empty description="포트폴리오가 없습니다."/>}}
          renderItem={item => (
            <ListItem
              id={item.title}
              key={item.title}        
              draggable="true"
              onDrag={e => handleItemDrag(e)}
              onDragStart={handleItemDragStart}
              onDragEnd={handleItemDragEnd}
              actions={
                [
                  <Tooltip title="편집하기" placement="bottom"><a><Icon type="edit" /></a></Tooltip>, 
                  <Tooltip title="미리보기" placement="bottom"><a><Icon type="eye" /></a></Tooltip>,
                  <Tooltip title="삭제하기" placement="bottom"><a><Icon type="delete" /></a></Tooltip>
                ]
              }>
              <List.Item.Meta
                title={item.title}
                ></List.Item.Meta>
              <div className="opacity-lg">2020-02-14</div>
            </ListItem>
            )}/>
      </ListSection>        
    </>
  );
}

const ListSection = styled.section`
  margin-top: 1.5rem;
`;

const ListItem = styled(List.Item)`
  cursor: move;
  background: #fff;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px;
  padding: 16px 12px !important;
  margin-bottom: 16px;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),
      0 2px 6px 2px rgba(60,64,67,0.149)
  }
`
export default PortfolioListt;