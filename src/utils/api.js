/* eslint-disable no-unused-vars */
import axios from 'axios';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const apiUrl = 'https://barefoot-3-backend.onrender.com/api/v1';

const register = (
  first_name,
  last_name,
  gender,
  password,
  password_confirmation,
  username,
  email,
) => axios.post(`${apiUrl}/users`, {
  first_name,
  last_name,
  gender,
  password,
  password_confirmation,
  username,
  email,
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
    const { data } = response;
    Cookies.set('token', data.token);

    toast.success('You have been successfully authenticated!');
    return data;
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

export const getAllAccomodations = async () => {
  const response = await axios.get(`${apiUrl}/accommodations/`);

  return response.data;
};

export const searchAccommodations = async (params) => {
  const response = await axios.get(`${apiUrl}/accommodations/search`, {
    params,
  });

  return response.data;
};

export const getAccomodationDetails = async (id) => {
  const response = await axios.get(`${apiUrl}/accommodations/${id}?rooms=1`);
  return response.data;
};

export const getAllBookings = async (token) => {
  const response = await axios.get(`${apiUrl}/booking/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAccomodation = async (id) => {
  const response = await axios.get(`${apiUrl}/accommodations/${id}`);
  return response.data;
};

export const deleteAccomodation = async (id) => {
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

export const updateAccomodation = async (id, data) => {
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

export const addAccomodation = async (data) => {
  const token = Cookies.get('token');
  try {
    await axios.post(`${apiUrl}/accommodations/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Accomodation added successfully!');
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
  }
};

export const getAllRooms = async () => {
  const response = await axios.get(`${apiUrl}/rooms`);

  return response.data;
};

export const addBooking = async (id, dateToCome, dateToLeave, user, token) => {
  try {
    await axios.post(
      `${apiUrl}/booking/${id}`,
      {
        dateToCome,
        dateToLeave,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    toast.success('Room Booked successfully!');
  } catch (error) {
    toast.error(error.response.data.errors || 'Something went wrong!');
  }
};

export {
  login,
  logout,
  register,
  verify,
};
