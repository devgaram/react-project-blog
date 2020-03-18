import React from 'react';
import { useParams } from 'react-router-dom';
import Post from 'components/blog/post';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_POST = gql`
  query getPost($oid: GitObjectID!) {
    repository(name: "TIL", owner: "devgaram") {
      post: object(oid: $oid) {
        ... on Blob{
          text
        }
      }
    }
  }
`;
const PostContainer = () => {
  const { category, post } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { oid: `${post}`}
  });
  console.log(post, data);
  return (
    <Post category={category} post={data && data.repository.post}/>
  )
}

export default PostContainer;