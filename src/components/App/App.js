import './App.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayDarkMode } from './appSlice';

import { useGetAllBoardsQuery } from './../../API/APIslice';

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetAllBoardsQuery();

  console.log(data);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(setDisplayDarkMode())}
        >
          dark mode : {darkMode ? 'true' : 'false'}
        </button>
      </div>
    </div>
  );
}

export default App;
