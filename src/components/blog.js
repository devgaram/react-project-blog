import React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

const Blog = ({
  posts
}) => {
  return (
    <>
      <CardList>
        { posts && posts.map((p, index) =>
          <Link to={`post/${p.id}`} key={index}>
            <CardItem hoverable>
              <CardTitle>{p.title}</CardTitle>
              <Icon className='text-grey is-0-8' type='calendar'/>
              <span className='text-grey left-space-sm'>{p.date && p.date.substr(0, 10)}</span>
              <p className='top-space-sm'>{p.body && p.body.replace(/(<([^>]+)>)|(\&lt;)|(\&gt;)/ig,'').substr(0, 150)}</p>
            </CardItem>
          </Link>
          )
        }
      </CardList>
    </>
  )
}

Blog.propTypes = {
  posts: PropTypes.instanceOf(List)
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
export default Blog;