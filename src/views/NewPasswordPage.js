import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";

export default function NewPasswordPage() {
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
            <Formik>
              <Form>
                <div className="py-4">
                  <p className="my-4 text-grey-dark font-light ">
                    New Password
                  </p>
                  <Field
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Enter your password"
                    className="border border  font-light w-full p-3"
                  />
                </div>
                <div className="py-4">
                  <p className="my-4 text-grey-dark font-light ">
                    Confirm Password
                  </p>
                  <Field
                    name="confirmPassword"
                    component="input"
                    type="password"
                    placeholder="Confirm your password"
                    className="border border  font-light w-full p-3"
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
    </div>
  );
}
