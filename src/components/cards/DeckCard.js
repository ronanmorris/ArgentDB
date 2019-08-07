import React, { Component } from "react";
import styled from "styled-components";

const Card = styled.div`
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export default class DeckCard extends Component {
  //Initialise state variables for card name, image file location, unique card index and if the image is loading
  state = {
    name: "",
    imageUrl: "",
    cardIndex: "",
    imageLoading: true,
    quantity: 0
  };

  //when the card mounts, pull the name, index and image location then update this cards state
  componentDidMount() {
    const name = this.props.name;
    const cardIndex = this.props.index;
    const imageUrl = this.props.url;
    const quantity = this.props.quantity;

    this.setState({ name, imageUrl, cardIndex, quantity });
  }

  render() {
    let quantity = this.state.quantity;
    if (quantity === "1") {
      return (
        <div key={this.state.index + "a"} className="item box1">
          <div key={this.state.index + "b"} className="item-content">
            <img
              key={this.state.index + "c"}
              className="card-img-top rounded mx-auto"
              alt={this.state.name}
              src={this.state.imageUrl}
              style={{ display: "block" }}
              draggable="false"
              effect="blur"
            />
          </div>
        </div>
      );
    } else if (quantity === "2") {
      return (
        <div key={this.state.index + "d"}>
          <div key={this.state.index + "e"} className="item box1">
            <div key={this.state.index + "f"} className="item-content">
              <img
                key={this.state.index + "g"}
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
            </div>
          </div>
          <div key={this.state.index + "h"} className="item box1">
            <div key={this.state.index + "i"} className="item-content">
              <img
                key={this.state.index + "j"}
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
            </div>
          </div>
        </div>
      );
    } else if (quantity === "3") {
      return (
        <div key={this.state.index + "k"}>
          <div key={this.state.index + "l"} className="item box1">
            <div key={this.state.index + "m"} className="item-content">
              <img
                key={this.state.index + "n"}
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
            </div>
          </div>
          <div key={this.state.index + "o"} className="item box1">
            <div key={this.state.index + "p"} className="item-content">
              <img
                key={this.state.index + "q"}
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
            </div>
          </div>
          <div key={this.state.index + "r"} className="item box1">
            <div key={this.state.index + "s"} className="item-content">
              <img
                key={this.state.index + "t"}
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No</div>;
    }
  }
}
