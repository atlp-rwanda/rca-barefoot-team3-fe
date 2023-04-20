import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../slices/auth';
import { toast,ToastContainer } from 'react-toastify'; // Import the toast module
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function Verify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = useSelector((state) => state.message);
  const searchParams = new URLSearchParams(location.search);
  const verificationCode = searchParams.get('code');
  let userEmail = searchParams.get('email');
;
const [inputValues, setInputValues] = useState({ email: userEmail, code: verificationCode });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {}, [dispatch]);

  // Handle verification form submit
  const handleVerificationSubmit =  async(e) => {
    e.preventDefault();
  
const code=Number(inputValues.code);
const email=inputValues.email
console.log("coode",code)
  await  dispatch(verify({ code, email }))
      .unwrap()
      .then(() => {
        toast.success('Verification successful!', {
          position: 'top-right', // Set position to top-right
          autoClose: 3000, // Auto-close the toast after 3 seconds
          hideProgressBar: false, // Show progress bar
          closeOnClick: true, // Close toast on click
          pauseOnHover: true, // Pause toast on hover
          draggable: true, // Make toast draggable
          onClose: () => {
            // Navigate to /login after toast is closed
            navigate('/login');
          },
        });
       
      })
      .catch(() => {
        toast.error(message, {
          position: 'top-right', // Set position to top-right
          autoClose: 3000, // Auto-close the toast after 3 seconds
          hideProgressBar: false, // Show progress bar
          closeOnClick: true, // Close toast on click
          pauseOnHover: true, // Pause toast on hover
          draggable: true, // Make toast draggable
          className: 'toast-error', // Add custom class for error toast
        });
      });
    
  };

  return (
    <div className='flex justify-center'>
      <div className='m-24'>
        <form className=''>
          <div>
          <p className='py-4'>Enter your Email:</p>

          <input
          name='email'
            className='border mr-12 w-full rounded border-gray-300 h-10'
            type='text'
            value={inputValues.email}
            onChange={handleInputChange}
          />
          </div>
          <div>
          <p className='py-4'>Enter verification code:</p>

         
          <input
          name='code'
            className='border w-full mr-12 rounded border-gray-300 h-10'
            type='text'
            value={inputValues.code}
            onChange={handleInputChange}
          />
          </div>
        
          <button
            onClick={handleVerificationSubmit}
            className='button-secondary my-2 w-full'
            type='submit'
          >
            Verify
          </button>
        </form>
        <Link to='/login'>
        <p className='my-4'>Already Verified?<span className='text-green text-bold'> Sign in</span></p>

        </Link>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Verify;
