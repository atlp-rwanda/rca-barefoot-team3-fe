import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Register from './views/Register';
import Login from './views/user/Login';
import Verify from './views/Verify';
import { setToken, setAuthenticated } from './redux/authslice';
import Dashboard from './components/Dashboard';
import BookingsPage from './views/BookingsTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(setToken(token));
      dispatch(setAuthenticated(true));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/bookings" element={<BookingsPage/>}/>
    </Routes>
  );
}

export default App;
