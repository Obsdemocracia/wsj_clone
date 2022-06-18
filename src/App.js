import React, { useState, useEffect } from 'react';

import Scaffold from './components/Scaffold/Scaffold';
import Selector from './components/Selector/Selector';
import { CATEGORIES } from './utils/constants';
import './App.scss';

function App() {

  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [category, setCategory] = useState(Object.keys(CATEGORIES)[0]);

  const changeCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    fetch('https://obsdemocracia.s3.amazonaws.com/tweetsv5.json')
      .then((response) => {
        response.json()
          .then((data) => {
            setLeftData(data.filter(element => element['apoyo'] === 'petro'));
            setRightData(data.filter(element => element['apoyo'] === 'rodolfo'));
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
    if (leftData.length > 0 && rightData.length > 0) {
      const leftFiltered = leftData.filter(element => element[category] === 1);
      const rightFiltered = rightData.filter(element => element[category] === 1);

      return (
        <>
          <div className="row">
            <div className="col-6 pl-1 ml-2">
              <Scaffold
                data={leftFiltered}
                title="PETRO"
                leaning="left"
                filter={category}
              />
            </div>
            <div className="col-6 px-1 mr-2">
              <Scaffold
                data={rightFiltered}
                title="RODOLFO"
                leaning="right"
                filter={category}
              />
            </div>
          </div>
        </>
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
          <h2 id="mainTitle">
            ¿Qué dijeron en Twitter los senadores electos que cantaron su apoyo en la 2a. vuelta presidencial?
          </h2>
        </div>
        <div className="row mb-3">
          <p>
            El próximo 19 de junio Colombia elegirá presidente. Quien sea elegido tendrá que atender no solo a
            su agenda, sino también a las posturas relevantes para su bancada en el Congreso. Por esto, esta
            visualización divide a los senadores de acuerdo con el candidato presidencial que han declarado apoyar.
            Revisar las posturas de quienes probablemente serían bancada de gobierno muestra aquellas políticas que
            tendrían mayor posibilidad de concretarse en los próximos cuatro años.
          </p>
          <hr/>
          <p>
            Esta herramienta muestra los tuits que publicaron entre el 12 de enero y el 29 de mayo de 2022 los
            senadores electos al Congreso de la República. Los tuits están divididos de acuerdo con temáticas más
            relevantes en la campaña. Ellos son muestra de las agendas que promovieron y con las que fueron elegidos. 
          </p>
          <hr/>
          <p id="filterDescription">
            FILTRAR TUITS POR TÓPICO:
          </p>
          <Selector
            chosenCategory={category}
            onClickCallback={changeCategory}
          />
        </div>
        <div></div>
        {show()}
      </div>
    </div>
  );
}

export default App;
