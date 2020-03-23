import React from "react";
import Layout from "components/layout";
import { useLocation, useHistory } from "react-router-dom";

const LayoutContainer = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  // 현재 위치에 해당되는 메뉴 얻기
  let menuKey = location.pathname.split("/")[1];
  menuKey =
    !menuKey || (menuKey !== "memo" && menuKey !== "about") ? "blog" : menuKey;

  // 헤더 메뉴 클릭 시 페이지 이동
  const handleChange = value => {
    value = value === "blog" ? "" : value;
    // history.push(`/${value}`);
  };

  return (
    <>
      <Layout menuKey={menuKey} handleChange={handleChange}>
        {children}
      </Layout>
    </>
  );
};

export default LayoutContainer;
