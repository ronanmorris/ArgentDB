import React, { Component } from 'react';
import cardDB from '../../CardDB.json';

export default class DeckBuilder extends Component {
    state = {
        deckName: 'UntitledDeck',
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
          champion : [],
          spirit: [],
          main: [],
          shard: [],
          side: [],
          towers: []
        }
    }

    componentDidMount() {
      this.setState({ cardData: cardDB.cards, currentDeck: this.props.location.state.currentDeck });
    }

  render() {
    let cardData = this.state.cardData;
    let currentDeck = this.state.currentDeck;
    let deckDisplay = currentDeck.map(card => (
      <h5 key={"key" + card.index.toString()}>{card.quantity}x {cardData[card.index].name}</h5>
    ))

    return (
      <div>
        {deckDisplay}
      </div>
    )
  }
}
