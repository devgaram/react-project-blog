import React from 'react';
import { List, Card, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Text } = Typography;
const CategoryList = ({ categories }) => {
  return (
    <>
      <div style={{ marginTop: '3rem' }}>
        <Text strong style={{ fontSize: '18px' }}>
          <span role='img' aria-label='category'>🎉</span> 카테고리
        </Text>
      </div>
      <CategoryContainer>
        <CategoryListItem>
          { categories && categories.map(category => {
              return (
                <Link to={`${category.name}`} key={category.name}>
                  <CategoryItem>{ category.name }</CategoryItem>
                </Link>
              ) 
              
            })}
        </CategoryListItem>
      </CategoryContainer>
    </>
  )
}

const CategoryContainer = styled.div`
`;
const CategoryListItem = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;  
  display: flex;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const CategoryItem = styled.li`
  padding: 0.5rem 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 1rem;
  margin-right: 0.7rem;
  margin-bottom: 0.7rem;
`;
export default CategoryList;