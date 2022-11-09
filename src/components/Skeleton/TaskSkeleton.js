/* eslint-disable jsx-a11y/heading-has-content */
import '../Task/Task.scss';
import './Skeleton.scss';

function TaskSkeleton() {
  return (
    <>
      <div className="task-details-title-section">
        <p className=" skeleton skeleton--subtitle"></p>
        <div>
          <img
            src={require('./../../assets/images/icon-vertical-ellipsis.png')}
            alt="Task option icon"
            className="boards-element-icon"
          />
          <img
            src={require('./../../assets/images/icon-cross.png')}
            alt="Task option icon"
            className="boards-element-icon"
          />
        </div>
      </div>
      <div className="mb-1">
        <p className="skeleton skeleton--desc"></p>
        <p className="skeleton skeleton--desc"></p>
        <p className="skeleton skeleton--desc-sm"></p>
      </div>
      <ul className="subtasks-container ">
        <li className="subtasks-element">
          <div className="subtasks-checkbox-false skeleton"></div>
          <p className=" skeleton skeleton--text"></p>
        </li>
        <li className="subtasks-element">
          <div className="subtasks-checkbox-false skeleton"></div>
          <p className=" skeleton skeleton--text"></p>
        </li>
        <li className="subtasks-element">
          <div className="subtasks-checkbox-false skeleton"></div>
          <p className=" skeleton skeleton--text-sm"></p>
        </li>
      </ul>
    </>
  );
}

export default TaskSkeleton;
