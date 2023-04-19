import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Verify from './views/Verify';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />

    </Routes>
  );
}

export default App;
