import React from "react";
import { Route, Switch } from "react-router-dom";
import LayoutContainer from "containers/layoutContainer";
import PostContainer from "containers/blog/postContainer";
import BlogContainer from "containers/blog/blogContainer";
import MemoContainer from "containers/memoContainer";
import AboutContainer from "containers/aboutContainer";

const App = () => {
  return (
    <LayoutContainer>
      <Switch>
        <Route path="/about" component={AboutContainer} />
        <Route path="/memo" component={MemoContainer} />
        <Route path="/:category/:post" component={PostContainer} />
        <Route path="/" component={BlogContainer} />
      </Switch>
    </LayoutContainer>
  );
};

export default App;
