import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { resetPassword } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log("email ", searchParams.get("email"));
  const email = searchParams.get("email");
  const initialValues = {
    currentPassword: "",
    newPassword: "",
  };
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required!"),
    newPassword: Yup.string().required("New password is required!"),
  });
  const onSubmit = async (values) => {
    if (resetPassword(values, email)) {
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div className=" flex justify-center w-full h-screen bg-orange-light ">
      <h2 className="text-3xl font-bold mt-6 md:mt-12">Barefoot</h2>
      <div className="md:w-10/12 flex flex-col justify-center items-center ">
        <div className="w-6/12 bg-white py-4 md:py-16 flex flex-col items-center ">
          <div className="w-6/12 md:mr-32">
            <h1 className="text-3xl font-bold text-gray-900">
              Reset your Password
            </h1>
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
                    New Password
                  </p>
                  <Field
                    name="currentPassword"
                    component="input"
                    type="password"
                    placeholder="Enter your password"
                    className="border border  font-light w-full p-3"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="mt-2 text-red"
                  />
                </div>
                <div className="py-4">
                  <p className="my-4 text-grey-dark font-light ">
                    Confirm Password
                  </p>
                  <Field
                    name="newPassword"
                    component="input"
                    type="password"
                    placeholder="Confirm your password"
                    className="border border  font-light w-full p-3"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="mt-2 text-red"
                  />
                </div>
                <button
                  type="submit"
                  // disabled={submittingMode}
                  className="my-2 w-full h-14 button-primary"
                >
                  Submit
                </button>
              </Form>
            </Formik>
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
    </div>
  );
}
