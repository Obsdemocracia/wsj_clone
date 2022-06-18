import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './Category.scss';

const Category = ({ name, highlighted, onClickCallback }) => {
  // Here we decide if the button shall be highlighted or not
  let status = 'slate';

  if (highlighted === true) {
    status = 'highlighted';
  }

  return (
    <>
      <button
        id={name}
        onClick={(event) => onClickCallback(event.target.id)}
        className={`button ${status}`}
      >
        {CATEGORIES[name].toUpperCase()}
      </button>
    </>
  );
};

export default Category;