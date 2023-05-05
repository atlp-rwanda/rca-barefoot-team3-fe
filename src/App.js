import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Register from './views/user/Register';
import Login from './views/user/Login';
import Verify from './views/user/Verify';
import { setToken, setAuthenticated } from './redux/authslice';

import { LandingPage } from './views/landing';
import InitiateResetPassword from './views/InitiateResetPassword';
import CheckEmailDialogPage from './views/CheckEmailDialogPage';
import ResetPassword from './views/ResetPassword';
import Dashboard from './components/Dashboard';
import Rooms from './components/Rooms';

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/initiate-reset-password" element={<InitiateResetPassword />} />
      <Route path="/check-email" element={<CheckEmailDialogPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
