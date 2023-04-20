import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = 'http://localhost:8000/api/v1';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    const { token } = response.data;
    Cookies.set('token', token);
    return token;
  } catch (error) {
    console.error(error);
  }
};
