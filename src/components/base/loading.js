import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" tip="Loading..." />
      </div>
    </>
  );
};

export default Loading;
