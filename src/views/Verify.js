import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  // Handle input change
  const handleInputChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // Handle verification form submit
  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div>
      <h1>Verification Page</h1>
      <form onSubmit={handleVerificationSubmit}>
        <label>
          Verification Code:
          <input type="text" value={verificationCode} onChange={handleInputChange} />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default Verify;
