/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getAccomodation, updateAccomodation } from '../utils/api';

export default function EditAccomodation() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  useEffect(() => {
    const fetchAccomodation = async () => {
      const data = await getAccomodation(id);
      setInitialValues(data);
    };
    fetchAccomodation();
  }, [id]);
  console.log('data:', initialValues);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await updateAccomodation(id, values);
      navigate('/accomodation');
    } catch (error) {
      console.log(error);
    }
  };
  if (!initialValues) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="/" className="text-xl font-bold flex items-center lg:ml-2.5">
                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                <span className="self-center whitespace-nowrap">Barefoot</span>
              </a>
            </div>
            <div className="flex items-center">
              <button id="toggleSidebarMobileSearch" type="button" className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg">
                <span className="sr-only">Search</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex overflow-hidden pt-8">
        <aside id="sidebar" className="fixed z-20 h-full top-0 left-0 pt-12 flex lg:flex flex-shrink-0 flex-col w-52" aria-label="Sidebar">
          <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 text-white bg-primary pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-primary">
                <div className="space-y-2 pt-2">
                  <a href="/" target="_blank" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2" rel="noreferrer">
                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3">Dashboard</span>
                  </a>
                </div>
                <div className="space-y-2 pt-2">
                  <a href="/" target="_blank" className="text-base font-normal rounded-lg transition duration-75 flex items-center p-2" rel="noreferrer">
                    <svg className="w-6 h-6  transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    <span className="ml-3">Accomodations</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div id="main-content" className="h-full w-full   bg-gray-50 relative ml-44">
          <main>
            <div className="px-20 pt-12 bg-[#FFEADF] overflow-x-hidden overflow-y-auto ">
              <div className="bg-white w-[103%] pb-[2%] rounded-[13px] flex flex-col">
                <div className="flex justify-center items-center space-x-4 flex-row mt-[4%] mb-[23px]">
                  <p className="h-[44px] border-b-[5px] border-[#E66B31] font-inter font-bold text-xl leading-8"> Update Accomodation</p>
                </div>

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className=" flex flex-col space-y-6 m-[7%]">
                      <div className=" flex flex-col space-y-4 ">
                        <h1 className="font-inter font-bold text-gray-900 text-base leading-6
                          tracking-tighter border-b-[1px] border-[#424242] w-[134px]"
                        >
                          Basic Information
                        </h1>
                        <div className="grid grid-cols-3 gap-4">
                          <div className=" flex flex-col">
                            <label
                              htmlFor="name"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px]"
                            >
                              Name
                            </label>
                            <Field
                              id="name"
                              name="name"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                              rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="name" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="type"
                              className="font-inter font-normal text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              Type

                            </label>
                            <Field
                              name="type"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="type" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="description"
                              className="font-inter font-normal text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              Description
                            </label>
                            <Field
                              name="description"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="description" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="email"
                              className="font-inter font-normal text-[#424242]
                                text-base leading-5 mb-[13px] "
                            >
                              Email
                            </label>
                            <Field
                              name="contacts.email"
                              type="email"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="email" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="phone"
                              className="font-inter font-normal text-[#424242]
                                text-base leading-5 mb-[13px] "
                            >
                              Phone

                            </label>
                            <Field
                              name="contacts.phone_number"
                              type="number"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="phone" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="website"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Website

                            </label>
                            <Field
                              name="contacts.website"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="website" />
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-col space-y-4 ">
                        <h1 className="font-inter font-bold text-gray-900 text-base leading-6
                          tracking-tighter border-b-[1px] border-[#424242] w-[134px]"
                        >
                          Location
                        </h1>
                        <div className="grid grid-cols-3 gap-4">
                          <div className=" flex flex-col">
                            <label
                              htmlFor="country"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px]"
                            >
                              Country
                            </label>
                            <Field
                              id="country"
                              name="location.country"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                              rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="country" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="province"
                              className="font-inter font-normal text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              Province

                            </label>
                            <Field
                              name="location.province"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="province" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="district"
                              className="font-inter font-normal text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              District
                            </label>
                            <Field
                              name="location.district"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="district" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="city"
                              className="font-inter font-normal text-[#424242]
                                text-base leading-5 mb-[13px] "
                            >
                              City
                            </label>
                            <Field
                              name="location.city"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="city" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="sector"
                              className="font-inter font-normal text-[#424242]
                                text-base leading-5 mb-[13px] "
                            >
                              Sector

                            </label>
                            <Field
                              name="location.sector"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="sector" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="cell"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Cell

                            </label>
                            <Field
                              name="location.cell"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="cell" />
                          </div>
                          <div className=" flex flex-col">
                            <label
                              htmlFor="village"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Village

                            </label>
                            <Field
                              name="location.village"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="village" />
                          </div>
                          <div className=" flex flex-col">
                            <label
                              htmlFor="postalcode"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Postal Code

                            </label>
                            <Field
                              name="location.postal_code"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="postalcode" />
                          </div>
                          <div className=" flex flex-col">
                            <label
                              htmlFor="latitude"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Latitude

                            </label>
                            <Field
                              name="location.latitude"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="latitude" />
                          </div>
                          <div className=" flex flex-col">
                            <label
                              htmlFor="longitude"
                              className="font-inter font-normal text-[#424242]
                              text-base leading-5 mb-[13px] "
                            >
                              Longitude

                            </label>
                            <Field
                              name="location.longitude"
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            />
                            <ErrorMessage name="longitude" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row  space-x-8 justify-end">
                        <button
                          type="submit"
                          className="bg-[#1976D2] h-[30px] cursor-pointer w-[80px] flex justify-center overflow-hidden items-center
                             rounded-[3px] text-white"
                          disabled={isSubmitting}
                        >
                          Update
                        </button>
                        <div className=" bg-[#FF0202] h-[30px] cursor-pointer w-[70px] flex justify-center overflow-hidden items-center
                        rounded-[3px]"
                        >
                          <span className="text-white">
                            <Link to="/accomodation"> Cancel</Link>
                          </span>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

  );
}
