import './Lists.scss';
import './../../styles/_reset.scss';

import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  useGetAllListsOfOneBoardQuery,
  useUpdateTaskMutation,
} from './../../API/APIslice';

import { setSelectedTaskID, setToggleTaskModal } from './../App/appSlice';

import ListsSkeleton from '../Skeleton/ListsSkeleton';

function Lists() {
  const selectedBoardId = useSelector((state) => state.app.selectedBoardId);

  const dispatch = useDispatch();
  const location = useLocation();

  const {
    data: listsOfBoardData,
    isLoading,
    isSuccess,
  } = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const boardListsDataQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);

  const [updateTask] = useUpdateTaskMutation();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateTask({
      id: draggableId,
      list_id: destination.droppableId,
    })
      .unwrap()
      .then((data) => {
        boardListsDataQuery.refetch();
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="lists-container">
        {isLoading && <ListsSkeleton />}
        {isSuccess &&
          listsOfBoardData?.map((list) => (
            <Droppable droppableId={`${list.id}`} key={list.id}>
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="list-header">
                    <h2 className="list-title">
                      <div
                        className="list-title-bullet"
                        style={{ backgroundColor: `${list.color}` }}
                      ></div>
                      {list.name} ( {list.tasks.length} )
                    </h2>
                  </div>
                  <div className="tasks">
                    {list.tasks.map((task) => (
                      <Draggable
                        draggableId={`${task.id}`}
                        index={task.id}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            className="task-container"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p
                              className="task-title"
                              onClick={() =>
                                dispatch(setSelectedTaskID(task.id))
                              }
                            >
                              <Link
                                to={`/task/${task.id}`}
                                state={{ background: location }}
                                onClick={() => dispatch(setToggleTaskModal())}
                              >
                                {task.name}
                              </Link>
                            </p>
                            <p className="task-subtitle">
                              {
                                task.subtasks.filter((e) => e.is_done === true)
                                  .length
                              }{' '}
                              of {task.subtasks.length} subtasks
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        <div className="list-new">
          <p>
            <Link
              to={`/list/create`}
              state={{ background: location }}
              onClick={() => dispatch(setToggleTaskModal())}
            >
              <i className="fa-sharp fa-solid fa-plus"></i> New Column
            </Link>
          </p>
        </div>
        <Outlet />
      </div>
    </DragDropContext>
  );
}

export default Lists;
