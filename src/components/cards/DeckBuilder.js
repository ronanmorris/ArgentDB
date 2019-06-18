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
    towersGridChildren: [],
    shardsGridChildren: [],
    sideGridChildren: [],
    counter: 0
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
    console.log("mount");
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
          console.log(card.type);
          if (card.type === "Champion") {
            if (this.state.championCard.length === 0) {
              this.setState({
                championCard: this.state.championCard.push(card)
              });
              copyOfChampionGridChildren.push({
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (card.type === "Spirit") {
            if (this.state.spiritCard.length === 0) {
              this.setState({ spiritCard: this.state.spiritCard.push(card) });
              copyOfSpiritGridChildren.push({
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Light") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Fire") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Air") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Water") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
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
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            } else if (card.element === "Dark") {
              this.setState({
                sideDeckCards: this.state.sideDeckCards.push(card)
              });
              copyOfSideGridChildren.push({
                class: "box1",
                src: copyOfCardData[card.index].url,
                cardIndex: card.index
              });
            }
          } else if (this.state.mainDeckCards.length < 60) {
            this.setState({
              mainDeckCards: this.state.mainDeckCards.push(card)
            });
            copyOfGridChildren.push({
              class: "box1",
              src: copyOfCardData[card.index].url,
              cardIndex: card.index
            });
          } else {
            this.setState({
              sideDeckCards: this.state.shardDeckCards.push(card)
            });
            copyOfSideGridChildren.push({
              class: "box1",
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

      console.log(this.state.championCard);
    }

    //Initiate MuuriGrid objects
    this.grid = new MuuriGrid({
      node: this.gridElement,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });
    this.gridChamp = new MuuriGrid({
      node: this.gridElement2,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });
    this.gridSpirit = new MuuriGrid({
      node: this.gridElement3,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });
    this.gridTowers = new MuuriGrid({
      node: this.gridElement4,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });
    this.gridShards = new MuuriGrid({
      node: this.gridElement5,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });
    this.gridSide = new MuuriGrid({
      node: this.gridElement6,
      defaultOptions: {
        dragEnabled: true,
        layoutDuration: 75,
        dragSortInterval: 5,
        layout: { rounding: false }
      }
    });

    this.grid.getEvent("dragEnd");
    this.gridChamp.getEvent("dragEnd");
    this.gridSpirit.getEvent("dragEnd");
    this.gridTowers.getEvent("dragEnd");
    this.gridShards.getEvent("dragEnd");
    this.gridSide.getEvent("dragEnd");
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
