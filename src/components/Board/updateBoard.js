import './../App/App.scss';
import './Board.scss';

import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  useUpdateBoardMutation,
  useGetAllBoardsQuery,
  useGetOneBoardQuery,
  useGetAllListsOfOneBoardQuery,
  useUpdateListMutation,
  useDeleteListMutation,
} from './../../API/APIslice';

import {
  setToggleTaskModal,
  setBoardTitleValue,
  setSelectedBoardID,
  setToggleBordOptions,
  setListTitleValue,
} from './../App/appSlice';

function UpdateBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boardTitleValue, selectedBoardId, listTitleValue } = useSelector(
    (state) => state.app
  );

  const [updateBoard] = useUpdateBoardMutation();
  const [updateList] = useUpdateListMutation();
  const [deleteList] = useDeleteListMutation();

  const boardsDataQuery = useGetAllBoardsQuery();
  const boardDataQuery = useGetOneBoardQuery(selectedBoardId);
  const boardDataData = useGetOneBoardQuery(selectedBoardId).data;
  const boardListsDataQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);
  const selectedBoardWithListsData =
    useGetAllListsOfOneBoardQuery(selectedBoardId).data;

  const [listsNameValues, setListsNameValues] = useState(
    selectedBoardWithListsData
  );

  const handleListNameValueChange = (id, value) => {
    const newListsNameValues = [...listsNameValues];
    newListsNameValues[id] = {
      ...listsNameValues[id],
      name: value,
    };

    setListsNameValues(newListsNameValues);
  };

  const updateSelectedBoard = (e) => {
    e.preventDefault();

    selectedBoardWithListsData.forEach((element) => {
      const ListInStateValue = listsNameValues.find((i) => i.id === element.id);

      if (ListInStateValue.name !== element.name) {
        updateList({
          id: element.id,
          name: ListInStateValue.name,
        })
          .unwrap()
          .then((data) => {
            boardListsDataQuery.refetch();
            boardsDataQuery.refetch();
          });
      }
    });

    updateBoard({
      id: selectedBoardId,
      name: e.target.name.value,
    })
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setBoardTitleValue(''));
        dispatch(setSelectedBoardID(data.id));
        boardsDataQuery.refetch();
        boardListsDataQuery.refetch();
        boardDataQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
      });
  };

  const handleDeleteList = (listId) => {
    const newListsNameValues = [...listsNameValues].filter(
      (element) => element.id !== listId
    );
    setListsNameValues(newListsNameValues);

    deleteList(listId)
      .unwrap()
      .then(() => {
        boardListsDataQuery.refetch();
      });
  };

  return ReactDOM.createPortal(
    <div className="task-details">
      <div className="task-details-container">
        <div className="task-details-title-section">
          <h2 className="task-details-title">Edit Board</h2>
          <div>
            <img
              src={require('./../../assets/images/icon-cross.png')}
              alt="Task option icon"
              className="boards-element-icon"
              onClick={() => {
                dispatch(setToggleTaskModal());
                navigate(-1);
              }}
            />
          </div>
        </div>

        <form className="task-create-form" onSubmit={updateSelectedBoard}>
          <label for="name" className="task-details-subtitle">
            Board name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="task-create-input"
            placeholder={boardDataData?.name}
            value={boardTitleValue}
            onChange={(e) => {
              dispatch(setBoardTitleValue(e.target.value));
            }}
          />
          <p className="task-details-subtitle mt-1">Board Columns</p>
          <div className="board-update-lists">
            {selectedBoardWithListsData?.map((element, id) => (
              <div className=" board-update-container">
                <input
                  type="text"
                  name={`name-${id}`}
                  id={`name-${id}`}
                  className="board-update-input"
                  placeholder={element.name}
                  value={listsNameValues[element.id]?.value}
                  onChange={(e) => {
                    handleListNameValueChange(id, e.target.value);
                  }}
                />
                <i
                  class="fa-solid fa-xmark"
                  onClick={() => handleDeleteList(element.id)}
                ></i>
              </div>
            ))}
          </div>
          <button type="submit" className="button-submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default UpdateBoard;
