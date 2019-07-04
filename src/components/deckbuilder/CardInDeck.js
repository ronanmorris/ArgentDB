import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  background-color: rgba(68, 68, 68, 1);
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
`;

const ImageHolder = styled.div`
  width: 100%;
  height: 80px;
  top: -30px;
  right: -100px;
  border-radius: 4px;
  padding: 8px
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: ${props =>
    props.breakPoint === "xs"
      ? ""
      : props.breakPoint === "sm"
      ? "-40px -20px;"
      : props.breakPoint === "md"
      ? "-1px -40px;"
      : props.breakPoint === "lg"
      ? "-1px -65px;"
      : "-1px -80px;"}
  transform: scale(0.6);
  position: absolute;
`;

const CardName = styled.div`
  width: 100%;
  background: rgb(68,68,68);
  background: ${props =>
    props.breakPoint === "xs"
      ? ""
      : props.breakPoint === "sm"
      ? ""
      : props.breakPoint === "md"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 52%, rgba(75,75,75,0.6587009803921569) 60%, rgba(131,131,131,0) 65%);"
      : props.breakPoint === "lg"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 56%, rgba(75,75,75,0.6587009803921569) 65%, rgba(131,131,131,0) 70%);"
      : "linear-gradient(90deg, rgba(68,68,68,1) 45%, rgba(75,75,75,0.6087009803921569) 55%, rgba(80,80,80,0.6187009803921569) 62%,rgba(131,131,131,0) 70%);"}
  z-index: 2;
  margin-left: 6px;
  font-size: ${props =>
    props.breakPoint === "xs"
      ? ""
      : props.breakPoint === "sm"
      ? "0.75rem"
      : props.breakPoint === "md"
      ? "0.9rem;"
      : props.breakPoint === "lg"
      ? "1rem"
      : "1.1rem;"}
  color: rgb(230, 230, 230);
  line-height: 30px;
  text-shadow: -1px -1px 0 #3f3f3f, 1px -1px 0 #3f3f3f, -1px 1px 0 #3f3f3f,
    1px 1px 0 #3f3f3f;
`;

const Quantity = styled.div`
  z-index: 2;
  border-radius: 2px;
  background-color: rgb(250, 250, 250);
  height: 30px;
  width: 35px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  margin-left: 0px;
  margin-right: 0px;
`;

export default class CardInDeck extends Component {
  render() {
    console.log(this.props.breakPoint);
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <ImageHolder
              imageUrl={"/img/" + this.props.card.index + ".jpg"}
              breakPoint={this.props.breakPoint}
            ></ImageHolder>
            <Quantity>{this.props.card.quantity}</Quantity>
            <CardName breakPoint={this.props.breakPoint}>
              {this.props.card.name}
            </CardName>
          </Container>
        )}
      </Draggable>
    );
  }
}
