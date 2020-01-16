import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LayoutComponent from 'components/layout'
import BlogContainer from 'containers/blogContainer';
import MemoContainer from 'containers/memoContainer';
import AboutContainer from 'containers/aboutContainer';
import PostContainer from 'containers/postContainer';

const App = ({ props }) => {
  return (
    <LayoutComponent>
      <Switch>
        <Route path="/about" component={AboutContainer} />
        <Route path="/memo" component={MemoContainer} />
        <Route path="/post/:id" component={PostContainer} />
        <Route path="/" component={BlogContainer} />
      </Switch>
    </LayoutComponent>
  );
}

export default App;

