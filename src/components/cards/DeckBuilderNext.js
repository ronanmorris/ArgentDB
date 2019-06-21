import React, { Component } from "react";
import uniqueId from "lodash/uniqueId";
import cardDB from "../../CardDB.json";
import ReactSortable from "react-sortablejs";
import "./DeckBuilder.css";
import {
  LazyLoadImage,
  LazyLoadComponent
} from "react-lazy-load-image-component";

export default class DeckBuilderNext extends Component {
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
      lightTower: [],
      fireTower: [],
      airTower: [],
      waterTower: [],
      darkTower: []
    }
  };

  componentDidMount() {
    let temp;
    ////Sort each card from the incoming deck into its designated deck zones
    this.state.currentDeck.forEach(card => {
      //Working copy of deck
      temp = this.state.deck;
      let x;
      //For each card passed
      for (x = 0; x < parseInt(card.quantity, 10); x++) {
        //If card type is X, Check if going to designate slot or sideboard
        if (card.type === "Champion" && this.state.deck.champion.length === 0) {
          temp.champion.push(card);
        } else if (
          card.type === "Spirit" &&
          this.state.deck.spirit.length === 0
        ) {
          temp.spirit.push(card);
        } else if (card.type === "Shard" && this.state.deck.shard.length < 10) {
          temp.shard.push(card);
        } else if (
          card.type === "Tower" &&
          this.state.deck.lightTower.length === 0 &&
          card.element === "Light"
        ) {
          temp.lightTower.push(card);
        } else if (
          card.type === "Tower" &&
          this.state.deck.fireTower.length === 0 &&
          card.element === "Fire"
        ) {
          temp.fireTower.push(card);
        } else if (
          card.type === "Tower" &&
          this.state.deck.airTower.length === 0 &&
          card.element === "Air"
        ) {
          temp.airTower.push(card);
        } else if (
          card.type === "Tower" &&
          this.state.deck.waterTower.length === 0 &&
          card.element === "Water"
        ) {
          temp.waterTower.push(card);
        } else if (
          card.type === "Tower" &&
          this.state.deck.darkTower.length === 0 &&
          card.element === "Dark"
        ) {
          temp.darkTower.push(card);
        } else if (
          (card.type === "Unit" || "Augment" || "Spell") &&
          this.state.deck.main.length < 60
        ) {
          temp.main.push(card);
        } else {
          temp.side.push(card);
        }
        //Push to state, to be pulled again in next iteration of the loop
        this.setState({
          deck: temp
        });
      }
    });

    ////change deck into numbers representing the index of the cards.
    //For each [key, value] pair in the deck, representing each deck zone
    for (let [key, value] of Object.entries(this.state.deck)) {
      //working copy of deck from state
      let temp = this.state.deck;
      let holder;
      //Iterate each deck zone, replacing each card object with its index, as a number
      value.forEach((cardInDeck, index, deckArray) => {
        deckArray[index] = cardInDeck.index;
        holder = deckArray;
      });
      //Replace undefined with empty array
      if (typeof holder === "undefined") {
        holder = [];
      }
      //update state
      temp[key] = holder;
      this.setState({ deck: temp });
    }
  }

  render() {
    const PrintMain =
      this.state.deck.main.length > 0
        ? this.state.deck.main.map(cardIndex => (
            <div
              className={"deck-card-holder"}
              key={uniqueId()}
              data-id={cardIndex}
            >
              <img
                className="deck-card"
                src={cardDB.cards[cardIndex].url}
                alt={"card index of " + cardIndex}
              />
            </div>
          ))
        : null;

    return (
      <div>
        <div className="row">
          <div className="col deck-col ml-3">
            <div className="alert alert-secondary" role="alert">
              Champion
            </div>
          </div>
          <div className="col deck-col">
            <div className="alert alert-secondary" role="alert">
              Spirit
            </div>
          </div>
          <div className="col deck-col-tower">
            <div className="alert alert-secondary alert-towers" role="alert">
              Towers
            </div>
            <div className="tower-container"></div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-main">
            <div className="alert alert-secondary alert-main" role="alert">
              Main Deck
            </div>
            <div className="main-container">
              <ReactSortable
                options={{
                  animation: 50,
                  swapThreshold: 0.001,
                  direction: "horizontal",
                  invertSwap: true
                }}
                tag="div"
                onChange={(order, sortable, evt) => {
                  let temp = this.state.deck;
                  temp.main = order;
                  this.setState({ deck: temp });
                }}
              >
                {PrintMain}
              </ReactSortable>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-shards">
            <div className="alert alert-secondary alert-main" role="alert">
              Shards
            </div>
            <div className="main-container"></div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-side">
            <div className="alert alert-secondary alert-main" role="alert">
              Sideboard
            </div>
            <div className="main-container"></div>
          </div>
        </div>
      </div>
    );
  }
}
