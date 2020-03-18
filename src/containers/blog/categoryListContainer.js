import React from 'react';
import { message, Button } from 'antd';
import CategoryList from 'components/blog/categoryList';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_POST_CATEGORIES = gql`
  {
    repository(name: "TIL", owner: "devgaram") {
      categories: object(expression: "master:") {
       ... on Tree {
        entries {
           name
         }
       }
     }
   }
  }
`;

const PostListContainer = () => {
  const { error, data } = useQuery(GET_POST_CATEGORIES);
  
  if (error) return message.error('데이터를 불러오는 데 실패했습니다.');
  
  return (
    <>
      <CategoryList categories={data && data.repository.categories.entries} />
    </>
  );
};
export default PostListContainer;