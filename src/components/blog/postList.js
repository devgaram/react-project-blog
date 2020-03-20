import React from "react";
import { Card, Typography } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ConvertHTML from "components/base/convertHTML";
import { getTitleRegExp, getDateRegExp } from "utils/regExp";

const PostList = ({ category, posts }) => {
  return (
    <>
      <CardList>
        {posts &&
          posts.map((post, index) => (
            <Link to={`${category}/${post.oid}`} key={index}>
              <CardItem
                title={
                  <>
                    <Typography.Text type="secondary">
                      {getTitleRegExp(post.content.text)}
                    </Typography.Text>
                    <Typography.Text code className="text-grey left-space-sm">
                      {getDateRegExp(post.content.text)}
                    </Typography.Text>
                  </>
                }
                hoverable
                actions={[<div>더보기</div>]}
              >
                <ConvertHTML
                  html={post.content.text}
                  className={`blog-content`}
                  maxLength={400}
                />
              </CardItem>
            </Link>
          ))}
      </CardList>
    </>
  );
};

// replace(/(<([^>]+)>)|(\&lt;)|(\&gt;)/ig,'').substr(0, 150)
const CardList = styled.div`
  margin-top: 3rem;
`;

const CardItem = styled(Card)`
  margin-bottom: 1.25rem !important;
`;
export default PostList;
