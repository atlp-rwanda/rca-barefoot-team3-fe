import React ,{useEffect, useState}from 'react'
import { getAllRooms } from '../utils/api'
import SocialButton from './SocialButton';
import BookingModal from './BookingModal';
export default function Rooms() {

    const [loading, setLoading] = useState(true);
  
const [rooms,setRooms]=useState([])
useEffect(() => {
    async function get() {
      setLoading(true);
       const data = await getAllRooms();
      setRooms(data?.rooms);
      setLoading(false);
    }
    get();
  },[]);
  return (
    <div className='my-5'>

    {loading ? (
        <p>Loading ....</p>
      ) : (
        <table className="table table-responsive table-auto w-full p-2 bg-white">
        <thead className="font-bold">
          <tr className="border-b border-gray-300">
            <th className="py-6 ">Room Id</th>
            <th className="py-6 ">Accommodation Id</th>
            <th className="py-6 ">Type</th>
            <th className="py-6 ">Description</th>
            <th className="py-6 ">Pricing Plans</th>
            <th className="py-6 ">Images</th>
            <th className="py-6 ">Actions</th>
          </tr>
        </thead>
        <tbody>
    {rooms?.map((room,index)=>(

            <tr className="border-b  border-gray-300 text-center" key={index}>
            <td className="py-8 font-bold">{room.id}</td>
            <td className="py-8">{room.accommodation_id}</td>
            <td className="py-8">{room.type}</td>
            <td className="py-8">{room.description}</td>
            <td className="py-8">{room.pricing.plans[0].price}</td>
            <td className="py-8">{room.images}</td>
            <td>
            <button type="submit" className="   my-2  button-primary">Book room</button>
            <BookingModal/>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
    
  )}   </div>
       ) 
}
