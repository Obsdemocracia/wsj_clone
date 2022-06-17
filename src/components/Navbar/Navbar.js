import React, { useState } from 'react';
import './Navbar.scss';
import Category from '../Category/Category';

import { CATEGORIES } from '../Category/Category';

// Pending: just for readability, nothing else
const Navbar = ( chosenCategory, onClickCallback ) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {Object.keys(CATEGORIES).map((category, idx) => {
                let highlighted = false;

                if (category == chosenCategory) {
                  highlighted = true;
                }

                return (
                  <li key={idx} className="nav-item">
                    <Category
                      name={category}
                      onClickCallback={onClickCallback}
                      highlighted={highlighted}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
