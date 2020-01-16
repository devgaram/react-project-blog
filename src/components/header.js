import React from 'react';
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  let menuKey = location.pathname.split('/')[1];
  if (!menuKey || (menuKey !== "memo" && menuKey !== "about")) menuKey = "blog"

  return (
    <Header
      className="header"
      style={{
      }}>
      <Link to="/">
        <div 
          className="logo"
          style={{
            float: 'left',
            color: '#fff',
          }}>라미의 블로그</div>
        </Link>
      <Menu
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
      </Menu>
    </Header>
  );
}

export default HeaderComponent;