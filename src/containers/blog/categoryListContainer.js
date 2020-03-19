import React from "react";
import { message, Button } from "antd";
import CategoryList from "components/blog/categoryList";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST_CATEGORIES } from "./queries";

const PostListContainer = () => {
  const { error, data } = useQuery(GET_POST_CATEGORIES);
  const categories = data && data.repository.categories.entries;

  if (error) return message.error("데이터를 불러오는 데 실패했습니다.");

  return (
    <>
      <CategoryList categories={categories} />
    </>
  );
};
export default PostListContainer;
