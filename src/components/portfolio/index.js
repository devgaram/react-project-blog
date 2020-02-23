import React from 'react';
import { Button, Icon } from 'antd';
import { } from 'react-router-dom';

const Portfolio = ({
  handleMovePage,
}) => {
  return (
    <> 
      <Button onClick={handleMovePage}>
      <Icon type="setting" theme="twoTone" twoToneColor="#BC61F4"/>포트폴리오 관리
      </Button>
    </>
  );
}

export default Portfolio;