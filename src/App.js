import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Regitser from './views/Regitser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Regitser />} />
    </Routes>
  );
}

export default App;
