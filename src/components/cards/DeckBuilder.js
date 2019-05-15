import React, { Component } from 'react'

export default class DeckBuilder extends Component {
    state = {
        currentDeck: []
    }

    componentDidMount() {
        const currentDeck = this.props.currentDeck;
        this.setState({currentDeck})
    }


  render() {
    return (
      <div className="row">
        
      </div>
    )
  } 
}
