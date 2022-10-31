import './Lists.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useGetAllListsOfOneBoardQuery } from './../../API/APIslice';

import { setSelectedTaskID } from './../App/appSlice';

function Lists() {
  const selectedBoardId = useSelector((state) => state.app.selectedBoardId);

  const dispatch = useDispatch();

  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  console.log(listsOfBoardData);

  return (
    <div className="lists-container">
      {listsOfBoardData?.map((element) => (
        <div className="list" key={element.id}>
          <div className="list-header">
            <h2 className="list-title">
              <div
                className="list-title-bullet"
                style={{ backgroundColor: `#${element.color}` }}
              ></div>
              {element.name} ( {element.tasks.length} )
            </h2>
          </div>
          <div className="tasks">
            {element.tasks.map((element) => (
              <div className="task-container" key={element.id}>
                <p
                  className="task-title"
                  onClick={() => dispatch(setSelectedTaskID(element.id))}
                >
                  <NavLink key={element.id} to={`task/${element.id}`}>
                    {element.name}
                  </NavLink>
                </p>
                <p className="task-subtitle">
                  {element.subtasks.filter((e) => e.is_done === true).length} of{' '}
                  {element.subtasks.length} subtasks
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="list-new">
        <p>
          <i className="fa-sharp fa-solid fa-plus"></i> New Column
        </p>
      </div>
    </div>
  );
}

export default Lists;
