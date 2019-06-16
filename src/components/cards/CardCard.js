import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  LazyLoadImage,
  LazyLoadComponent
} from "react-lazy-load-image-component";

//Styled div that stops selection and gives a drop shadow on hover
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
  border-radius: 5px;
  border: ${props => (props.spoiler ? "2px solid red" : "")};
`;

//Styled Link to remove any decoration
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

export default class CardCard extends Component {
  //Initialise state variables for card name, image file location, unique card index and if the image is loading
  state = {
    name: "",
    imageUrl: "",
    cardIndex: "",
    imageLoading: true
  };

  //when the card mounts, pull the name, index and image location then update this cards state
  componentDidMount() {
    const name = this.props.name;
    const cardIndex = this.props.index;
    const imageUrl = this.props.url;

    this.setState({ name, imageUrl, cardIndex });
  }

  render() {
    return (
      <div>
        <LazyLoadComponent>
          <StyledLink to={`cards/${this.state.cardIndex}`}>
            <Card className="card" spoiler={this.props.spoiler}>
              <LazyLoadImage
                className="card-img-top rounded mx-auto"
                alt={this.state.name}
                src={this.state.imageUrl}
                style={{ display: "block" }}
                draggable="false"
                effect="blur"
              />
              {this.props.spoiler ? (
                <div className="badge-container">
                  <span className="badge badge-danger spoiler-badge">
                    Spoiler
                  </span>
                </div>
              ) : null}
            </Card>
          </StyledLink>
        </LazyLoadComponent>
      </div>
    );
  }
}
