import './../../styles/_reset.scss';
import './App.scss';

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from '../../pages/Home/home';
import Task from '../Task/Task';
import Sidebar from '../Sidebar/Sidebar';
import Board from '../Board/Board';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<Task />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
