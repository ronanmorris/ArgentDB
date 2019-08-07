import React, { Component } from "react";
import "./DeckBuilder.css";
import "css-reset-and-normalize";
import DeckZone from "./DeckZone";
import { DragDropContext } from "react-beautiful-dnd";

export default class DeckBuilder extends Component {
  state = {
    deckName: "UntitledDeck",
    windowWidth: window.innerWidth,
    currentDeck: this.props.currentDeck,
    decks: this.props.decks,
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

    let currentDeck = this.state.currentDeck;
    let decks = this.state.decks;
    Object.entries(currentDeck).forEach(([key, val]) => {
      if (val.deck === "unsorted") {
        if (val.type === "Champion") {
          val.deck = "deckChampion";
          decks.deckChampion.cards.push(key);
        } else if (val.type === "Spirit") {
          val.deck = "deckSpirit";
          decks.deckSpirit.cards.push(key);
        } else if (val.type === "Tower") {
          val.deck = "deckTower";
          decks.deckTower.cards.push(key);
        } else if (val.type === "Shard") {
          val.deck = "deckShard";
          decks.deckShard.cards.push(key);
        } else {
          val.deck = "deckMain";
          decks.deckMain.cards.push(key);
        }
      }
    });
    this.props.updateDeck(currentDeck);
    this.props.updateDeckOrder(decks);
  }

  componentWillUnmount() {}

  componentDidMount() {}

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
      this.props.updateDeckOrder(newState.decks);
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
    this.props.updateDeckOrder(newState.decks);
  };

  increaseQuantity = (deck, index) => {
    let currentDeck = this.state.currentDeck;
    let decks = this.state.decks;
    let id = decks[deck].cards[index];
    currentDeck[id].quantity = (
      parseInt(currentDeck[id].quantity) + 1
    ).toString();
    this.props.updateDeck(currentDeck);
  };

  decreaseQuantity = (deck, index) => {
    let currentDeck = this.state.currentDeck;
    let decks = this.state.decks;
    let id = decks[deck].cards[index];
    if (currentDeck[id].quantity > 0) {
      currentDeck[id].quantity = (
        parseInt(currentDeck[id].quantity) - 1
      ).toString();
      this.props.updateDeck(currentDeck);
    }
  };

  removeFromDeck = (deck, index) => {
    let currentDeck = this.state.currentDeck;
    let decks = this.state.decks;
    let id = decks[deck].cards[index];
    decks[deck].cards.splice(index, 1);
    delete currentDeck[id];
    this.props.updateDeckOrder(decks);
    this.props.updateDeck(currentDeck);
  };

  copyToSideBoard = (deck, index) => {
    let currentDeck = this.state.currentDeck;
    let decks = this.state.decks;
    let cardId = decks[deck].cards[index];
    let newIndex = Object.keys(currentDeck).length;
    currentDeck[newIndex] = JSON.parse(JSON.stringify(currentDeck[cardId]));
    currentDeck[newIndex].id = newIndex.toString();
    currentDeck[newIndex].quantity = "1";
    decks.deckSide.cards.push(newIndex.toString());
    this.props.updateDeckOrder(decks);
    this.props.updateDeck(currentDeck);
  };

  PrintMain = breakPoint => {
    const deck = this.state.decks["deckMain"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  PrintShard = breakPoint => {
    const deck = this.state.decks["deckShard"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  PrintSide = breakPoint => {
    const deck = this.state.decks["deckSide"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  PrintChamp = breakPoint => {
    const deck = this.state.decks["deckChampion"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  PrintSpirit = breakPoint => {
    const deck = this.state.decks["deckSpirit"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  PrintTower = breakPoint => {
    const deck = this.state.decks["deckTower"];
    const cards = deck.cards.map(card => this.state.currentDeck[card]);
    let amount = cards
      .map(card => card.quantity)
      .reduce((a, b) => a + Number(b), 0);
    return (
      <DeckZone
        deck={deck}
        cards={cards}
        breakPoint={breakPoint}
        amount={amount}
        increase={this.increaseQuantity.bind(this)}
        decrease={this.decreaseQuantity.bind(this)}
        remove={this.removeFromDeck.bind(this)}
        copySB={this.copyToSideBoard.bind(this)}
      />
    );
  };

  render() {
    let windowWidth = this.state.windowWidth;
    // let isMobile = windowWidth <= 576;
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
                {PrintShard}
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
