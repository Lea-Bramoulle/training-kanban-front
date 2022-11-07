import './../../styles/_reset.scss';
import './App.scss';

import { React, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../../pages/Home/home';
import Task from '../Task/Task';
import CreateTask from '../Task/CreateTask';
import UpdateTask from '../Task/UpdateTask';
import DeleteTask from '../Task/DeleteTask';
import CreateList from '../Lists/CreateList';
import CreateBoard from '../Board/CreateBoard';
import UpdateBoard from '../Board/updateBoard';
import DeleteBoard from '../Board/DeleteBoard';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;

  const { darkMode } = useSelector((state) => state.app);

  useEffect(() => {
    if (darkMode === true) {
      document.getElementById('modal-root').className = 'dark';
    } else {
      document.getElementById('modal-root').className = 'light';
    }
  });

  return (
    <div className="app" id={darkMode === true ? 'dark' : 'light'}>
      <Routes location={background || location}>
        <Route path="/" element={<Home />}>
          <Route path="task/:id" element={<Task />} />
          <Route path="task/create" element={<CreateTask />} />
          <Route path="task/update" element={<UpdateTask />} />
          <Route path="task/delete" element={<DeleteTask />} />
          <Route path="list/create" element={<CreateList />} />
          <Route path="board/create" element={<CreateBoard />} />
          <Route path="board/update" element={<UpdateBoard />} />
          <Route path="board/delete" element={<DeleteBoard />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="task/:id" element={<Task />} />
          <Route path="task/create" element={<CreateTask />} />
          <Route path="task/update" element={<UpdateTask />} />
          <Route path="task/delete" element={<DeleteTask />} />
          <Route path="list/create" element={<CreateList />} />
          <Route path="board/create" element={<CreateBoard />} />
          <Route path="board/update" element={<UpdateBoard />} />
          <Route path="board/delete" element={<DeleteBoard />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
