import React from "react";
import { Switch, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Bio from "containers/bioContainer";
import CategoryListContainer from "./categoryListContainer";
import PostListContainer from "./postListContainer";

const BlogContainer = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <Bio bioTitle="라미의 블로그" />
      <CategoryListContainer />
      <Switch>
        <Route exact path={path}>
          <PostListContainer />
        </Route>
        <Route path={`/:category`}>
          <PostListContainer />
        </Route>
      </Switch>
    </>
  );
};
export default BlogContainer;
