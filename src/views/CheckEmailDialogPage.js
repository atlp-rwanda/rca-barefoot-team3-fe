import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";

export default function CheckEmailDialogPage() {
  return (
    <div className=" flex justify-center w-full h-screen bg-orange-light ">
      <h2 className="text-3xl font-bold mt-6 md:mt-12">Barefoot</h2>
      <div className="md:w-10/12  flex flex-col justify-center items-center ">
        <div className="w-6/12 bg-white h-48 py-4 md:py-16 flex flex-col items-center ">
          <div className="  h-5/6 w-96">
            <h2 className="text-2xl font-normal">
              Email Sent! Check your inbox for password reset instructions
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
