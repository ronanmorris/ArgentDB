import React, { Component } from "react";
import uniqueId from "lodash/uniqueId";
import cardDB from "../../CardDB.json";
import "./DeckBuilder.css";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import {
  LazyLoadImage,
  LazyLoadComponent
} from "react-lazy-load-image-component";
import Tippy from "@tippy.js/react";

const SortableItem = sortableElement(({ value, index }) => (
  <div className="deck-card-holder">
    {console.log(index)}
    <img
      className="deck-card"
      src={cardDB.cards[value].url}
      alt={"card index of " + value}
    />
  </div>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

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
    deckChampion: [],
    deckSpirit: [],
    deckMain: [],
    deckShard: [],
    deckSide: [],
    deckLightTower: [],
    deckFireTower: [],
    deckAirTower: [],
    deckWaterTower: [],
    deckDarkTower: [],
    selectedItems: []
  };

  onSortEndMain = ({ oldIndex, newIndex }) => {
    this.setState(({ deckMain }) => ({
      deckMain: arrayMove(deckMain, oldIndex, newIndex)
    }));
  };

  onSortEndShard = ({ oldIndex, newIndex }) => {
    this.setState(({ deckShard }) => ({
      deckShard: arrayMove(deckShard, oldIndex, newIndex)
    }));
  };

  componentDidMount() {
    ////Sort each card from the incoming deck into its designated deck zones
    this.state.currentDeck.forEach(card => {
      //Working copy of deck
      let x;
      //For each card passed
      for (x = 0; x < parseInt(card.quantity, 10); x++) {
        //If card type is X, Check if going to designate slot or sideboard
        if (card.type === "Champion" && this.state.deckChampion.length === 0) {
          this.setState(prevState => ({
            deckChampion: [...prevState.deckChampion, card]
          }));
        } else if (
          card.type === "Spirit" &&
          this.state.deckSpirit.length === 0
        ) {
          this.setState(prevState => ({
            deckSpirit: [...prevState.deckSpirit, card]
          }));
        } else if (card.type === "Shard" && this.state.deckShard.length < 10) {
          this.setState(prevState => ({
            deckShard: [...prevState.deckShard, card]
          }));
        } else if (
          card.type === "Tower" &&
          this.state.deckLightTower.length === 0 &&
          card.element === "Light"
        ) {
          this.setState(prevState => ({
            deckLightTower: [...prevState.deckLightTower, card]
          }));
        } else if (
          card.type === "Tower" &&
          this.state.deckFireTower.length === 0 &&
          card.element === "Fire"
        ) {
          this.setState(prevState => ({
            deckFireTower: [...prevState.deckFireTower, card]
          }));
        } else if (
          card.type === "Tower" &&
          this.state.deckAirTower.length === 0 &&
          card.element === "Air"
        ) {
          this.setState(prevState => ({
            deckAirTower: [...prevState.deckAirTower, card]
          }));
        } else if (
          card.type === "Tower" &&
          this.state.deckWaterTower.length === 0 &&
          card.element === "Water"
        ) {
          this.setState(prevState => ({
            deckWaterTower: [...prevState.deckWaterTower, card]
          }));
        } else if (
          card.type === "Tower" &&
          this.state.deckDarkTower.length === 0 &&
          card.element === "Dark"
        ) {
          this.setState(prevState => ({
            deckDarkTower: [...prevState.deckDarkTower, card]
          }));
        } else if (
          (card.type === "Unit" || "Augment" || "Spell") &&
          this.state.deckMain.length < 60
        ) {
          this.setState(prevState => ({
            deckMain: [...prevState.deckMain, card]
          }));
        } else {
          this.setState(prevState => ({
            deckSide: [...prevState.deckSide, card]
          }));
        }
      }
    });

    this.setState(state => ({
      deckChampion: state.deckChampion.map(card => card.index),
      deckSpirit: state.deckSpirit.map(card => card.index),
      deckMain: state.deckMain.map(card => card.index),
      deckShard: state.deckShard.map(card => card.index),
      deckShard: state.deckShard.map(card => card.index),
      deckAirTower: state.deckAirTower.map(card => card.index),
      deckFireTower: state.deckFireTower.map(card => card.index),
      deckLightTower: state.deckLightTower.map(card => card.index),
      deckWaterTower: state.deckWaterTower.map(card => card.index),
      deckDarkTower: state.deckDarkTower.map(card => card.index)
    }));
  }

  render() {
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
              {this.state.deckMain ? (
                <SortableContainer onSortEnd={this.onSortEndMain} axis="xy">
                  {this.state.deckMain.map((value, index) => (
                    <SortableItem
                      key={`item-${index}`}
                      index={index}
                      value={value}
                      deck={"main"}
                    />
                  ))}
                </SortableContainer>
              ) : null}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col ml-3 deck-col-shards">
            <div className="alert alert-secondary alert-main" role="alert">
              Shards
            </div>
            <div className="main-container">
              {this.state.deckShard ? (
                <SortableContainer onSortEnd={this.onSortEndShard} axis="xy">
                  {this.state.deckShard.map((value, index) => (
                    <SortableItem
                      key={`item-${index}`}
                      index={index}
                      value={value}
                    />
                  ))}
                </SortableContainer>
              ) : null}
            </div>
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
