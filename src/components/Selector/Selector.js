import React from 'react';
import './Selector.scss';
import Category from '../Category/Category';
import { CATEGORIES } from '../../utils/constants';

const Navbar = ({ chosenCategory, onClickCallback }) => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light" >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav justify-content-center">
              {Object.keys(CATEGORIES).map((category, idx) => {
                let highlighted = false;

                if (category === chosenCategory) {
                  highlighted = true;
                }

                return (
                  <li key={idx} className="nav-item">
                    <Category
                      name={category}
                      highlighted={highlighted}
                      onClickCallback={onClickCallback}
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
