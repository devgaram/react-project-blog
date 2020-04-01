import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PostEdit from "components/blog/postEdit";
import Loading from "components/base/loading";
import { useQuery } from "@apollo/react-hooks";
import { GET_POST } from "./queries";
import {
  initPost,
  changePostContent,
  requestUpdateFile
} from "store/actions/blog";
import { getPostContent } from "store/reducers/blog";

const PostEditContainer = () => {
  const dispatch = useDispatch();
  const { category, post } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { path: `master:${category}/${post}.md` }
  });
  const content = useSelector(state => getPostContent(state));

  useEffect(() => {
    dispatch(
      initPost({
        category: category,
        sha: data && data.repository.post.oid,
        name: `${post}.md`,
        content: data && data.repository.post ? data.repository.post.text : ""
      })
    );
  }, [dispatch, data]);

  if (loading) return <Loading />;

  const handleChange = e =>
    dispatch(changePostContent({ postContent: e.target.value }));

  const handleSaveClick = e => {
    dispatch(requestUpdateFile());
  };

  return (
    <PostEdit
      handleChange={handleChange}
      postContent={content}
      handleSaveClick={handleSaveClick}
    />
  );
};

export default PostEditContainer;
