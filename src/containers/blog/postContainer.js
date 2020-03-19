import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "components/blog/post";
import Loading from "components/base/loading";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST } from "./queries";

const PostContainer = () => {
  const { category, post } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { oid: `${post}` }
  });

  if (loading) return <Loading />;

  let postData = data && data.repository.post;
  postData = postData ? postData.text : "";

  return <Post category={category} post={postData} />;
};

export default PostContainer;
