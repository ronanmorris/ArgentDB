import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScrollButton from './ScrollButton.js';



export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top mb-2">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item-active">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item-active">
                <Link to="/builder" className="nav-link">Deck Builder</Link>
              </li>
            </ul> 
            <span className="navbar-brand ml-auto mr-auto">Argent DB</span>
            <span className="navbar-text ml-auto">argentdb@gmail.com</span>     
        </nav>
        <ScrollButton scrollStepInPx="100" delayInMs="16.66"/>
      </div>
    )
  }
}


