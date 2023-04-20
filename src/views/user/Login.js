import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { GrFacebook } from "react-icons/gr";
import Button from "../../components/Button";
import SocialButton from "../../components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const onLogin = (values) => {
    console.log(values);
  };

  return (
    <div className="  md:flex justify-center w-full bg-orange-light ">
      <div className="flex  p-4 md:w-8/12 justify-center md:p-24">
        <div className="w-8/12 md:w-6/12 bg-white p-16 ">
          <div>
            <p className=" py-4 font-bold text-xl md:text-3xl">Sign In</p>
            <p>
              Dont have an account?
              <span className="text-orange-dark font-semibold ml-1">
                Sign Up
              </span>
            </p>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onLogin}
            >
              <Form>
                <div className="py-4">
                  <p className="my-4 text-grey-dark ">Email Address</p>
                  <Field
                    className="border border text-sm w-full p-3"
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
                    className="border border text-sm  w-full p-3"
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
              </Form>
            </Formik>
            <Button text="Login" />
            <SocialButton icon={<FcGoogle />} text="Sign in with Google" />
            <SocialButton icon={<GrFacebook />} text="Sign in with Facebook" />
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
    </div>
  );
}
