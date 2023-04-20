import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/user/Login';
import Regitser from './views/Regitser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Regitser />} />
    </Routes>
  );
}

export default App;
