import React from 'react';
import { Spin } from 'antd';
import PostList from 'components/blog/postList';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_POSTS_BY_CATEGORY = gql`
  query getPosts($category: String) {
    repository(name: "TIL", owner: "devgaram") {
      posts: object(expression: $category) {
        ... on Tree {
          entries {
            name
            oid
            content: object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

const PostListContainer = () => {
  const { category } = useParams();
  const { loading, data } = useQuery(GET_POSTS_BY_CATEGORY, {
    variables: { category: `master:${category}`}
  });
  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}><Spin size="large" tip="Loading..."/></div>
  );

  return (
    <>
      <PostList category={category} posts={data && data.repository.posts.entries} />
    </>
  );
};
export default PostListContainer;