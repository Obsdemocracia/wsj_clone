import React, { useState, useEffect } from 'react';

import './App.css';
import Scaffold from './components/Scaffold/Scaffold';
import Navbar from './components/Navbar/Navbar';

function App() {

  const CATEGORIES = {
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

  const [data, setData] = useState([]);

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
              title={'Petristas'}/>
          </div>
          <div className="col-6 px-1">
            <Scaffold
              data={rightData}
              filter={chosenCategory}
              title={'Rodolfistas'}/>
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
              <Navbar/>
            </div>
          </nav>
        </div>
        {show()}
      </div>
    </div>
  );
}

export default App;
