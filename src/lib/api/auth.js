import axios from 'axios';

const login = (userid, password) => {
  const uri = 'http://localhost:4000/api/auth/login';
  return axios
    .post(uri, {userid, password})
    .then(response => {
      return {
        result: response.data,
        error: null
      }
    })
    .catch(error => {
      return {
        result: null,
        error
      }
    })
}

const postToken = ({uri, token}) => {
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
      }
    })
    .catch(error => {
      return {
        result: null,
        error
      }
    })
}

const loginCheck = token => {
  return postToken({
    uri: 'http://localhost:4000/api/auth/check',
    token: token
  });
}

const logout = token => {
  return postToken({
    uri: 'http://localhost:4000/api/auth/logout',
    token: token
  });
}


const Auth = {
  login,
  loginCheck,
  logout
}
export default Auth;