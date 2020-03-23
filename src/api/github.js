import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}` }
});

const updateFile = ({ sha, content, message, path }) => {
  console.log(sha, content, message, path);
  instance
    .put(`/repos/devgaram/TIL/contents/${path}`, {
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      sha
    })
    .then(response => {
      console.log(response);
      return;
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

export default {
  updateFile
};
