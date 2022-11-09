import '../Lists/Lists.scss';
import './Skeleton.scss';

function ListsSkeleton() {
  return (
    <div className="lists-container">
      <div className="list">
        <div className="list-header skeleton-list-header">
          <div
            className="list-title-bullet"
            style={{ backgroundColor: `#635FC7` }}
          ></div>
          <h2 className="list-title skeleton skeleton--title"></h2>
        </div>
        <div className="tasks">
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="list-header skeleton-list-header">
          <div
            className="list-title-bullet"
            style={{ backgroundColor: `#635FC7` }}
          ></div>
          <h2 className="list-title skeleton skeleton--title"></h2>
        </div>
        <div className="tasks">
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="list-header skeleton-list-header">
          <div
            className="list-title-bullet"
            style={{ backgroundColor: `#635FC7` }}
          ></div>
          <h2 className="list-title skeleton skeleton--title"></h2>
        </div>
        <div className="tasks">
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
          <div className="task-container ">
            <p className="task-title skeleton skeleton--text-lg"></p>
            <p className="task-subtitle skeleton skeleton--text"></p>
          </div>
        </div>
      </div>
      <div className="list-new">
        <p>
          <i className="fa-sharp fa-solid fa-plus"></i> New Column
        </p>
      </div>
    </div>
  );
}

export default ListsSkeleton;
