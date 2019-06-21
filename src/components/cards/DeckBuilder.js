import React, { Component } from "react";
import cardDB from "../../CardDB.json";
import MuuriGrid from "react-muuri";
import "./MuuriGrid.css";
import DeckCard from "./DeckCard.js";
import ReactDOM from "react-dom";
import { GoX } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import { IconContext } from "react-icons";

export default class DeckBuilder extends Component {
  state = {
    deckName: "UntitledDeck",
    currentDeck: this.props.location.state
      ? this.props.location.state.currentDeck
      : [],
    cardData: [],
    championCardQty: 0,
    spiritCardQty: 0,
    mainDeckCardQty: 0,
    shardDeckCardQty: 0,
    sideDeckCardQty: 0,
    lightTowerQty: 0,
    fireTowerQty: 0,
    airTowerQty: 0,
    waterTowerQty: 0,
    darkTowerQty: 0,
    gridUp: false,
    championCard: [],
    spiritCard: [],
    mainDeckCards: [],
    shardDeckCards: [],
    sideDeckCards: [],
    lightTowerCards: [],
    fireTowerCards: [],
    airTowerCards: [],
    waterTowerCards: [],
    darkTowerCards: [],
    deck: {
      champion: [],
      spirit: [],
      main: [],
      shard: [],
      side: [],
      towers: []
    },
    gridChildren: [],
    championGridChildren: [],
    spiritGridChildren: [],
    towersGridChildren: [],
    shardsGridChildren: [],
    sideGridChildren: [],
    counter: 0,
    gridRef: null,
    champGridRef: null,
    spiritGridRef: null,
    towerGridRef: null,
    shardsGridRef: null,
    sideGridRef: null
  };

  componentDidUpdate() {
    if (!this.state.gridUp) {
      this.state.gridChildren.forEach((child, index) => {
        this.grid.getMethod("add", this.gridElement.children[index]);
      });
      this.state.championGridChildren.forEach((child, index) => {
        this.gridChamp.getMethod("add", this.gridElement2.children[index]);
      });
      this.state.spiritGridChildren.forEach((child, index) => {
        this.gridSpirit.getMethod("add", this.gridElement3.children[index]);
      });
      this.state.towersGridChildren.forEach((child, index) => {
        this.gridTowers.getMethod("add", this.gridElement4.children[index]);
      });
      this.state.shardsGridChildren.forEach((child, index) => {
        this.gridShards.getMethod("add", this.gridElement5.children[index]);
      });
      this.state.sideGridChildren.forEach((child, index) => {
        this.gridSide.getMethod("add", this.gridElement6.children[index]);
      });
      this.setState({ gridUp: true });
    }
  }

  componentWillUnmount() {
    this.grid.getMethod("destroy"); // Required: Destroy the grid when the component is unmounted.
  }

