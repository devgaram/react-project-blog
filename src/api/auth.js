import axios from "axios";

const instance = axios.create({
  baseURL: "ttp://express-project-blog/api"
});

const signIn = ({ userid, password }) => {
  return instance
    .post("/auth/signin", {
      userid,
      password
    })
    .then(response => response)
    .catch(error => {
      return error;
    });
};

const postToken = ({ uri, token }) => {
  return axios
    .post(uri, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      return {
        result: response.data,
        error: null
      };
    })
    .catch(error => {
      return {
        result: null,
        error
      };
    });
};

const loginCheck = token => {
  return postToken({
    uri: `http://192.168.99.100:4000/api/auth/check`,
    token: token
  });
};

const logout = token => {
  return postToken({
    uri: `http://192.168.99.100:4000/api/auth/logout`,
    token: token
  });
};

const Auth = {
  signIn,
  loginCheck,
  logout
};
export default Auth;
