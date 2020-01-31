import React from 'react';
import styled from 'styled-components';
import HeaderComponent from 'components/header';
import { Layout, BackTop } from 'antd';

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
  return (
    <>
      <Layout>
        <HeaderComponent />
        <Content
            style={{
              padding: `2.4375rem 1.0875rem 2.4375rem`,
              margin: `0 auto`,
              maxWidth: `44rem`,
              width: `100%`,
            }}
          >
            {children}
          </Content> 
          <BackTop />       
      </Layout>
      
    </> 
  );
}

export default LayoutComponent;