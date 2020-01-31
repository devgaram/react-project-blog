import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual} from 'react-redux';
import Bio from 'containers/bioContainer';
import Blog from 'components/blog';
import Category from 'components/category';
import { requestPosts, nextPage } from 'store/modules/blog';

const BlogContainer = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(state => state.blog.get('pagination'));
  const posts = useSelector(state => {
    return state.blog.get('posts').sort((a, b) => {
      if (a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      else return 0;
    }).slice(0, pagination);
  }, shallowEqual);
  const postCount = useSelector(state => state.blog.get('postCount'));
  
  const onScroll = useCallback(
    () => {
    if (window.scrollY/(document.body.scrollHeight - document.body.clientHeight) * 100 > 99)
      dispatch(nextPage());
    },[dispatch]);

  useEffect(() => {
    dispatch(requestPosts());    
    window.addEventListener('scroll', onScroll);
  }, [dispatch, onScroll]);  

  useEffect(() => {
    if (postCount > 0 && pagination >= postCount) window.removeEventListener('scroll', onScroll);
  }, [pagination, postCount, onScroll ]);

  
  
  return (
    <>
      <Bio bioTitle="라미의 블로그"/>
      {/* <Category /> */}
      <Blog posts={posts} />
    </>
  );
};
export default BlogContainer;