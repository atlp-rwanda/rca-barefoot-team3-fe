/* eslint-disable no-unused-vars */
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
) => axios.post(`${apiUrl}/users`, {
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
    console.log('Logged out successfully!');
    window.location = '/login';
  } catch (error) {
    console.error(error);
  }
};

export const initiateResetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/initiate-reset-password`,
      {
        email,
      },
    );
    return true;
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
    return null;
  }
};

export const resetPassword = async (data, email) => {
  try {
    await axios.post(`${apiUrl}/users/reset-password`, {
      email,
      ...data,
    });
    return true;
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
    return null;
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
    return null;
  }
}

const getAllAccomodations = async () => {
  const response = await axios.get(`${apiUrl}/accommodations/`);

  return response.data;
};

const searchAccommodations = async (params) => {
  const response = await axios.get(`${apiUrl}/accommodations/search`, {
    params,
  });

  return response.data;
};

const getAccomodationDetails = async (id) => {
  const response = await axios.get(`${apiUrl}/accommodations/${id}?rooms=1`);
  return response.data;
};

const getAllBookings = async (token) => {
  const response = await axios.get(`${apiUrl}/booking/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getAccomodation = async (id) => {
  const response = await axios.get(`${apiUrl}/accommodations/${id}`);
  return response.data;
};
const deleteAccomodation = async (id) => {
  const token = Cookies.get('token');
  try {
    await axios.delete(`${apiUrl}/accommodations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Accomodation deleted successfully!');
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
  }
};
const updateAccomodation = async (id, data) => {
  const token = Cookies.get('token');
  try {
    await axios.put(`${apiUrl}/accommodations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Accomodation updated successfully!');
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
  }
};
const getAllRooms = async () => {
  const response = await axios.get(`${apiUrl}/rooms/`);
  return response.data;
};
export {
  login, getAllAccomodations, logout, register, verify, getAllBookings,
  searchAccommodations, getAccomodationDetails, getAccomodation,
  deleteAccomodation, updateAccomodation, getAllRooms,
};
