import React, { useState, useEffect } from 'react';

import Scaffold from './components/Scaffold/Scaffold';
import Selector from './components/Selector/Selector';
import { CATEGORIES } from './utils/constants';
import './App.scss';

import Modal from 'react-bootstrap/Modal';

function App() {

  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);
  const [category, setCategory] = useState(Object.keys(CATEGORIES)[0]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function renderScaffolds() {
    if (leftData.length > 0 && rightData.length > 0) {
      const leftFiltered = leftData.filter(element => element[category] === 1);
      const rightFiltered = rightData.filter(element => element[category] === 1);

      return (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <Scaffold
                data={leftFiltered}
                title="PETRO"
                leaning="left"
                filter={category}
              />
              <br />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <Scaffold
                data={rightFiltered}
                title="RODOLFO"
                leaning="right"
                filter={category}
              />
              <br />
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
            ??Qu?? dijeron en Twitter los senadores electos que cantaron su apoyo en la 2a. vuelta presidencial?
          </h2>
          <div id="credits">
            <span> HECHO POR GRUPO </span> <span id="groupName" onClick={handleShow}> #Pol??tica&Redes </span>
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                Este ejercicio fue realizado por el semillero de ciencia de datos para el an??lisis de opini??n
                p??blica del Observatorio de la Democracia de la Universidad de los Andes inspirado en la
                siguiente <a href="https://graphics.wsj.com/blue-feed-red-feed/#/president-trump">p??gina web</a>. Encuentre
                el c??digo del proyecto <a href="https://github.com/Obsdemocracia/wsj_clone">aqu??</a>.
                <hr />
                <h6> Equipo: </h6>
                <ul>
                  <li>
                    Fernando Avalos
                  </li>
                  <li>
                    Esteban Leiva
                  </li>
                  <li>
                    Andr??s Mart??nez
                  </li>
                  <li>
                    Valentina Su??rez
                  </li>
                  <li>
                    Juan Jos?? Corredor
                  </li>
                  <li>
                    Laura Fernanda Cely
                  </li>
                  <li>
                    Juan Carlos Rodr??guez Raga
                  </li>
                </ul>
              </Modal.Body>
            </Modal>
          </div>
          <hr />
        </div>
        <div className="row mb-3">
          <p>
            El pr??ximo 19 de junio Colombia elegir?? presidente. Quien sea elegido tendr?? que atender no solo a
            su agenda, sino tambi??n a las posturas relevantes para su bancada en el Congreso. Por esto, esta
            visualizaci??n divide a los senadores de acuerdo con el candidato presidencial que han declarado apoyar.
            Revisar las posturas de quienes probablemente ser??an bancada de gobierno muestra aquellas pol??ticas que
            tendr??an mayor posibilidad de concretarse en los pr??ximos cuatro a??os.
          </p>
          <hr />
          <p>
            Esta herramienta muestra los tuits y retuits que publicaron entre el 12 de enero y el 29 de mayo de 2022 los
            senadores electos al Congreso de la Rep??blica. Los tuits y retuits est??n divididos de acuerdo con tem??ticas m??s
            relevantes en la campa??a. Ellos son muestra de las agendas que promovieron y con las que fueron elegidos.
          </p>
          <hr />
          <p id="filterDescription">
            FILTRAR TUITS POR T??PICO:
          </p>
          <Selector
            chosenCategory={category}
            onClickCallback={changeCategory}
          />
        </div>
        <div></div>
        {renderScaffolds()}
      </div>
    </div>
  );
}

export default App;
