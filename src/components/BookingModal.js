import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBooking } from '../utils/api';
import 'react-toastify/dist/ReactToastify.css';

const moment = require('moment');

export default function BookingModal({ roomId }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [dateToCome, setDateToCome] = useState('');
  const [dateToLeave, setDateToLeave] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate dateToCome string
    const dateToComeValid = moment(dateToCome, 'YYYY-MM-DD', true).isValid();
    if (!dateToComeValid) {
      console.log('Invalid dateToCome:', dateToCome);
      return;
    }

    // Validate dateToLeave string
    const dateToLeaveValid = moment(dateToCome, 'YYYY-MM-DD', true).isValid();
    if (!dateToLeaveValid) {
      console.log('Invalid dateToLeave:', dateToLeave);
      return;
    }

    // Create Date objects from validated date strings

    await addBooking(roomId, dateToCome, dateToLeave, user, token)
      .then(() => {
        navigate('/admin');
        setShowModal(false);
      })
      .catch((error) => {
        console.log('Error creating booking:', error);
      });
  };

  return (
    <>
      <button
        className="bg-orange-600 text-white active:bg-orange font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Booking
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new Booking</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <form onSubmit={handleSubmit}>
                  <div className="relative p-6 flex-auto">
                    <label
                      htmlFor="check-in-date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Check-in Date
                      <input
                        type="date"
                        id="dateToCome"
                        value={dateToCome}
                        onChange={(event) => setDateToCome(event.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </label>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <label
                      htmlFor="check-out-date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Check-out Date
                      <input
                        type="date"
                        id="dateToCome"
                        value={dateToLeave}
                        onChange={(event) => setDateToLeave(event.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </label>
                  </div>
                </form>
                {/* footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
}
