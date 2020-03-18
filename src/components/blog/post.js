import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Typography, Divider, Tag, Icon } from 'antd';
const { Title, Paragraph, Text } = Typography;

const Post = ({
  post,
  createMarkUp
}) => {

  // useEffect(() => {
  //   const utterances = document.createElement('script');
  //   const attributes = {
  //     src: 'https://utteranc.es/client.js',
  //     repo: 'devgaram/blog-comments',
  //     'issue-term': 'pathname',
  //     theme: 'github-light',
  //     crossorigin: 'anonymous',
  //     async: true
  //   }

  //   Object.entries(attributes).forEach(([key, value]) => {
  //     utterances.setAttribute(key, value);
  //   });    

  //   document.body.appendChild(utterances);

  //   //클린업
  //   return () => {
  //     document.body.removeChild(utterances);
  //   }

  // }, []);
  const title = post && post.title;
  const date = post && post.date.substr(0, 10);
  const tags = post && post.tags;
  const categories = post && post.categories;
  const category = post && post.category;
  return(
    <>      
      <Title level={3}>{title}</Title> 
      <Icon className="text-grey is-0-8" type="calendar"/>&nbsp;
      <Text className="text-grey is-0-8" style={{ 'marginRight': '0.8rem' }}>{date}</Text>    
      
      {categories && categories.map(c => {
        return <Tag key={c}>{c}</Tag>
      })}
      {!categories && <Tag>{category}</Tag>}
      
      {tags && tags instanceof Array && tags.map(t => {
        return <Tag key={t} color="purple"># {t}</Tag>
      })}
      { typeof tags == 'string' && <Tag color="purple"># {tags}</Tag>}
     <Divider/>
      <div className="blog-content" dangerouslySetInnerHTML={createMarkUp()} />
      
    </>
  )
}

Post.propTypes = {
  post: PropTypes.object,
  createMarkUp: PropTypes.func
}
export default Post;