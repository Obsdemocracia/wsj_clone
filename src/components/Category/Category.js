import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import './Category.scss';

const Category = ({ name, highlighted, onClickCallback }) => {
  // Here we decide if the button shall be highlighted or not
  let className = 'slate';

  if (highlighted === true) {
    className = 'highlighted';
  }

  return (
    <>
      <button
        id={name}
        onClick={onClickCallback}
        className={className}
      >
        {CATEGORIES[name].toUpperCase()}
      </button>
    </>
  );
};

export default Category;