import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  background-color: rgba(100, 100, 100, 1);
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
  right: -70px;
  border-radius: 4px;
  padding: 8px
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -1px -80px;

  transform: scale(0.6);
  position: absolute;
`;

const CardName = styled.div`
  opacity: 1;
  width: 250px;
  background-image: linear-gradient(
    to right,
    rgba(100, 100, 100, 1),
    rgba(100, 100, 100, 1),
    rgba(100, 100, 100, 1),
    rgba(100, 100, 100, 1),
    rgba(100, 100, 100, 0)
  );
  margin-left: 8%;
  z-index: 2;
  margin-left: 6px;
  margin-right: auto;
  font-size: 1.1rem;
  color: rgb(230, 230, 230);
  font-weight: 500;
  vertical-align: middle;
  line-height: 30px;
  text-shadow: -1px -1px 0 #3f3f3f, 1px -1px 0 #3f3f3f, -1px 1px 0 #3f3f3f,
    1px 1px 0 #3f3f3f;
`;

const Quantity = styled.div`
  z-index: 2;
  border-radius: 4px;
  background-color: white;
  height: 30px;
  width: 35px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  line-height: 30px;
  margin-left: auto;
  margin-right: -1px;
`;

export default class CardInDeck extends Component {
  render() {
    console.log(this.props.card.name);
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
            ></ImageHolder>
            <CardName>{this.props.card.name}</CardName>
            <Quantity>{this.props.card.quantity}</Quantity>
          </Container>
        )}
      </Draggable>
    );
  }
}
