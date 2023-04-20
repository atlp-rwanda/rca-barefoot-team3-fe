import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import Login from './views/user/Login';
import Regitser from './views/Regitser';
import { setToken, setAuthenticated } from './redux/authslice';

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
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Regitser />} />
    </Routes>
  );
}

export default App;
