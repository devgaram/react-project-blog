import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutContainer from "containers/layoutContainer";
import PostContainer from "containers/blog/postContainer";
import PostEditContainer from "containers/blog/postEditContainer";
import BlogContainer from "containers/blog/blogContainer";

const App = () => {
  return (
    <LayoutContainer>
      <Switch>
        <Route path="/:category/:post/edit" component={PostEditContainer} />
        <Route path="/:category/:post" component={PostContainer} />
        <Route path="/" component={BlogContainer} />
      </Switch>
    </LayoutContainer>
  );
};

export default App;
