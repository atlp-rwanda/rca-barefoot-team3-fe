import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';

const register = (
  first_name,
  last_name,
  gender,
  password,
  password_confirmation,
  username,
  email,
) => axios.post(API_URL, {
  first_name, last_name, gender, password, password_confirmation, username, email,
});
const verify = (code, email) => axios.post(`${API_URL}/verify/${email}`, {
  code,
});
const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const AuthService = {
  register,
  verify,
  getCurrentUser,
};

export default AuthService;
