import React, { Component } from "react";
import cardDB from "../../CardDB.json";
import MuuriGrid from "react-muuri";
import "./MuuriGrid.css";

export default class DeckBuilder extends Component {
  state = {
    deckName: "UntitledDeck",
    currentDeck: [],
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
    championCard: [],
    spiritCard: [],
    mainDeckCards: [],
    shardDeckCards: [],
    sideDeckCards: [],
    towerCards: [],
    deck: {
      champion: [],
      spirit: [],
      main: [],
      shard: [],
      side: [],
      towers: []
    }
  };

  componentDidMount() {
    if (this.props.location.state){
      this.setState({
        cardData: cardDB.cards,
        currentDeck: this.props.location.state.currentDeck
      });
    }
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true ,
        layoutDuration: 75,
        dragSortInterval: 5
      }
    });

    this.grid.getEvent('dragEnd');
  }

  removeElement () {
    // An example of how to use `getMethod()` to remove an element from the grid.
    if (this.gridElement && this.gridElement.children.length) {
      this.grid.getMethod('remove', this.gridElement.children[0], {removeElements: true});
    }
  }

  render() {
    let cardData = this.state.cardData;
    let currentDeck = this.state.currentDeck;
    let deckDisplay = currentDeck.map(card => (
      <h5 key={"key" + card.index.toString()}>
        {card.quantity}x {cardData[card.index].name}
      </h5>
    ));

    return (
      <div>
        {/* Assign a ref to the grid container so the virtual DOM will ignore it for now (WIP). */}
        <div ref={gridElement => this.gridElement = gridElement}>
          {/* Required: `item` and `item-content` classNames */}
          <div className="item box1">
            <div className="item-content">
              Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
          <div className="item box2">
            <div className="item-content">
            Card
            </div>
          </div>
        </div>
        <button
          className="button"
          onClick={() => this.removeElement()}
        >
          Remove 1st Element
        </button>
      </div>
    );
  }
}
