import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImageHolder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 8px;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -1px -80px;
  background-color: rgba(255, 255, 255, 0.5);
  background-blend-mode: lighten;
  transform: scale(1.2);
`;

const DisplayContent = styled.div`
  opacity: 1;
  margin-left: 8%;
  font-weight: 600;
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
            <ImageHolder imageUrl={"/img/" + this.props.card.index + ".jpg"}>
              <DisplayContent>
                {this.props.card.quantity + "x  "}
                {this.props.card.name}
              </DisplayContent>
            </ImageHolder>
          </Container>
        )}
      </Draggable>
    );
  }
}
