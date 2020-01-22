import axios from 'axios';

const getBlogPosts = (blog) => {
  const uri = '/dist/blog.json';
  return axios
    .get(uri)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    })
}
const Blog = {
  getBlogPosts
}
export default Blog;