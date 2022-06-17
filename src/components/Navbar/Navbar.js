import React, { useState } from 'react';

// Pending: just for readability, nothing else

export const CATEGORIES = {
  'genero': 'Género',
  'paz': 'Paz',
  'protesta': 'Protesta',
  'tributaria': 'Reforma tributaria',
  'mineroenergetico': 'Minería y energía',
  'instituciones y democracia': 'Instituciones y democracia',
  'seguridad social': 'Seguridad social',
  'venezuela': 'Venezuela',
  'corrupcion': 'Corrupción',
  'educacion': 'Educación',
  'pobreza y desigualdad': 'Pobreza y desigualdad'
};

const Navbar = ( chosenCategory, changeCategory ) => {

  return (
    <>
      <div className="navbar-brand"> Categoria </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {Object.keys(CATEGORIES).map((category, idx) => {
            let active = '';

            if (category === chosenCategory) {
              active = '-active';
            }

            return (
              <li key={idx} className="nav-item">
                <button
                  className={`nav-link active btn-outline-light border-0 link-like${active}`}
                  onClick={() => changeCategory}
                  id={category}>
                  {CATEGORIES[category]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
