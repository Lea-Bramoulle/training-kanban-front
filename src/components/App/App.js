import './../../styles/_reset.scss';
import './App.scss';

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../../pages/Home/home';
import Task from '../Task/Task';
import Sidebar from '../Sidebar/Sidebar';
import Board from '../Board/Board';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const { toggleTaskModal } = useSelector((state) => state.app);

  return (
    <div className="app">
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="task/:id" element={<Task />} />
        </Route>
        {/* <Route path="/task/:id" element={<Task />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {background && (
        <Routes>
          <Route path="task/:id" element={<Task />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
