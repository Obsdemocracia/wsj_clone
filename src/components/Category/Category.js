import React from 'react';
import './Category.scss';

export const CATEGORIES = {
  'genero': 'Género',
  'paz': 'Paz',
  'protesta': 'Protesta',
  'tributaria': 'Reforma tributaria',
  'mineroenergetico': 'Energía',
  'instituciones y democracia': 'Democracia',
  'seguridad social': 'Seguridad social',
  'venezuela': 'Venezuela',
  'corrupcion': 'Corrupción',
  'educacion': 'Educación',
  'pobreza y desigualdad': 'Pobreza'
};

const Category = ( name, onClickCallback, highlighted ) => {
  // Here we decide if the button shall be highlighted or not
  let className = 'slate';

  if (highlighted == true) {
    className = 'highlighted';
  }

  return (
    <>
      <button
        id={name}
        onClick={onClickCallback}
        className={className}
      >
        CATEGORY
      </button>
    </>
  );
};

export default Category;