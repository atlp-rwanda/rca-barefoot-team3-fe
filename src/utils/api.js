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
    localStorage.setItem("user",response.data)
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
const getAllBookings = async (token) => {
  const response = await axios.get(`${apiUrl}/booking/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getAllRooms = async () => {
  const response = await axios.get(`${apiUrl}/rooms`);
  console.log("here",response.data)

  return response.data;
};

const addBooking = async (id,data) => {
 await axios
    .post(`${apiUrl}/booking/${id}`, {
      dateToCome,
      dateToLeave,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export {
  login, getAllAccomodations, register, verify, getAllBookings,getAllRooms,addBooking
};
