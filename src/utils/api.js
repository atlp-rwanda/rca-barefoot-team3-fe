import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:8000/api/v1';


const register = (
  first_name,
  last_name,
  gender,
  password,
  password_confirmation,
  username,
  email,
) => axios.post(apiUrl+'/users', {
  first_name, last_name, gender, password, password_confirmation, username, email,
});


const verify = (code, email) => axios.post(`${apiUrl}/users/verify/${email}`, {
  code,
});


const register = (
  first_name,
  last_name,
  gender,
  password,
  password_confirmation,
  username,
  email,
) => axios.post(apiUrl+'/users', {
  first_name, last_name, gender, password, password_confirmation, username, email,
});


const verify = (code, email) => axios.post(`${apiUrl}/users/verify/${email}`, {
  code,
});

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    const { token } = response.data;
    Cookies.set('token', token);
    toast.success('You have been successfully authenticated!');
    return token;
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
    return null;
  }
};

const getAllAccomodations = async () => {
  const response = await axios.get(`${apiUrl}/accommodations/`);

  return response.data;
}


export { login, getAllAccomodations }