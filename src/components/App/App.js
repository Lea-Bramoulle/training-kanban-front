import './App.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayDarkMode } from './appSlice';

function App() {
  const count = useSelector((state) => state.app.darkMode);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(setDisplayDarkMode())}
        >
          dark mode
        </button>
      </div>
    </div>
  );
}

export default App;
