import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000
});

const getCategories = () => {
  return instance
    .get('/repos/devgaram/TIL/contents')
    .then(response => {
      const data = response.data.filter(contents => contents.type === 'dir');
      const category = [];
      data.forEach(element => {
        category.push(element.path);
      });
      return category;
    })
    .catch(error => {
      console.log(error);
    })
}

const getPostByCategory = (category) => {
  return instance
    .get(`/repos/devgaram/TIL/contents/${category}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error);
    })
}

export default {
  getCategories,
  getPostByCategory
};