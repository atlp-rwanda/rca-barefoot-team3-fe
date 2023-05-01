import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getAllBookings } from '../utils/api';

export default function Bookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    async function get() {
      setLoading(true);
      const data = await getAllBookings(token);
      setBookings(data?.bookings);
      setLoading(false);
    }
    get();
  }, [token]);

  let filteredBookings = bookings;
  if (searchValue) {
   
     filteredBookings = bookings.filter(booking => {
      // Check if the search value matches any property of the booking object
      for (const property in booking) {
        if (booking.hasOwnProperty(property) && booking[property].toString().toLowerCase().includes(searchValue.toLowerCase())) {
          return true; // Return true if a match is found
        }
      }
      return false; // Return false if no match is found
    });
  }
  if (filterStatus !== 'all') {
    filteredBookings = filteredBookings.filter(
      (booking) => booking.status === filterStatus
    );
  }


  // get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Dashboard>
      <div>
        <input
        className='p-3 rounded'
          placeholder='Search bookings'
          name='searchValue'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div className='my-4 bg-white w-full h-16 flex space-x-24'>
          <button
            className={`${
              filterStatus === 'all' ? 'border-b-2 border-orange-500' : ''
            } mx-2 w-2/12 `}
            onClick={() => setFilterStatus('all')}
          >
            All Bookings
          </button>
          <button
            className={`${
              filterStatus === 'ACCEPTED' ? 'border-b-2 border-orange-500' : ''
            } mx-2`}
            onClick={() => setFilterStatus('ACCEPTED')}
          >
            Approved
          </button>
            <button
            className={`${
              filterStatus === 'OPEN' ? 'border-b-2 border-orange-500' : ''
            } mx-2`}
            onClick={() => setFilterStatus('OPEN')}
          >
            Pending
          </button>
          <button
            className={`${
              filterStatus === 'rejected' ? 'border-b-2 border-orange-500' : ''
            } mx-2`}
            onClick={() => setFilterStatus('rejected')}
          >
            Rejected
          </button>
        
        </div>
        <table className="table table-responsive table-auto w-full p-2 bg-white">
          <thead className="font-bold">
            <tr className='border-b border-gray-300'> 
              <th className='py-6 '>Created By</th>
              <th className='py-6 '>Created At</th>
              <th className='py-6 '>Check In</th>
              <th className='py-6 '>Check Out</th>
              <th className='py-6 '>Room</th>
              <th className='py-6 '>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr className='border-b  border-gray-300 text-center' key={index}>
                <td className='py-8 font-bold'>{booking.userId}</td>
                <td className='py-8'>{booking.created_at}</td>
                <td className='py-8'>{booking.dateToCome}</td>
                <td className='py-8'>{booking.dateToLeave}</td>
                <td className='py-8'>{booking.roomId}</td>
                <td className='py-8'>{booking.status}</td>
              </tr>
            ))}
          </tbody>
           
        </table>

       <div className=' w-[100%]  my-4 '>
          {bookings.length > bookingsPerPage && (
            <div className='w-full flex  space-x-12 justify-end'>
              <button className='p-2 border-2 border-orange w-32' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (v, i) => i + 1).map((number) => (
                <button 
    className={`rounded w-12 h-12 ${currentPage === number ? 'bg-orange text-white' : 'bg-none text-orange'}`}
                 key={number} onClick={() => paginate(number)} disabled={currentPage === number}>{number}</button>
              ))}
              <button className='p-2 border-2 border-orange w-32' onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(bookings.length / bookingsPerPage)}>Next</button>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  )
}
