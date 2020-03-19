import React from "react";
import { Input, Card } from "antd";
import styled from "styled-components";

const MemoList = ({}) => {
  return (
    <>
      <div className="masonry top-space-mid">
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
        <div className="masonry-item">
          <MemoCard
            className="masonry-content"
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 215 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </MemoCard>
        </div>
      </div>
    </>
  );
};

const MemoCard = styled(Card)`
  height: auto;
`;

export default MemoList;
