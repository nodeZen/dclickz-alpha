import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Landing from './containers/landing/landing';
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Landing />
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
