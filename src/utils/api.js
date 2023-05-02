import axios from "axios";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:8000/api/v1";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    const { token } = response.data;
    Cookies.set("token", token);
    toast.success("You have been successfully authenticated!");
    return token;
  } catch (error) {
    toast.error(error.response.data.errors || "Something went wrong!");
    return null;
  }
};

export const initiateResetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/initiate-reset-password`,
      {
        email,
      }
    );
    console.log(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.errors || "Something went wrong!");
    return null;
  }
};

export const resetPassword = async (data, email) => {
  try {
    const response = await axios.post(`${apiUrl}/users/reset-password`, {
      email,
      ...data,
    });
    return true;
  } catch (error) {
    toast.error(error.response.data.errors || "Something went wrong!");
    return null;
  }
};
