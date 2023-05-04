import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:8000/api/v1';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    const { token } = response.data;
    Cookies.set('token', token);
    console.log(response);
    toast.success('You have been successfully authenticated!');
    return token;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.errors || 'Something went wrong!');
    return null;
  }
};

const logout = async () => {
  try {
    await axios.post(`${apiUrl}/users/logout`, null, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    });
    Cookies.remove('token');
    window.location='/login';
  } catch (error) {
    console.error(error);
  }
};


export async function loginWithFacebook(accessToken) {
  try {
    const response = await fetch('/api/auth/facebook', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
    const error = await response.text();
    throw new Error(error);
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getAllAccomodations = async () => {
  const response = await axios.get(`${apiUrl}/accommodations/`);

  return response.data;
};

export { login, logout, getAllAccomodations };
