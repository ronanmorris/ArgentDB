import React, { useEffect, Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ModalContainer, ModalLink } from "react-router-modal";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Cards from "./components/cards/Cards.js";

import backgroundImage from "./pattern.png";
import DeckBuilder from "./components/deckbuilder/DeckBuilder";

class App extends Component {
  constructor() {
    super();

    const deckExists = localStorage.getItem("currentDeck");
    let deckJSON;
    if (deckExists) {
      deckJSON = JSON.parse(deckExists);
    }

    const deckOrderExists = localStorage.getItem("deckOrder");
    let deckOrderJSON;
    if (deckOrderExists) {
      deckOrderJSON = JSON.parse(deckOrderExists);
    }

    this.state = {
      currentDeck: deckExists ? deckJSON : {},
      decks: deckOrderExists
        ? deckOrderJSON
        : {
            deckChampion: {
              id: "deckChampion",
              title: "Champion",
              cards: []
            },
            deckSpirit: {
              id: "deckSpirit",
              title: "Spirit",
              cards: []
            },
            deckMain: {
              id: "deckMain",
              title: "Main Deck",
              cards: []
            },
            deckShard: {
              id: "deckShard",
              title: "Shard Deck",
              cards: []
            },
            deckSide: {
              id: "deckSide",
              title: "Side Deck",
              cards: []
            },
            deckTower: {
              id: "deckTower",
              title: "Towers",
              cards: []
            }
          }
    };
  }

  updateDeck = newDeck => {
    this.setState({
      currentDeck: newDeck
    });
    localStorage.setItem("currentDeck", JSON.stringify(newDeck));
  };

  updateDeckBuilderDecks = newDecks => {
    this.setState({
      decks: newDecks
    });
    localStorage.setItem("deckOrder", JSON.stringify(newDecks));
  };

  render() {
    document.title = "Argent DB";
    console.log("Stae Deck", this.state.currentDeck);
    console.log("State Deck order", this.state.decks);
    return (
      <BrowserRouter>
        <div>
          <div className="content">
            <div
              className="App"
              style={{ background: `url(${backgroundImage})` }}
            >
              <Route path="/" component={NavBar} />
              <div className="container">
                <Switch>
                  <Route
                    path="/builder"
                    render={props => (
                      <DeckBuilder
                        {...props}
                        currentDeck={this.state.currentDeck}
                        updateDeck={this.updateDeck.bind(this)}
                        decks={this.state.decks}
                        updateDeckOrder={this.updateDeckBuilderDecks.bind(this)}
                      />
                    )}
                  />
                  <Route
                    path="/"
                    render={props => (
                      <Dashboard
                        {...props}
                        currentDeck={this.state.currentDeck}
                        updateDeck={this.updateDeck.bind(this)}
                      />
                    )}
                  />
                </Switch>

                <ModalLink path="/cards/:cardIndex" component={Cards} />
              </div>
            </div>
          </div>
          <footer>
            <span className="nav-link">
              test All Images, Art and Card information are the properties and
              copyright of Alter Reality, LLC.
            </span>
            <span className="nav-link">
              This is a fan made webiste. This website is in no way affiliated
              with, endorsed by, associated with or in any way officially
              connected with, Alter Reality, LLC. or any of their realated
              affiliates or brands
            </span>
          </footer>
          <ModalContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
