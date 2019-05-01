import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ModalContainer, ModalLink } from 'react-router-modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import NavBar from "./components/layout/NavBar";
import Dashboard from './components/layout/Dashboard';
import Cards from './components/cards/Cards.js';

import backgroundImage from './pattern.png';

class App extends Component {
  render() {
    document.title = "Argent DB";
    return (
      <Router>
        <div>
          <div className="content">
            <div className="App" style={{background: `url(${backgroundImage})`}}>
              <Route exact path="/" component={NavBar} />
              <div className="container">
                <Route path="/" component={Dashboard} />
                <ModalLink path="/cards/:cardIndex" component={Cards} />
              </div>
            </div>
          </div>
          <footer>
            <span className="nav-link">All Images, Art and Card information are the properties and copyright of Alter Reality, LLC.</span>
            <span className="nav-link">This is a fan made webiste. This website is in no way affiliated with, endorsed by, associated with or in any way officially connected with, Alter Reality, LLC. or any of their realated affiliates or brands</span>
          </footer>
          <ModalContainer />
        </div>
          
      </Router>
      
    );
  }
}

export default App;
