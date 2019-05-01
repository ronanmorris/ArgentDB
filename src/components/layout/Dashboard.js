import React, { Component } from 'react'

import CardList from '../cards/CardList';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
            <CardList />
        </div>
      </div>
    )
  }
}
