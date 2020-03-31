import React from "react";
import PostList from "components/blog/postList";
import Loading from "components/base/loading";
import { useParams } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { GET_POSTS_BY_CATEGORY } from "./queries";

// 나중에 빼기
const compare = (a, b) => {
  if (a.name < b.name) return 1;
  if (a.name > b.name) return -1;
  return 0;
};
const PostListContainer = () => {
  const { category = "Algorithm" } = useParams();
  const client = useApolloClient();
  const { loading, data } = useQuery(GET_POSTS_BY_CATEGORY, {
    variables: { category: `master:${category}` }
  });

  if (loading) return <Loading />;

  const posts =
    data &&
    data.repository.category.posts &&
    data.repository.category.posts.sort(compare);

  return (
    <>
      <PostList category={category} posts={posts} />
    </>
  );
};

export default PostListContainer;
