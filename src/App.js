import React from 'react';

import './App.css';
import Scaffold from './components/Scaffold/Scaffold';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row my-2">
          <h1>Observatorio de la democracia</h1>
        </div>
        <div className="row">
          <div className="col-6 px-1">
            <Scaffold odd={true} />
          </div>
          <div className="col-6 px-1">
            <Scaffold odd={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
