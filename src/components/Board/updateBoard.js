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

  const boardsDataQuery = useGetAllBoardsQuery();
  const boardDataQuery = useGetAllListsOfOneBoardQuery(selectedBoardId);
  const boardDataData = useGetOneBoardQuery(selectedBoardId).data;
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

    console.log(newListsNameValues);
    setListsNameValues(newListsNameValues);
  };

  const updateSelectedBoard = (e) => {
    e.preventDefault();

    selectedBoardWithListsData.forEach((element) => {
      const ListInStateValue = listsNameValues.find((i) => i.id === element.id);

      if (ListInStateValue.name !== element.name) {
        console.log('list a du se modif');
        updateList({
          id: element.id,
          name: ListInStateValue.name,
        })
          .unwrap()
          .then((data) => {
            console.log(data);
            boardDataQuery.refetch();
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
        dispatch(setToggleBordOptions());
        boardsDataQuery.refetch();
        boardDataQuery.refetch();
        dispatch(setToggleTaskModal());
        navigate(-1);
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
                dispatch(setToggleBordOptions());
                dispatch(setToggleTaskModal());
                navigate(-1);
              }}
            />
          </div>
        </div>

        <form className="task-create-form" onSubmit={updateSelectedBoard}>
          <label for="name" className="task-details-subtitle">
            Board name :
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
          Board Columns :{/* <form className="board-update-form"> */}
          {selectedBoardWithListsData?.map((element, id) => (
            <div className=" board-update-container">
              <input
                type="text"
                name={`name-${id}`}
                id={`name-${id}`}
                className="board-update-input"
                placeholder={element.name}
                value={listsNameValues[id].value}
                onChange={(e) => {
                  handleListNameValueChange(id, e.target.value);
                }}
              />
              <i class="fa-solid fa-chevron-down success"></i>
              <i class="fa-solid fa-xmark"></i>
            </div>
          ))}
          {/* </form> */}
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
