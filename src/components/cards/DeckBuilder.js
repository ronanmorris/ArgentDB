import React, { Component } from "react";
import cardDB from "../../CardDB.json";
import MuuriGrid from "react-muuri";
import "./MuuriGrid.css";
import DeckCard from "./DeckCard.js";

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
    shardsGridChildren: [],
    towersGridChildren: [],
    sideGridChildren: [],
    counter: 0
  };

  componentDidUpdate() {
    if (!this.state.gridUp) {
      this.state.gridChildren.forEach((child, index) => {
        this.grid.getMethod("add", this.gridElement.children[index]);
      });
      this.setState({ gridUp: true });
    }
  }

  componentWillUnmount() {
    this.grid.getMethod("destroy"); // Required: Destroy the grid when the component is unmounted.
  }

  componentDidMount() {
    console.log("mount");
    //setup card array for the grid if one is passed
    if (this.props.location.state) {
      let copyOfCardData = cardDB.cards;
      let copyOfGridChildren = [];
      let x;
      this.state.currentDeck.forEach(card => {
        for (x = 0; x < parseInt(card.quantity, 10); x++) {
          copyOfGridChildren.push({
            class: "box1",
            src: copyOfCardData[card.index].url,
            cardIndex: card.index
          });
        }
      });
      this.setState({
        gridChildren: copyOfGridChildren,
        cardData: cardDB.cards
      });

      this.state.currentDeck.forEach(card => {
        console.log(card.type);
        if (card.type === "Champion") {
          if (this.state.championCard.length === 0) {
            this.setState({ championCard: this.state.championCard.push(card) });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
        } else if (card.type === "Spirit") {
          if (this.state.spiritCard.length === 0) {
            this.setState({ spiritCard: this.state.spiritCard.push(card) });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
        } else if (card.type === "Shard") {
          if (this.state.shardDeckCards.length < 10) {
            this.setState({
              shardDeckCards: this.state.shardDeckCards.push(card)
            });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
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
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
          if (
            this.state.fireTowerCards.length === 0 &&
            card.element === "Fire"
          ) {
            this.setState({
              fireTowerCards: this.state.fireTowerCards.push(card)
            });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
          if (this.state.airTowerCards.length === 0 && card.element === "Air") {
            this.setState({
              airTowerCards: this.state.airTowerCards.push(card)
            });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
          if (
            this.state.waterTowerCards.length === 0 &&
            card.element === "Water"
          ) {
            this.setState({
              waterTowerCards: this.state.waterTowerCards.push(card)
            });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
          if (
            this.state.darkTowerCards.length === 0 &&
            card.element === "Dark"
          ) {
            this.setState({
              darkTowerCards: this.state.darkTowerCards.push(card)
            });
          } else {
            this.setState({
              sideDeckCards: this.state.sideDeckCards.push(card)
            });
          }
        } else if (this.state.mainDeckCards.length < 60) {
          this.setState({
            mainDeckCards: this.state.mainDeckCards.push(card)
          });
        } else
          this.setState({
            sideDeckCards: this.state.shardDeckCards.push(card)
          });
      });
      console.log(this.state.championCard);
    }

    //Initiate MuuriGrid object
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });

    this.grid.getEvent("dragEnd");
  }

  removeElement() {
    // An example of how to use `getMethod()` to remove an element from the grid.
    if (this.gridElement && this.gridElement.children.length) {
      this.grid.getMethod("remove", this.gridElement.children[0], {
        removeElements: true
      });
    }
  }

  addElement() {
    this.grid.getMethod("add", this.gridElement.children[0]);
  }

  render() {
    return (
      <div>
        Champion:
        <div ref={gridElement2 => (this.gridElement2 = gridElement2)}>
          {this.state.championGridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        Spirit:
        <div ref={gridElement3 => (this.gridElement3 = gridElement3)}>
          {this.state.spiritGridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        Main:
        <div ref={gridElement => (this.gridElement = gridElement)}>
          {this.state.gridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        Towers:
        <div ref={gridElement4 => (this.gridElement4 = gridElement4)}>
          {this.state.towersGridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        Shards:
        <div ref={gridElement5 => (this.gridElement5 = gridElement5)}>
          {this.state.shardsGridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
        Sideboard:
        <div ref={gridElement6 => (this.gridElement6 = gridElement6)}>
          {this.state.sideGridChildren.map((item, index) => {
            return (
              <div key={index} className={`item ${item.class}`}>
                <div className="item-content">
                  <img
                    className={"card-deck-img"}
                    src={item.src}
                    alt={item.class}
                  ></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
