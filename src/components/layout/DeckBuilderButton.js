import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class DeckBuilder extends Component {
  state = {
    currentDeck: [],
    builderOpen: false,
    deckName: "Untitled Deck"
  };

  componentWillReceiveProps() {
    const currentDeck = this.props.currentDeck;
    this.setState({ currentDeck });
  }

  render() {
    return (
      <div className="row">
        <StyledLink to="/builder">
          <button
            type="button"
            className="btn btn-secondary deck-builder-toggle"
          >
            Open Deckbuilder
          </button>
        </StyledLink>
      </div>
    );
  }
}
