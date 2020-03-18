import React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import marked from 'marked';

const PostList = ({ posts }) => {
  return (
    <>
      <CardList>
        { posts && posts.map((post, index) =>
          <Link to={`${post.name}`} key={index}>
            <CardItem hoverable>
              <CardTitle>{post.name}</CardTitle>
              {post.content.text && post.content.text }
            </CardItem>
          </Link>
          )
        }
      </CardList>
    </>
  )
}

const CardList = styled.div`
  margin-top: 3rem;
`;

const CardItem = styled(Card)`
  margin-bottom: 1.25rem !important;  
`;

const CardTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
`;
export default PostList;