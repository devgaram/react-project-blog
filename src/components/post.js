import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';


const Post = ({
  post,
  createMarkUp
}) => {

  return(
    <>
      <div className="blog-content" dangerouslySetInnerHTML={createMarkUp()} />
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  createMarkUp: PropTypes.func
}
export default Post;