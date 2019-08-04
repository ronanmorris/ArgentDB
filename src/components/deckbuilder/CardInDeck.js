import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  background: linear-gradient(
    90deg,
    rgba(68, 68, 68, 1) 30%,
    rgba(131, 131, 131, 0) 80%
  );
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: "1rem";
  width: 100%;
  height: 40px;
  overflow: hidden;
  display: flex;
`;

const ImageHolder = styled.div`
  width: ${props =>
    props.breakPoint === "xs"
      ? "140%;"
      : props.breakPoint === "sm"
      ? "110%;"
      : "100%;"}
  height: 90px;
  top: -30px;
  right: -100px;
  border-radius: 4px;
  padding: 8px
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: ${props =>
    props.breakPoint === "xs"
      ? "-40px -24px;"
      : props.breakPoint === "sm"
      ? "-40px -24px;"
      : props.breakPoint === "md"
      ? "-30px -40px;"
      : props.breakPoint === "lg"
      ? "-30px -65px;"
      : "20px -70px;"}
  transform: ${props =>
    props.breakPoint === "xs"
      ? "scale(0.6);"
      : props.breakPoint === "sm"
      ? "scale(0.7);"
      : props.breakPoint === "md"
      ? "scale(0.7);"
      : props.breakPoint === "lg"
      ? "scale(0.75);"
      : "scale(0.8);"}
  position: absolute;
`;

const CardName = styled.div`
  width: 100%;
  background: rgb(68,68,68);
  background: ${props =>
    props.breakPoint === "xs"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 47%, rgba(75,75,75,0.6887009803921569) 60%, rgba(131,131,131,0) 80%);"
      : props.breakPoint === "sm"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 47%, rgba(75,75,75,0.6887009803921569) 60%, rgba(131,131,131,0) 80%);"
      : props.breakPoint === "md"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 40%, rgba(75,75,75,0.4687009803921569) 60%, rgba(131,131,131,0) 80%);"
      : props.breakPoint === "lg"
      ? "linear-gradient(90deg, rgba(68,68,68,1) 30%, rgba(75,75,75,0.587009803921569) 58%, rgba(131,131,131,0) 70%);"
      : "linear-gradient(90deg, rgba(68,68,68,1) 45%, rgba(75,75,75,0.6087009803921569) 55%, rgba(80,80,80,0.6187009803921569) 62%,rgba(131,131,131,0) 70%);"}
  z-index: 2;
  margin-left: 6px;
  font-size: ${props =>
    props.breakPoint === "xs"
      ? "0.6rem"
      : props.breakPoint === "sm"
      ? "0.75rem"
      : props.breakPoint === "md"
      ? "0.9rem;"
      : props.breakPoint === "lg"
      ? "1rem"
      : "1.2rem;"}
  color: rgb(230, 230, 230);
  line-height: 39px;
  text-shadow: -1px -1px 0 #3f3f3f, 1px -1px 0 #3f3f3f, -1px 1px 0 #3f3f3f,
    1px 1px 0 #3f3f3f;
`;

const Quantity = styled.div`
  z-index: 2;
  border-radius: 2px;
  background-color: rgb(250, 250, 250);
  height: 40px;
  width: 35px;
  font-size: ${props =>
    props.breakPoint === "xs"
      ? ""
      : props.breakPoint === "sm"
      ? "0.9rem"
      : props.breakPoint === "md"
      ? "1rem;"
      : props.breakPoint === "lg"
      ? "1.1rem"
      : "1.2rem;"}
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
  margin-left: 0px;
  margin-right: 0px;
`;

export default class CardInDeck extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
            breakPoint={this.props.breakPoint}
          >
            <ImageHolder
              imageUrl={"/img/" + this.props.card.index + ".jpg"}
              breakPoint={this.props.breakPoint}
            ></ImageHolder>
            <Quantity breakPoint={this.props.breakPoint}>
              {this.props.card.quantity}
            </Quantity>
            <CardName breakPoint={this.props.breakPoint}>
              {this.props.card.name}
            </CardName>
          </Container>
        )}
      </Draggable>
    );
  }
}
