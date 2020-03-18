import React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import marked from 'marked';
const PostList = ({ category, posts }) => {
  return (
    <>
      <CardList>
        { posts && posts.map((post, index) =>
          <Link to={`${category}/${post.oid}`} key={index}>
            <CardItem 
              hoverable
              actions={[
                <div>더보기</div>,
              ]}>
              <div className="blog-content" dangerouslySetInnerHTML={ {__html: post.content.text && marked(post.content.text).replace(/<hr>((.|\n)*)<hr>/ig, '').substr(0, 700)} }></div>
            </CardItem>
          </Link>
          )
        }
      </CardList>
    </>
  )
}


// replace(/(<([^>]+)>)|(\&lt;)|(\&gt;)/ig,'').substr(0, 150)
const CardList = styled.div`
  margin-top: 3rem;
`;

const CardItem = styled(Card)`
  margin-bottom: 1.25rem !important;  
`;
export default PostList;