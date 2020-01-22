import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { requestPosts } from 'store/modules/blog'
import Post from 'components/post';
import hljs from 'highlight.js/lib/highlight';


const PostContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(state => {
    return state.blog.get('posts').filter(p => p.id === id)
  }, shallowEqual)

  useEffect(() => {
    dispatch(requestPosts())
  }, []);

  const createMarkUp = () => {
    if (post.get(0)) return {__html: `${post.get(0).body}`};
  }
  return (
    <Post post={post.get(0)} createMarkUp={createMarkUp}/>
  )
}

export default PostContainer;