  componentDidMount() {
    //setup card array for the grid if one is passed
    if (this.props.location.state) {
      //Working copys to be set to state later
      let copyOfCardData = cardDB.cards;
      let copyOfGridChildren = [];
      let copyOfChampionGridChildren = [];
      let copyOfSpiritGridChildren = [];
      let copyOfShardsGridChildren = [];
      let copyOfTowersGridChildren = [];
      let copyOfSideGridChildren = [];
      let x;

      this.state.currentDeck.forEach(card => {
        for (x = 0; x < parseInt(card.quantity, 10); x++) {
          if (card.type === "Champion") {
            if (this.state.championCard.length === 0) {
              this.setState({
                championCard: this.state.championCard.push(card)
              });
              copyOfChampionGridChildren.push({
                class: "box1 card-champion",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-champion",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (card.type === "Spirit") {
            if (this.state.spiritCard.length === 0) {
              this.setState({ spiritCard: this.state.spiritCard.push(card) });
              copyOfSpiritGridChildren.push({
                class: "box1 card-spirt",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-spirit",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (card.type === "Shard") {
            if (this.state.shardDeckCards.length < 10) {
              this.setState({
                shardDeckCards: this.state.shardDeckCards.push(card)
              });
              copyOfShardsGridChildren.push({
                class: "box1 card-shard",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-shard",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (card.type === "Tower") {
            if (
              this.state.lightTowerCards.length === 0 &&
              card.element === "Light"
            ) {
              this.setState({
                lightTowerCards: this.state.lightTowerCards.push(card)
              });
              copyOfTowersGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Light") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
            if (
              this.state.fireTowerCards.length === 0 &&
              card.element === "Fire"
            ) {
              this.setState({
                fireTowerCards: this.state.fireTowerCards.push(card)
              });
              copyOfTowersGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Fire") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
            if (
              this.state.airTowerCards.length === 0 &&
              card.element === "Air"
            ) {
              this.setState({
                airTowerCards: this.state.airTowerCards.push(card)
              });
              copyOfTowersGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Air") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
            if (
              this.state.waterTowerCards.length === 0 &&
              card.element === "Water"
            ) {
              this.setState({
                waterTowerCards: this.state.waterTowerCards.push(card)
              });
              copyOfTowersGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Water") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
            if (
              this.state.darkTowerCards.length === 0 &&
              card.element === "Dark"
            ) {
              this.setState({
                darkTowerCards: this.state.darkTowerCards.push(card)
              });
              copyOfTowersGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Dark") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1 card-tower",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (this.state.mainDeckCards.length < 60) {
            this.setState({
              mainDeckCards: this.state.mainDeckCards.push(card)
            });
            copyOfGridChildren.push({
              class: "box1 card-main",
              src: copyOfCardData[card.index].url,
              cardIndex: card.index
            });
          } else {
            this.setState({
              sideDeckCards: this.state.shardDeckCards.push(card)
            });
            copyOfSideGridChildren.push({
              class: "box1 card-main",
              src: copyOfCardData[card.index].url,
              cardIndex: card.index
            });
          }
        }
      });

      //update state gridChildren arrays with the values from the temporary working arrays
      this.setState({
        gridChildren: copyOfGridChildren,
        championGridChildren: copyOfChampionGridChildren,
        spiritGridChildren: copyOfSpiritGridChildren,
        shardsGridChildren: copyOfShardsGridChildren,
        towersGridChildren: copyOfTowersGridChildren,
        sideGridChildren: copyOfSideGridChildren,
        cardData: cardDB.cards
      });
    }

    //Initiate MuuriGrid objects
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });
    this.gridChamp = new MuuriGrid({
      node: this.gridElement2,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });
    this.gridSpirit = new MuuriGrid({
      node: this.gridElement3,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });
    this.gridTowers = new MuuriGrid({
      node: this.gridElement4,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });
    this.gridShards = new MuuriGrid({
      node: this.gridElement5,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });
    this.gridSide = new MuuriGrid({
      node: this.gridElement6,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        dragStartPredicate: function(item, e) {
          if (e.target.matches("svg") || e.target.matches("path")) {
            return false;
          }
          return true;
        }
      }
    });

    this.setState({
      gridRef: this.grid,
      champGridRef: this.gridChamp,
      spiritGridRef: this.gridSpirit,
      towerGridRef: this.gridTowers,
      shardsGridRef: this.gridShards,
      sideGridRef: this.gridSide
    });

    this.grid.getEvent("dragEnd");
    this.gridChamp.getEvent("dragEnd");
    this.gridSpirit.getEvent("dragEnd");
    this.gridTowers.getEvent("dragEnd");
    this.gridShards.getEvent("dragEnd");
    this.gridSide.getEvent("dragEnd");
  }

  dragPredicateFunction(item, e) {}

  removeElement(grid, index) {
    if (grid === "main") {
      console.log(this.gridElement.children);
      this.grid.getMethod("remove", this.gridElement.children[index], {
        removeElements: true
      });
      console.log(this.gridElement.children);
    }
    if (grid === "champ") {
      this.gridChamp.getMethod("remove", this.gridElement2.children[index], {
        removeElements: true
      });
    }
    if (grid === "spirit") {
      this.gridSpirit.getMethod("remove", this.gridElement3.children[index], {
        removeElements: true
      });
    }
    if (grid === "tower") {
      this.gridTowers.getMethod("remove", this.gridElement4.children[index], {
        removeElements: true
      });
    }
    if (grid === "shard") {
      this.gridShards.getMethod("remove", this.gridElement5.children[index], {
        removeElements: true
      });
    }
    if (grid === "side") {
      this.gridSide.getMethod("remove", this.gridElement6.children[index], {
        removeElements: true
      });
    }
  }

  copyElement(grid, index) {
    if (grid === "main") {
      let copy = this.state.gridChildren[index];
      let current = this.state.gridChildren;
      current.push(copy);
      this.setState({ gridChildren: current, gridUp: false });
    }
    if (grid === "shard") {
      let copy = this.gridElement5.children[index];
      this.gridShards.getMethod("add", copy);
    }
    if (grid === "side") {
      let copy = this.gridElement6.children[index];
      this.gridSide.getMethod("add", copy);
    }
    console.log(this.gridElement.children);
  }

  addElement() {
    this.grid.getMethod("add", this.gridElement.children[0]);
  }

  render() {
    return (
      <div ref={deckBuilderRef => (this.deckBuilderRef = deckBuilderRef)}>
        <div className="row">
          <div className="col deck-col ml-3">
            <div className="alert alert-secondary" role="alert">
              Champion
            </div>
            <div ref={gridElement2 => (this.gridElement2 = gridElement2)}>
              {this.state.championGridChildren.map((item, index) => {
                return (
                  <div key={index} className={`item champ-slot ${item.class}`}>
                    <div className="item-content">
                      <div className="card-deck-img-container">
                        <IconContext.Provider
                          value={{
                            color: "black",
                            className: "deck-delete-btn"
                          }}
                        >
                          <GoX
                            onClick={() => this.removeElement("champ", index)}
                          />
                        </IconContext.Provider>

                        <img
                          className={"card-deck-img"}
                          src={item.src}
                          alt={item.class}
                        ></img>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col deck-col">
            <div className="alert alert-secondary" role="alert">
              Spirit
            </div>
            <div ref={gridElement3 => (this.gridElement3 = gridElement3)}>
              {this.state.spiritGridChildren.map((item, index) => {
                return (
                  <div key={index} className={`item spirit-slot ${item.class}`}>
                    <div className="item-content">
                      <div className="card-deck-img-container">
                        <IconContext.Provider
                          value={{
                            color: "black",
                            className: "deck-delete-btn"
                          }}
                        >
                          <GoX
                            onClick={() => this.removeElement("spirit", index)}
                          />
                        </IconContext.Provider>

                        <img
                          className={"card-deck-img"}
                          src={item.src}
                          alt={item.class}
                        ></img>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col deck-col-tower">
            <div className="alert alert-secondary alert-towers" role="alert">
              Towers
            </div>
            <div className="tower-container">
              <div ref={gridElement4 => (this.gridElement4 = gridElement4)}>
                {this.state.towersGridChildren.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`item towers-slot ${item.class}`}
                    >
                      <div className="item-content">
                        <div className="card-deck-img-container">
                          <IconContext.Provider
                            value={{
                              color: "black",
                              className: "deck-delete-btn"
                            }}
                          >
                            <GoX
                              onClick={() => this.removeElement("tower", index)}
                            />
                          </IconContext.Provider>

                          <img
                            className={"card-deck-img"}
                            src={item.src}
                            alt={item.class}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-main">
            <div className="alert alert-secondary alert-main" role="alert">
              Main Deck
            </div>
            <div className="main-container">
              <div ref={gridElement => (this.gridElement = gridElement)}>
                {this.state.gridChildren.map((item, index) => {
                  return (
                    <div key={index} className={`item ${item.class}`}>
                      <div className="item-content">
                        <div className="card-deck-img-container">
                          <IconContext.Provider
                            value={{
                              color: "black",
                              className: "deck-delete-btn"
                            }}
                          >
                            <GoX
                              onClick={() => this.removeElement("main", index)}
                            />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "deck-copy-btn"
                            }}
                          >
                            <MdContentCopy
                              onClick={() => this.copyElement("main", index)}
                            />
                          </IconContext.Provider>

                          <img
                            className={"card-deck-img"}
                            src={item.src}
                            alt={item.class}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-shards">
            <div className="alert alert-secondary alert-main" role="alert">
              Shards
            </div>
            <div className="main-container">
              <div ref={gridElement5 => (this.gridElement5 = gridElement5)}>
                {this.state.shardsGridChildren.map((item, index) => {
                  return (
                    <div key={index} className={`item ${item.class}`}>
                      <div className="item-content">
                        <div className="card-deck-img-container">
                          <IconContext.Provider
                            value={{
                              color: "black",
                              className: "deck-delete-btn"
                            }}
                          >
                            <GoX
                              onClick={() => this.removeElement("shard", index)}
                            />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "deck-copy-btn"
                            }}
                          >
                            <MdContentCopy
                              onClick={() => this.copyElement("shard", index)}
                            />
                          </IconContext.Provider>

                          <img
                            className={"card-deck-img"}
                            src={item.src}
                            alt={item.class}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-side">
            <div className="alert alert-secondary alert-main" role="alert">
              Sideboard
            </div>
            <div className="main-container">
              <div ref={gridElement6 => (this.gridElement6 = gridElement6)}>
                {this.state.sideGridChildren.map((item, index) => {
                  return (
                    <div key={index} className={`item ${item.class}`}>
                      <div className="item-content">
                        <div className="card-deck-img-container">
                          <IconContext.Provider
                            value={{
                              color: "black",
                              className: "deck-delete-btn"
                            }}
                          >
                            <GoX
                              onClick={() => this.removeElement("side", index)}
                            />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "white",
                              className: "deck-copy-btn"
                            }}
                          >
                            <MdContentCopy
                              onClick={() => this.copyElement("side", index)}
                            />
                          </IconContext.Provider>

                          <img
                            className={"card-deck-img"}
                            src={item.src}
                            alt={item.class}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
