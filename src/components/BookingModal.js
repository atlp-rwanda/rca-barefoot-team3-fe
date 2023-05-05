import React,{useState} from "react";
import { apiUrl } from "../utils/api";
import { toast, ToastContainer } from 'react-toastify'; // Import the toast module
import 'react-toastify/dist/ReactToastify.min.css';

export default function BookingModal({roomId}) {
  const [showModal, setShowModal] = useState(false);
  const [dateToCome, setDateToCome] = useState("");
  const [dateToLeave, setDateToLeave] = useState("");
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
   
 
  const handleSubmit = async (event) => {
    console.log("submit")
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await axios.post(`${apiUrl}/booking/${roomId}`, {
        dateToCome,
        dateToLeave,
      });
      setSuccessMessage(response.data.message);
      setDateToCome("");
      setDateToLeave("");
      toast.success(successMessage, {
        position: 'top-right', // Set position to top-right
        autoClose: 3000, // Auto-close the toast after 3 seconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Close toast on click
        pauseOnHover: true, // Pause toast on hover
        draggable: true, // Make toast draggable
        onClose: () => {
          // Navigate to /login after toast is closed
          navigate('/verify');
        },
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("Server error");
      }
      toast.error(error, {
        position: 'top-right', // Set position to top-right
        autoClose: 3000, // Auto-close the toast after 3 seconds
        hideProgressBar: false, // Show progress bar
        closeOnClick: true, // Close toast on click
        pauseOnHover: true, // Pause toast on hover
        draggable: true, // Make toast draggable
        className: 'toast-error', // Add custom class for error toast
      });
    }
    }
  
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
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create new Booking
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit}>
                  <div className="relative p-6 flex-auto">
                    <label
                      htmlFor="check-in-date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Check-in Date
                    </label>
                    <input
                    type="date"
                    id="dateToCome"
                    value={dateToCome}
                    onChange={(event) => setDateToCome(event.target.value)}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="relative p-6 flex-auto">
                    <label
                      htmlFor="check-out-date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Check-out Date
                    </label>
                    <input
                    type="date"
                    id="dateToCome"
                    value={dateToCome}
                    onChange={(event) => setDateToCome(event.target.value)}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  </form>
                {/*footer*/}
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
                  >
                    Save 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <ToastContainer />

        </>
      ) : null}
    </>
  );
}