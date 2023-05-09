/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { addAccomodation } from '../utils/api';

export default function AddAccomodation() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    contacts: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      phone_number: Yup.string().required('Phone number is required'),
      website: Yup.string().url('Invalid URL').required('Website is required'),
    }),
    meta: Yup.object().shape({
      amenities: Yup.string(),
      policies: Yup.string(),
      properties: Yup.string(),
    }),
    location: Yup.object().shape({
      country: Yup.string().required('Country is required'),
      province: Yup.string().required('Province is required'),
      district: Yup.string().required('District is required'),
      city: Yup.string().required('City is required'),
      sector: Yup.string().required('Sector is required'),
      cell: Yup.string().required('Cell is required'),
      village: Yup.string().required('Village is required'),
      latitude: Yup.string().required('Latitude is required'),
      longitude: Yup.string().required('Longitude is required'),
      postal_code: Yup.string().required('Postal code is required'),
    }),
  });
  const initialValues = {
    name: '',
    description: '',
    type: '',
    meta: {
      amenities: [''],
      policies: [''],
      properties: [''],
    },
    contacts: {
      email: '',
      phone_number: '',
      website: '',
    },
    location: {
      country: '',
      province: '',
      district: '',
      city: '',
      sector: '',
      cell: '',
      village: '',
      latitude: '',
      longitude: '',
      postal_code: '',
    },
  };
  const typeOptions = [
    { value: '', label: 'Select Value' },
    { value: 'HOTEL', label: 'Hotel' },
    { value: 'LODGE', label: 'Lodge' },
    { value: 'MOTEL', label: 'Motel' },
  ];

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      values.meta.amenities = values.meta.amenities.split(',');
      values.meta.policies = values.meta.policies.split(',');
      values.meta.properties = values.meta.properties.split(',');
      await addAccomodation(values);
      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex overflow-hidden pt-8 bg-[#E66B31]">
        <aside id="sidebar" className="fixed z-20 h-full top-0 left-0 pt-12 flex lg:flex flex-shrink-0 flex-col w-52" aria-label="Sidebar" />
        <div id="main-content" className="h-full w-full   bg-gray-50 relative ml-44">
          <main>
            <div className="px-20 pt-12 bg-[#FFEADF] overflow-x-hidden overflow-y-auto ">
              <div className="bg-white w-[103%] pb-[2%] rounded-[13px] flex flex-col">
                <div className="flex justify-center items-center space-x-4 flex-row mt-[4%] mb-[23px]">
                  <p className="h-[44px] border-b-[5px] border-[#E66B31] font-inter font-bold text-xl leading-8"> Add Accomodation</p>
                </div>
                <div className=" mt-[-4.9%] ml-[7%] bg-[#9D9D9D] h-[30px] cursor-pointer w-[70px] flex justify-center overflow-hidden items-center
                        rounded-[3px]"
                >
                  <span className="text-white">
                    <Link to="/admin"> Go Back </Link>
                  </span>
                </div>
                <Formik
                  validationSchema={validationSchema}
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
                              placeholder="Name"
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
                              as="select"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                              rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                            >
                              {typeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
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
                              placeholder="Description"
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
                              placeholder="Email"
                            />
                            <ErrorMessage name="contacts.email" />
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
                              type="text"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                              placeholder="Phone"
                            />
                            <ErrorMessage name="contacts.phone_number" />
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
                              type="url"
                              autocomplete="off"
                              className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                rounded-[5px] focus:outline-none h-[37px] focus:border-[#E66B31]"
                              placeholder="Website"
                            />
                            <ErrorMessage name="contacts.website" />
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
                              placeholder="Country"
                            />
                            <ErrorMessage name="location.country" />
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
                              placeholder="Province"
                            />
                            <ErrorMessage name="location.province" />
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
                              placeholder="District"
                            />
                            <ErrorMessage name="location.district" />
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
                              placeholder="City"
                            />
                            <ErrorMessage name="location.city" />
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
                              placeholder="Sector"
                            />
                            <ErrorMessage name="location.sector" />
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
                              placeholder="Cell"
                            />
                            <ErrorMessage name="location.cell" />
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
                              placeholder="Village"
                            />
                            <ErrorMessage name="location.village" />
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
                              placeholder="Postal Code"
                            />
                            <ErrorMessage name="location.postal_code" />
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
                              placeholder="Latitude"
                            />
                            <ErrorMessage name="location.latitude" />
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
                              placeholder="Longitude"
                            />
                            <ErrorMessage name="location.longitude" />
                          </div>
                        </div>
                      </div>
                      <div className=" flex flex-col space-y-4 ">
                        <h1 className="font-inter font-bold text-gray-900 text-base leading-6
                          tracking-tighter border-b-[1px] border-[#424242] w-[174px]"
                        >
                          Additional Information
                        </h1>
                        <div className="grid grid-cols-1 gap-8">
                          <div className=" flex flex-col">
                            <label
                              htmlFor="amenities"
                              className="font-inter font-bold text-[#424242]
                              text-base leading-5 mb-[13px]"
                            >
                              Amenities
                            </label>
                            <Field
                              name="meta.amenities"
                            >
                              {({ field }) => (
                                <div>
                                  <input
                                    type="text"
                                    {...field}
                                    id="amenities"
                                    placeholder="Enter amenities separated by commas"
                                    className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                    rounded-[5px] w-[32%] focus:outline-none h-[47px] focus:border-[#E66B31]"
                                    autoComplete="off"
                                  />
                                </div>
                              )}
                            </Field>
                            <ErrorMessage name="meta.amenities" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="policies"
                              className="font-inter font-bold text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              Policies

                            </label>
                            <Field
                              name="meta.policies"
                            >
                              {({ field }) => (
                                <div>
                                  <input
                                    type="text"
                                    {...field}
                                    id="policies"
                                    placeholder="Enter policies separated by commas"
                                    className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                    rounded-[5px] focus:outline-none h-[47px] w-[32%] focus:border-[#E66B31]"
                                    autoComplete="off"
                                  />
                                </div>
                              )}
                            </Field>
                            <ErrorMessage name="meta.policies" />
                          </div>

                          <div className=" flex flex-col">
                            <label
                              htmlFor="properties"
                              className="font-inter font-bold text-[#424242]
                                 text-base leading-5 mb-[13px] "
                            >
                              Properties
                            </label>
                            <Field
                              name="meta.properties"

                            >
                              {({ field }) => (
                                <div>
                                  <input
                                    type="text"
                                    {...field}
                                    id="properties"
                                    placeholder="Enter properties separated by commas"
                                    className="box-border border-[2px] text-[#424242] border-[#9D9D9D]
                                    rounded-[5px] w-[32%]focus:outline-none h-[47px] focus:border-[#E66B31]"
                                    autoComplete="off"
                                  />
                                </div>
                              )}
                            </Field>
                            <ErrorMessage name="meta.properties" />
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
                          Add
                        </button>
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
