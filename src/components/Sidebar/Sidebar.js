import './Sidebar.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayDarkMode, setSelectedBoardID } from './../App/appSlice';

import { useGetAllBoardsQuery } from './../../API/APIslice';

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const selectedBoardId = useSelector((state) => state.app.selectedBoardId);

  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetAllBoardsQuery();

  console.log(data);

  return (
    <section className="sidebar">
      <img
        src={require('./../../assets/images/logo-dark.png')}
        alt="kanban logo"
        className="sidebar-logo"
      />
      <div className="boards">
        <h2 className="boards-title">All Boards</h2>
        {/* <ul className="boards-container">
          {data.map((element) => (
            <li
              className={
                element.id === selectedBoardId
                  ? 'boards-element boards-element--active'
                  : 'boards-element'
              }
              onClick={() => dispatch(setSelectedBoardID(element.id))}
            >
              {element.name}
            </li>
          ))}
        </ul> */}
      </div>
      <div className="darkmode-container">
        <img
          src={require('./../../assets/images/icon-light-theme.png')}
          alt="darkmode icon light"
          className="darkmode-icon"
        />
        <div
          className="darkmode-button"
          onClick={() => dispatch(setDisplayDarkMode())}
        >
          <div
            className={
              darkMode
                ? 'darkmode-button-toggler '
                : 'darkmode-button-toggler darkmode-button-toggler--active'
            }
          ></div>
        </div>
        <img
          src={require('./../../assets/images/icon-dark-theme.png')}
          alt="darkmode icon dark"
          className="darkmode-icon"
        />
      </div>
    </section>
  );
}

export default App;
