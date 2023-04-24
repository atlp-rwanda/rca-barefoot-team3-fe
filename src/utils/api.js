import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:8000/api/v1';

export const login = async (email, password) => {
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

export async function loginWithFacebook(accessToken) {
  try {
    const response = await fetch('/api/auth/facebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

