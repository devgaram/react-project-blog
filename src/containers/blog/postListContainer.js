import React from "react";
import { Spin } from "antd";
import PostList from "components/blog/postList";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS_BY_CATEGORY } from "./queries";

const PostListContainer = () => {
  const { category = "Algorithm" } = useParams();
  const { loading, data } = useQuery(GET_POSTS_BY_CATEGORY, {
    variables: { category: `master:${category}` }
  });
  const posts = data && data.repository.posts.entries;

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );

  return (
    <>
      <PostList category={category} posts={posts} />
    </>
  );
};

export default PostListContainer;
