import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bio from 'containers/bioContainer';
import CategoryListContainer from './categoryListContainer';
import PostListContainer from './postListContainer';

const BlogContainer = () => {
  return (
    <>
      <Bio bioTitle="라미의 블로그"/>
      <CategoryListContainer />
      <Switch>
        <Route path={`/:category`}>
          <PostListContainer />
        </Route>
      </Switch>
    </>
  );
};
export default BlogContainer;