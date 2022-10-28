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

  return <div className="lists-container">coucou lists</div>;
}

export default Lists;
