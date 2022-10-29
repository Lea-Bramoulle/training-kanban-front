import './Lists.scss';
import './../../styles/_reset.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useGetAllListsOfOneBoardQuery } from './../../API/APIslice';

function Lists() {
  const selectedBoardId = useSelector((state) => state.app.selectedBoardId);

  const dispatch = useDispatch();

  const listsOfBoardData = useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  console.log(listsOfBoardData);

  return (
    <div className="lists-container">
      {listsOfBoardData?.map((element) => (
        <div className="list">
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
              <div className="task-container">
                <p className="task-title">{element.name}</p>
                <p className="task-subtitle">
                  {element.subtasks.filter((e) => e.is_done === true).length} of{' '}
                  {element.subtasks.length} subtasks
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Lists;
