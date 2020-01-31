import React from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Layout, Menu, Select } from 'antd';

const { Header } = Layout;
const { Option, OptGroup } = Select;

const HeaderComponent = () => {
  const location = useLocation();
  const history = useHistory();
  let menuKey = location.pathname.split('/')[1];
  if (!menuKey || (menuKey !== "memo" && menuKey !== "about")) menuKey = "blog"
  const handleChange = (value) => {
    if (value === 'blog') value = '';
    history.push(`/${value}`);
  }
  return (
    <>
      <Header
        className="header"
        style={{
          textAlign: 'right',
          padding: '0 1rem'
        }}>
        {/* <Link to="/">
          <div 
            className="logo"
            style={{
              color: '#fff',
            }}>devrami</div>
          </Link> */}
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[`${menuKey}`]}
          selectedKeys={[`${menuKey}`]}
          style={{ 
            lineHeight: '64px',
            float: 'right',
          }}
        >
          <Menu.Item key="blog">
            <Link to="/">Blog</Link>
          </Menu.Item>
          <Menu.Item key="memo">
            <Link to="/memo">Memo</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu> */}
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