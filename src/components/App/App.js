import './App.scss';
import './../../styles/_reset.scss';

import React from 'react';

import Sidebar from './../Sidebar/Sidebar';
import Main from '../Main/Main';

function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
