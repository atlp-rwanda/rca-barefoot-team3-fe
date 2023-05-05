/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { GrFacebook } from 'react-icons/gr';
import { FcGoogle } from 'react-icons/fc';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';
import SocialButton from '../../components/SocialButton';
import { login, loginWithFacebook } from '../../utils/api';
import Button from '../../components/Button';
import { setToken, setAuthenticated } from '../../redux/authslice';
import 'react-toastify/dist/ReactToastify.css';

function LoginWithFacebook() {
  const dispatch = useDispatch();

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      const token = await loginWithFacebook(response.accessToken);
      if (token) {
        dispatch(setToken(token));
        dispatch(setAuthenticated(true));
      }
    }
  };

  return (
    <FacebookLogin
      appId="880261419941182"
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('This is not a valid email.')
      .required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const token = await login(values.email, values.password);
    if (token) {
      dispatch(setToken(token));
      dispatch(setAuthenticated(true));
    }
    setSubmitting(false);
  };

  return (
    <div className="  md:flex justify-center w-full bg-orange-light ">
      <div className="flex  p-4 md:w-8/12 justify-center md:p-24">
        <div className="w-8/12 md:w-6/12 bg-white p-16 ">
          <div>
            <p className=" py-4 font-bold text-xl md:text-3xl">Sign In</p>
            <Link to="/register">
              <p>
                Don&apos;t have an account?
                <span className="text-orange-dark font-semibold ml-1">
                  Sign Up
                </span>
              </p>
            </Link>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="py-4">
                    <p className="my-4 text-grey-dark ">Email Address</p>
                    <Field
                      className="border text-sm w-full p-3"
                      name="email"
                      component="input"
                      type="text"
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-2 text-red"
                    />
                  </div>
                  <div className="pb-4 ">
                    <p className="my-4 text-grey-dark ">Password</p>
                    <Field
                      className="border text-sm  w-full p-3"
                      name="password"
                      component="input"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-2 text-red"
                    />
                  </div>
                  <div className="flex justify-between text-sm ">
                    <div className="flex gap-2 text-sm text-gray-300">
                      <input type="checkbox" />
                      <p>Remember me?</p>
                    </div>

                    <p
                      onClick={() => {
                        navigate('/initiate-reset-password');
                      }}
                      className="cursor-pointer"
                    >
                      Forgot Password
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="my-2 w-full h-14 button-primary"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <SocialButton icon={<FcGoogle />} text="Sign in with Google" handleClick={() => console.log('Google login clicked!')} />
            <SocialButton icon={<GrFacebook />} text="Sign in with Facebook" handleClick={() => console.log('Facebook login clicked!')} />
            <LoginWithFacebook icon={<GrFacebook />} />
          </div>
        </div>
        <div className=" bg-black w-6/12">
          <img
            className=" w-full object-fill"
            src="/images/signup.jpg"
            alt="hotel"
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
