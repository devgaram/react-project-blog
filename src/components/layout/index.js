import React from 'react';
import Header from './header';
import Footer from './footer';
import { Layout, BackTop } from 'antd';

const { Content } = Layout;

const LayoutComponent = ({ 
  children,
  menuKey,
  handleChange }) => {
  return (
    <>
      <Layout>
        <Header
          menuKey={menuKey}
          handleChange={handleChange}/>
        <Content
            style={{
              padding: `2.4375rem 1.0875rem 2.4375rem`,
              margin: `0 auto`,
              maxWidth: `44rem`,
              width: `100%`,
            }}
          >
            { children }
          </Content> 
          <BackTop />
        <Footer />      
      </Layout>
      
    </> 
  );
}

export default LayoutComponent;