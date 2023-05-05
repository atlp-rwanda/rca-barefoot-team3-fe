/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AccomodationCard from './AccomodationCard';
import {
  getAllAccomodations, getAllBookings, getAllRooms, deleteAccomodation,
} from '../utils/api';

export default function AccomodationBoard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [bookings, setBookings] = useState(null);
  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await getAllAccomodations();
      const roomresponse = await getAllRooms();
      const bookingresponse = await getAllBookings(token);
      setData(response.accommodations);
      setRooms(roomresponse.rooms);
      setBookings(bookingresponse.bookings);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const DeleteAccomodation = async (id) => {
    try {
      await deleteAccomodation(id);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
        <div id="main-content" className="h-full w-full  bg-gray-50 relative ml-44">
          <main>
            <div className="px-20 pt-12 bg-[#FFEADF] h-screen overflow-y-auto overflow-x-hidden ">
              {loading ? (
                <p>Loading...</p>
              ) : data ? (
                <div className="bg-white pl-[2%] w-[103%] pb-[12%] rounded-[13px] flex flex-col">
                  <div className="flex justify-start items-center space-x-4 flex-row mt-[4%] mb-[38px]">
                    <p className="h-[44px] border-b-[5px] border-[#E66B31] font-inter font-normal text-sm leading-5"> All Accomodations(100)</p>
                    <p className="h-[44px] font-inter font-normal text-sm leading-5"> Free Accomodations(100)</p>
                    <p className="h-[44px] font-inter font-normal text-sm leading-5"> Booked Accomodations (100)</p>
                  </div>
                  <div className="flex justify-start items-center w-[96%] flex-row border-b-[1px] border-[#424242] pb-[4%]">
                    <p className=" font-inter font-bold text-sm leading-5 ml-[3%]"> Accomodation Name</p>
                    <p className=" font-inter font-bold text-sm leading-5 ml-[9%]"> Accomodation Type</p>
                    <p className=" font-inter font-bold text-sm leading-5 ml-[3%]"> Available Rooms</p>
                    <p className=" font-inter font-bold text-sm leading-5 ml-[3%]"> Booked Rooms</p>
                    <p className=" font-inter font-bold text-sm leading-5 ml-[3%]"> Status</p>
                    <p className=" font-inter font-bold text-sm leading-5 ml-[8%]"> Actions</p>
                  </div>

                  {
                    data.map((item) => {
                      const Accomodationrooms = rooms.filter((room) => room.accommodation_id === item.id);
                      const Accomodationbookings = Accomodationrooms.map((room) => {
                        const roombookings = bookings.filter((booking) => booking.roomId === room.id && booking.status === 'APPROVED');
                        return roombookings;
                      });
                      const Accomodationbookingscount = Accomodationbookings.map((booking) => booking.length);
                      const Accomodationbookingscountsum = Accomodationbookingscount.reduce((a, b) => a + b, 0);
                      const AvailableRooms = Accomodationrooms.length - Accomodationbookingscountsum;
                      return (
                        <AccomodationCard
                          key={item.id}
                          name={item.name}
                          type={item.type}
                          district={item.location.district}
                          province={item.location.province}
                          availableRooms={AvailableRooms}
                          bookedRooms={Accomodationbookingscountsum}
                          id={item.id}
                          onClick={(id) => { DeleteAccomodation(id); }}
                        />
                      );
                    })
                  }
                </div>
              ) : (
                <p>No data</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
