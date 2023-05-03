import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { initiateResetPassword} from '../utils/api';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

export default function InitiateResetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('This is not a valid email.')
    .required('Email is required!'),
  });
  const onSubmit = async (values) => {
    if(initiateResetPassword(values)){
      toast.success('Check your email for the reset password link');
      setTimeout(() => {navigate('/check-email')}, 2000);
    }else{
      toast.error('Something went wrong');
    }
  }
  return (
    <div className=" flex justify-center w-full h-screen bg-orange-light ">
      <h2 className="text-3xl font-bold mt-6 md:mt-12">Barefoot</h2>
      <div className="md:w-10/12 flex flex-col justify-center items-center ">
        <div className="w-6/12 bg-white py-4 md:py-16 flex flex-col items-center ">
          <div className="w-6/12 md:mr-32">
            <h1 className="text-3xl font-bold text-gray-900">
              Reset your Password
            </h1>
            <p className="py-2 text-md text-grey-dark font-light">
              Enter your email to reset password and regain access to your
              account
            </p>
          </div>
          <div className=" w-2/3 ">
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
              <Form>
                <div className="py-4">
                  <p className="my-4 text-grey-dark font-light ">
                    Email address
                  </p>
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="Enter your email address"
                    className="border border  font-light w-full p-3"
                  />
                   <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-2 text-red"
                    />
                </div>
                <button
                  type="submit"
                  className="my-2 w-full h-14 button-primary"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
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
