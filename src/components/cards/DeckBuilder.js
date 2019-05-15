import React, { Component } from 'react'

export default class DeckBuilder extends Component {
    state = {
        deckName: 'UntitledDeck'
    }

    componentDidMount() {
        console.log(this.props.location.state.currentDeck);
    }

  render() {
    
    return (
      <div>
          
      </div>
    )
  }
}
