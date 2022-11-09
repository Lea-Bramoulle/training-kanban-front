import '../Sidebar/Sidebar.scss';
import './Skeleton.scss';

function SidebarSkeleton() {
  return (
    <ul className="boards-container ">
      <li className="boards-element">
        <img
          src={require('./../../assets/images/icon-board.png')}
          alt="board icon"
          className="boards-element-icon"
        />
        <span className="skeleton skeleton--text"></span>
      </li>
      <li className="boards-element ">
        <img
          src={require('./../../assets/images/icon-board.png')}
          alt="board icon"
          className="boards-element-icon"
        />
        <span className="skeleton skeleton--text"></span>
      </li>
      <li className="boards-element">
        <img
          src={require('./../../assets/images/icon-board.png')}
          alt="board icon"
          className="boards-element-icon"
        />
        <span className="skeleton skeleton--text"></span>
      </li>
      <li className="boards-element">
        <img
          src={require('./../../assets/images/icon-board.png')}
          alt="board icon"
          className="boards-element-icon"
        />
        <span className="skeleton skeleton--text-lg"></span>
      </li>
    </ul>
  );
}

export default SidebarSkeleton;
