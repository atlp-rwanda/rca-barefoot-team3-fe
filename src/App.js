import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Register from './views/user/Register';
import Login from './views/user/Login';
import Verify from './views/user/Verify';
import { setToken, setAuthenticated } from './redux/authslice';
import Dashboard from './components/Dashboard';
import AccomodationBoard from './components/AccomodationBoard';
import EditAccomodation from './components/EditAccomodation';

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
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/accomodation" element={<AccomodationBoard />} />
      <Route path="/editaccomodation/:id" element={<EditAccomodation />} />

    </Routes>
  );
}

export default App;
