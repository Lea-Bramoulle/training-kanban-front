import './Board.scss';
import './../../styles/_reset.scss';

import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import {
  useGetAllListsOfOneBoardQuery,
  useGetOneBoardQuery,
  useGetAllBoardsQuery,
} from './../../API/APIslice';

import {
  setToggleBordOptions,
  setToggleTaskModal,
  setSelectedBoardID,
  setDisplayDarkMode,
  setToggleMobileMenu,
} from './../App/appSlice';

import Lists from '../Lists/Lists';
import ListsEmpty from '../Lists/ListsEmpty';

function Board() {
  const {
    selectedBoardId,
    toggleBordOptions,
    toggleSidebar,
    darkMode,
    toggleMobileMenu,
  } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const location = useLocation();

  const boardsData = useGetAllBoardsQuery().data;
  const boardData = useGetOneBoardQuery(selectedBoardId).data;
  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  //choose the screen size
  const handleResize = () => {
    setDeviceWidth(window.innerWidth);
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <section className={toggleSidebar ? 'board w-80' : 'board w-100'}>
      <div className="board-header">
        {deviceWidth < 720 ? (
          <div className="board-header-mobile">
            <img
              src={require('./../../assets/images/logo-mobile.png')}
              alt="kanban logo"
              className="sidebar-logo"
            />
            <h1 className="board-title">{boardData?.name}</h1>
            <i
              onClick={() => dispatch(setToggleMobileMenu())}
              class={
                toggleMobileMenu
                  ? 'fa-solid fa-caret-up'
                  : 'fa-solid fa-caret-down'
              }
            ></i>
            {toggleMobileMenu === true && (
              <div className="board-header-mobile-menu">
                <h2 className="boards-title">
                  All Boards ({boardsData?.length})
                </h2>
                {boardsData?.map((element) => (
                  <p
                    className={
                      element.id === selectedBoardId
                        ? 'boards-element boards-element--active'
                        : 'boards-element'
                    }
                    key={element.id}
                    onClick={() => {
                      dispatch(setSelectedBoardID(element.id));
                      setDeviceWidth(window.innerWidth);
                    }}
                  >
                    <img
                      src={require('./../../assets/images/icon-board.png')}
                      alt="board icon"
                      className="boards-element-icon"
                    />
                    {element.name}
                  </p>
                ))}
                <div className="boards-element boards-element--main">
                  <img
                    src={require('./../../assets/images/icon-board.png')}
                    alt="board icon"
                    className="boards-element-icon"
                  />
                  <Link
                    to={`/board/create`}
                    state={{ background: location }}
                    onClick={() => dispatch(setToggleTaskModal())}
                    className="link-active"
                  >
                    <i className="fa-sharp fa-solid fa-plus"></i> Create new
                    board
                  </Link>
                </div>
                <div className="darkmode-container">
                  <img
                    src={require('./../../assets/images/icon-dark-theme.png')}
                    alt="darkmode icon dark"
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
                    src={require('./../../assets/images/icon-light-theme.png')}
                    alt="darkmode icon light"
                    className="darkmode-icon"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <h1 className="board-title">{boardData?.name}</h1>
        )}
        <div className="board-header-right">
          {listsOfBoardData?.length === 0 ? (
            <Link
              to={`/list/create`}
              state={{ background: location }}
              onClick={() => dispatch(setToggleTaskModal())}
              className="main-button"
            >
              <i className="fa-sharp fa-solid fa-plus"></i>
              {deviceWidth < 720 ? '' : 'Add New Column'}
            </Link>
          ) : (
            <Link
              to={`/task/create`}
              state={{ background: location }}
              onClick={() => dispatch(setToggleTaskModal())}
              className="main-button"
            >
              <i className="fa-sharp fa-solid fa-plus"></i>
              {deviceWidth < 720 ? '' : 'Add New Task'}
            </Link>
          )}

          <img
            src={require('./../../assets/images/icon-vertical-ellipsis.png')}
            alt="board option icon"
            className="boards-element-icon"
            onClick={() => dispatch(setToggleBordOptions())}
          />
          {toggleBordOptions && (
            <div className="board-options-container">
              <Link
                to={`/list/create`}
                state={{ background: location }}
                onClick={() => {
                  dispatch(setToggleTaskModal());
                  dispatch(setToggleBordOptions());
                }}
              >
                <p>
                  <i className="fa-solid fa-plus"></i> New Column
                </p>
              </Link>
              <Link
                to={`/board/update`}
                state={{ background: location }}
                onClick={() => {
                  dispatch(setToggleTaskModal());
                  dispatch(setToggleBordOptions());
                }}
              >
                <p>Edit Board</p>
              </Link>
              <Link
                to={`/board/delete`}
                state={{ background: location }}
                onClick={() => {
                  dispatch(setToggleTaskModal());
                  dispatch(setToggleBordOptions());
                }}
              >
                <p>Delete Board</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="board-section">
        {listsOfBoardData?.length === 0 ? <ListsEmpty /> : <Lists />}
      </div>
    </section>
  );
}

export default Board;
