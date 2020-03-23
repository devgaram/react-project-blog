import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Post from "components/blog/post";
import Loading from "components/base/loading";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST } from "./queries";
const PostContainer = () => {
  const { category, post } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(GET_POST, {
    variables: { path: `master:${category}/${post}.md` }
  });

  let postData = data && data.repository.post;
  postData = postData ? postData.text : "";

  if (loading) return <Loading />;

  const handleEditBtnClickListener = () => {
    history.push(`/${category}/${post}/edit`);
  };

  return (
    <Post
      post={postData}
      handleEditBtnClickListener={handleEditBtnClickListener}
    />
  );
};

export default PostContainer;
