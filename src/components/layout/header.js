import React from 'react';
import styled from 'styled-components';
import { Layout, Select } from 'antd';

const { Header } = Layout;
const { Option } = Select;

const HeaderComponent = ({ menuKey, handleChange }) => {
  return (
    <>
      <Header
        className="header"
        style={{
          textAlign: 'right',
          padding: '0 1rem'
        }}>
        <MenuSelect
          defaultValue={menuKey}
          value={menuKey}
          onChange={handleChange}>
          <Option value="blog">BLOG</Option>
          <Option value="memo">MEMO</Option>
          <Option value="about">ABOUT</Option>
        </MenuSelect>
      </Header>
    </>
  );
}

const MenuSelect = styled(Select)`  
  .ant-select-selection {
    background: #BC61F4;
    color: #fff;
    width: 8rem;
    border: 1px solid #fff;
    font-size: 0.9rem;
  }
  .ant-select-arrow {
    color: #fff;
  }  
`;

export default HeaderComponent;