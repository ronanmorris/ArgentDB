import React, { Component } from 'react';
import cardData from '../../CardDB.json';

export default class DeckBuilder extends Component {
    state = {
        deckName: 'UntitledDeck',
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
    }

  render() {
    
    return (
      <div>
          
      </div>
    )
  }
}
