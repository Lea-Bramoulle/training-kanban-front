import './Lists.scss';
import './../../styles/_reset.scss';

import React from 'react';

function ListsEmpty() {
  return (
    <div className="lists-container-empty">
      <p>This board is empty. Create a new column to get started.</p>
      <button className="main-button">Add new column</button>
    </div>
  );
}

export default ListsEmpty;
