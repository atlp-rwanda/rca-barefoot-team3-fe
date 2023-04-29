import { Formik } from "formik";
import React, { useEffect } from "react";

export default function ResetPassword() {
  return (
    <div className="  md:flex justify-center w-full h-screen bg-orange-light ">
      <div className="flex  p-4 md:w-8/12 md:p-24 flex flex-col justify-center items-center ">
        <div className="w-8/12 md:w-6/12 h-3/6 bg-white p-4 ">
          <div>
            <h1 className="text-3xl font-bold  text-gray-900">
              Reset Password
            </h1>
          </div>
          <Formik>
            <Form>
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Enter your email address"
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
