import React from 'react';

import './App.css';
import Scaffold from './components/Scaffold/Scaffold';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <Scaffold odd={true}/>
          </div>
          <div className="col">
            <Scaffold odd={false}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
