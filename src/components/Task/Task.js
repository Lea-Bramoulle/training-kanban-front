import './Task.scss';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Task() {
  const selectedTaskId = useSelector((state) => state.app.selectedTaskId);

  const dispatch = useDispatch();
  return (
    <div className="task-details">
      <div className="task-details-container">{selectedTaskId}</div>
    </div>
  );
}

export default Task;
