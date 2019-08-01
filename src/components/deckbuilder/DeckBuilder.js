import React, { Component } from "react";
import uniqueId from "lodash/uniqueId";
import cardDB from "../../CardDB.json";
import "./DeckBuilder.css";
import "css-reset-and-normalize";
import deckIcon from "../../deckicon.svg";
import {
  LazyLoadImage,
  LazyLoadComponent
} from "react-lazy-load-image-component";
import Tippy from "@tippy.js/react";
import DeckZone from "./DeckZone";
import { DragDropContext } from "react-beautiful-dnd";

export default class DeckBuilder extends Component {
  state = {
    deckName: "UntitledDeck",
    windowWidth: window.innerWidth,
    currentDeck: this.props.location.state
      ? this.props.location.state.currentDeck
      : [],
    cardData: [],
    testData: {
      3: {
        id: "3",
        index: "3",
        name: "Corum Blademaster",
        quantity: "3",
        type: "Unit",
        element: "Light"
      },
      4: {
        id: "4",
        index: "4",
        name: "Corum Craftsman",
        quantity: "3",
        type: "Unit",
        element: "Light"
      },
      5: {
        id: "5",
        index: "5",
        name: "Corum Lancer",
        quantity: "1",
        type: "Unit",
        element: "Light"
      },
      6: {
        id: "6",
        index: "6",
        name: "Yuki, the Lightning Flash",
        quantity: "2",
        type: "Unit",
        element: "Light"
      },
      7: {
        id: "7",
        index: "7",
        name: "Corum Rampart",
        quantity: "3",
        type: "Unit",
        element: "Light"
      },
      8: {
        id: "8",
        index: "8",
        name: "Corum Squire",
        quantity: "1",
        type: "Unit",
        element: "Light"
      },
      12: {
        id: "12",
        index: "80",
        name: "Tower of Light",
        quantity: "1",
        type: "Tower",
        element: "Light"
      }
    },
    decks: {
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
        cards: [3, 4, 5, 6, 7, 8]
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
        cards: [12]
      }
    },
    deckTitle: ""
  };

  deckTitleChange = e => {
    this.setState({ deckTitle: e.target.value });
  };

  componentWillMount() {
    //Event listener to update state value when window is resized
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: window.innerWidth });
    });
  }

  componentDidMount() {
    this.setState(state => ({
      currentDeck: Object.assign(
        {},
        ...state.currentDeck.map(card => ({
          [card.index]: {
            id: card.index,
            index: card.index,
            name: card.name,
            quantity: card.quantity,
            type: card.type,
            element: card.element
          }
        }))
      )
    }));
    /*

    ////Sort each card from the incoming deck into its designated deck zones
    this.state.currentDeck.forEach(card => {
      //If card type is X, Check if going to designate slot or sideboard
      if (card.type === "Champion" && this.state.deckChampion.length === 0) {
        this.setState(prevState => ({
          deckChampion: [...prevState.deckChampion, card]
        }));
      } else if (card.type === "Spirit" && this.state.deckSpirit.length === 0) {
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
    });
    */
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.decks[source.droppableId];
    const finish = this.state.decks[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cards);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newDeck = {
        ...start,
        cards: newCardIds
      };

      const newState = {
        ...this.state,
        decks: {
          ...this.state.decks,
          [newDeck.id]: newDeck
        }
      };

      this.setState(newState);
      return;
    }

    //Moving between decks
    const startCards = Array.from(start.cards);
    startCards.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCards
    };

    const finishCards = Array.from(finish.cards);
    finishCards.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cards: finishCards
    };

    const newState = {
      ...this.state,
      decks: {
        ...this.state.decks,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  PrintMain = breakPoint => {
    const deck = this.state.decks["deckMain"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  PrintShard = breakPoint => {
    const deck = this.state.decks["deckShard"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  PrintSide = breakPoint => {
    const deck = this.state.decks["deckSide"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  PrintChamp = breakPoint => {
    const deck = this.state.decks["deckChampion"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  PrintSpirit = breakPoint => {
    const deck = this.state.decks["deckSpirit"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  PrintTower = breakPoint => {
    const deck = this.state.decks["deckTower"];
    const cards = deck.cards.map(card => this.state.testData[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
      />
    );
  };

  render() {
    let windowWidth = this.state.windowWidth;
    let isMobile = windowWidth <= 576;
    let breakPoint =
      windowWidth < 576
        ? "xs"
        : windowWidth < 768
        ? "sm"
        : windowWidth < 992
        ? "md"
        : windowWidth < 1200
        ? "lg"
        : "xl";
    let PrintMain = this.PrintMain(breakPoint);
    let PrintShard = this.PrintShard(breakPoint);
    let PrintSide = this.PrintSide(breakPoint);
    let PrintChamp = this.PrintChamp(breakPoint);
    let PrintSpirit = this.PrintSpirit(breakPoint);
    let PrintTower = this.PrintTower(breakPoint);

    return (
      <div>
        <div className="">
          <div className="row">
            <div className="col-8 col-md-10 col-lg-8 ml-auto mr-auto mt-3 mb-2">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Deck Title:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.deckTitle}
                  onChange={this.deckTitleChange}
                />
              </div>
            </div>
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-5 ml-auto pr-1">
                {PrintChamp}
                {PrintMain}
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-5 mr-auto pl-1">
                {PrintSpirit}
                {PrintTower}
                {PrintSide}
              </div>
              <div className="col-4"></div>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
