import './App.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '../../pages/Home/home';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
