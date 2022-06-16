import React, { useState, useEffect } from 'react';

import './App.css';
import Scaffold from './components/Scaffold/Scaffold';

function App() {

  const categorias = {
    'genero': 'Genero',
    'paz': 'Paz',
    'protesta': 'Protesta',
    'tributaria': 'Tributaria',
    'mineroenergetico': 'Mineria y Energia',
    'instituciones y democracia': 'Instituciones y Democracia',
    'seguridad social': 'Seguridad Social',
    'venezuela': 'Venezuela',
    'corrupcion': 'Corrupcion',
    'educacion': 'Educacion',
    'pobreza y desigualdad': 'Pobreza y Desigualdad'
  };

  const [data, setData] = useState(null);
  const [categoria, setCategoria] = useState(Object.keys(categorias)[0]);


  useEffect(() => {
    fetch('https://gist.githubusercontent.com/favalosdev/be710f1fc60ff42ce8d3c59171f23c1b/raw/25cea926d46d7dc9e70def4f699c0437e04fb1c5/reduced_test_tweets.json')
      .then((response) => {
        response.json()
          .then((data) => {
            setData(data);
          })
          .catch((e) => {
            console.log('error json', e);
          });
      })
      .catch((e) => {
        console.log('error fetch', e);
      });
  }, []);

  const cambiarCategoria = event => {
    setCategoria(event.target.id);
  };

  function show() {
    if (data) {
      return (
        <div className='row'>
          <div className='col-6 px-1'>
            <Scaffold data={data} filter={categoria} column={'petro'} title={'Petristas'}/>
          </div>
          <div className='col-6 px-1'>
            <Scaffold data={data} filter={categoria} column={'rodolfo'} title={'Rodolfistas'}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='row'>
          <h3>Accediendo a la base de datos...</h3>
        </div>
      );
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='row my-2'>
          <h1>Observatorio de la democracia</h1>
        </div>
        <div className='row mb-3'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="navbar-brand">Categoria</div>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {Object.keys(categorias).map((category, idx) => {
                    if (category == categoria) {
                      return (
                        <li key={idx} className="nav-item">
                          <button className="nav-link active btn-outline-light border-0 link-like-active" onClick={cambiarCategoria} id={category}>{categorias[category]}</button>
                        </li>
                      );
                    }
                    else {
                      return (
                        <li key={idx} className="nav-item">
                          <button className="nav-link active btn-outline-light border-0 link-like" onClick={cambiarCategoria} id={category}>{categorias[category]}</button>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </nav>

        </div>
        {show()}
      </div>
    </div>
  );
}

export default App;
