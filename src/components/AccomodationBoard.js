/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
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
    <div className="">
      <div className=" bg-[#9D9D9D] h-[30px] ml-[1px] cursor-pointer w-[180px] flex justify-center overflow-hidden items-center
                        rounded-[3px]"
      >
        <span className="text-white">
          <Link to="/newaccomodation"> Add Accomodation </Link>
        </span>
      </div>
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
  );
}
