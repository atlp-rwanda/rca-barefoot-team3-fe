import React,{ useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import BookingModal from "../components/BookingModal";

const TABS = [
  { label: "All", filter: "" },
  { label: "Pending", filter: "pending" },
  { label: "Accepted", filter: "confirmed" },
  {label:"Rejected", filter:"rejected" },
];

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetch("/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredBookings =
    activeTab === ""
      ? bookings
      : bookings.filter((booking) => booking.status === activeTab);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>
      <div className="flex mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 rounded-l-md ${
              activeTab === tab.filter
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(tab.filter)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Check-in Date</th>
            <th className="px-4 py-2">Check-out Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.bookingid}>
              <td className="border px-4 py-2">{booking.bookingid}</td>
              <td className="border px-4 py-2">{booking.checkin_date}</td>
              <td className="border px-4 py-2">{booking.checkout_date}</td>
              <td className="border px-4 py-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookingModal/>
    </div>
  );
}

export default BookingsPage;
