import React from "react";
import PostList from "components/blog/postList";
import Loading from "components/base/loading";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS_BY_CATEGORY } from "./queries";

const PostListContainer = () => {
  const { category = "Algorithm" } = useParams();
  const { loading, data } = useQuery(GET_POSTS_BY_CATEGORY, {
    variables: { category: `master:${category}` }
  });
  const posts = data && data.repository.posts.entries;

  if (loading) return <Loading />;

  return (
    <>
      <PostList category={category} posts={posts} />
    </>
  );
};

export default PostListContainer;
