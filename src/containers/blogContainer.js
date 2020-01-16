import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual} from 'react-redux';
import Bio from 'containers/bioContainer';
import Blog from 'components/blog';
import { requestPosts } from 'store/modules/blog'
const BlogContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => {
    return state.blog.get('posts')
  }, shallowEqual);

  useEffect(() => {
    dispatch(requestPosts())
  }, []);

  return (
    <>
      <Bio bioTitle="라미의 블로그"/>
      <Blog posts={posts} />
    </>
  );
};

export default BlogContainer;