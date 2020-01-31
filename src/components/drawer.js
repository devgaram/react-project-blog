import React from 'react';
import { Drawer } from 'antd';

const DrawerComponent = ({}) => {
  return (
    <>
      <Drawer
          title="Basic Drawer"
          placement="right"
          visible={true}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
    </>
  )
}

export default DrawerComponent;