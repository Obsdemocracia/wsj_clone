import React, { useState, useEffect } from 'react';

import Scaffold from './components/Scaffold/Scaffold';
import Navbar from './components/Navbar/Navbar';
import { CATEGORIES } from './components/Category/Category';
import './App.scss';

function App() {

  const [data, setData] = useState([]);
  const [chosenCategory, chooseCategory] = useState(Object.keys(CATEGORIES)[0]);

  const changeCategory = event => {
    chooseCategory(event.target.id);
  };

  useEffect(() => {
    fetch('https://obsdemocracia.s3.amazonaws.com/tweetsv5.json')
      .then((response) => {
        response.json()
          .then((data) => {
            setData(data);
          })
          .catch((e) => {
            console.log('Error while parsing json', e);
          });
      })
      .catch((e) => {
        console.log('Error while fetching data', e);
      });
  }, []);

  function show() {
    if (data.length > 0) {
      const leftData = data.filter(element => element['apoyo'] === 'petro');
      const rightData = data.filter(element => element['apoyo'] === 'rodolfo');

      return (
        <div className="row">
          <div className="col-6 px-1">
            <Scaffold
              data={leftData}
              filter={chosenCategory}
              title="PETRO"
              leaning="left"
            />
          </div>
          <div className="col-6 px-1">
            <Scaffold
              data={rightData}
              filter={chosenCategory}
              title="RODOLFO"
              leaning="right"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <h3>Accediendo a la base de datos...</h3>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row my-2">
          <h1>Observatorio de la democracia</h1>
        </div>
        <div className="row mb-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Navbar
                chosenCategory={chosenCategory}
                changeCategory={changeCategory}
              />
            </div>
          </nav>
        </div>
        {show()}
      </div>
    </div>
  );
}

export default App;
