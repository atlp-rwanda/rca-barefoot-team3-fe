import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/authslice';

export default function Register() {
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  const initialValues = {
    first_name: '',
    last_name: '',
    gender: '',
    password: '',
    password_confirmation: '',
    username: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val) => val && val.toString().length >= 3 && val.toString().length <= 20,
      )
      .required('Username is required!'),
    last_name: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val) => val && val.toString().length >= 3 && val.toString().length <= 20,
      )
      .required('This field is required!'),
    username: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val) => val && val.toString().length >= 3 && val.toString().length <= 20,
      )
      .required('Username is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('Email is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val) => val && val.toString().length >= 6 && val.toString().length <= 40,
      ).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'A password must contain at least one capital letter, one small letter, one digit, and one special character',
      )
      .required('Password is required!'),

    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    gender: Yup.string().required('Gender is required'),

  });

  const handleRegister = async (formValue) => {
    const {
      first_name, last_name, gender, password, password_confirmation, username, email,
    } = formValue;
    console.log(formValue);

    await dispatch(register({
      first_name, last_name, gender, password, password_confirmation, username, email,
    }))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!', {
          position: 'top-right', // Set position to top-right
          autoClose: 3000, // Auto-close the toast after 3 seconds
          hideProgressBar: false, // Show progress bar
          closeOnClick: true, // Close toast on click
          pauseOnHover: true, // Pause toast on hover
          draggable: true, // Make toast draggable
          onClose: () => {
            // Navigate to /login after toast is closed
            navigate('/verify');
          },
        }); // Display success toast
      })
      .catch(() => {
        toast.error(message, {
          position: 'top-right', // Set position to top-right
          autoClose: 3000, // Auto-close the toast after 3 seconds
          hideProgressBar: false, // Show progress bar
          closeOnClick: true, // Close toast on click
          pauseOnHover: true, // Pause toast on hover
          draggable: true, // Make toast draggable
          className: 'toast-error', // Add custom class for error toast
        });
      });
  };

  return (
    <div className="  md:flex justify-center w-full bg-orange-light ">

      <div className="flex  p-4 md:w-8/12 justify-center md:p-24 ">

        <div className="w-8/12 md:w-6/12  bg-white p-4 ">
          <p className=" py-4  font-bold text-xl md:text-3xl">Sign Up</p>
          <Link to="/login">

            <p className="">
              Already registered?
              <span className="text-orange-dark font-bold">Sign In</span>
            </p>
          </Link>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ errors, touched }) => (
              <Form>

                <div>
                  <div>
                    <p className="my-4 text-grey-dark ">Firstname</p>
                    <Field
                      name="first_name"
                      type="text"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${
                          errors.first_name && touched.first_name
                            ? ' is-invalid'
                            : ''}`
                      }
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <div>
                    <p className="my-4 text-grey-dark ">Lastname</p>
                    <Field
                      name="last_name"
                      type="text"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${
                          errors.last_name && touched.last_name
                            ? ' is-invalid'
                            : ''}`
                      }
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <div>
                    <p className="my-4 text-grey-dark ">Email</p>
                    <Field
                      name="email"
                      type="email"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${

                          errors.email && touched.email ? ' is-invalid' : ''}`
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <div>
                    <p className="my-4 text-grey-dark ">username</p>
                    <Field
                      name="username"
                      type="text"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${
                          errors.username && touched.username
                            ? ' is-invalid'
                            : ''}`
                      }
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red"
                    />
                  </div>

                  <p className="my-4 text-grey-dark ">Gender</p>
                  <div className="flex space-x-8">
                    <Field
                      name="gender"
                      type="radio"
                      value="FEMALE"
                      className={
                        `w-4 h-4  ${

                          errors.gender && touched.gender ? ' is-invalid' : ''}`
                      }
                    />

                    <p className=" text-gray-400">female</p>
                    <Field
                      name="gender"
                      type="radio"
                      value="MALE"
                      className={
                        `w-4 h-4 p-2 rounded  border border-grey focus:outline-none${

                          errors.gender && touched.gender ? ' is-invalid' : ''}`
                      }
                    />

                    <p className="text-gray-400">male</p>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <div>
                    <p className="my-4 text-grey-dark ">Password</p>
                    <Field
                      name="password"
                      type="password"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${
                          errors.password && touched.password
                            ? ' is-invalid'
                            : ''}`
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <div>
                    <p className="my-4 text-grey-dark ">Confirm Password</p>
                    <Field
                      name="password_confirmation"
                      type="password"
                      className={
                        `w-full h-10 p-2 rounded  border border-grey focus:outline-none${
                          errors.confirmPassword && touched.confirmPassword
                            ? ' is-invalid'
                            : ''}`
                      }
                    />
                    <ErrorMessage
                      name="password_confirmation"
                      component="div"
                      className="text-red"
                    />
                  </div>
                  <button type="submit" className="   my-2 w-full button-primary">Sign Up</button>
                </div>
              </Form>
            )}
          </Formik>

        </div>
        <div className=" bg-black w-6/12">
          <img className=" w-full object-fill" src="/images/signup.jpg" alt="hotel" />
        </div>

      </div>
      <ToastContainer />
    </div>
  );
}
