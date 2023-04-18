import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const AuthService = {
  register,

  getCurrentUser,
};

export default AuthService;
