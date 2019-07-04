import React, { Component } from "react";
import styled from "styled-components";
import Card from "./CardInDeck";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
  background-color: beige;
  display: flex;
`;
const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.25s ease;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  flex-grow: 1;
  min-height: 50px;
`;

export default class DeckZone extends Component {
  render() {
    return (
      <Container>
        <Title>
          {this.props.deck.title}
          <div className="div" style={{ marginTop: "-1px" }}>
            {this.props.deck.title === "Towers" ? (
              <div className="">
                <span
                  className="badge badge-warning"
                  style={{ marginLeft: "6px" }}
                >
                  {this.props.amountLight}
                </span>
                <span
                  className="badge badge-danger"
                  style={{ marginLeft: "6px" }}
                >
                  {this.props.amountFire}
                </span>
                <span
                  className="badge badge-success"
                  style={{ marginLeft: "6px" }}
                >
                  {this.props.amountAir}
                </span>
                <span
                  className="badge badge-info"
                  style={{ marginLeft: "6px" }}
                >
                  {this.props.amountWater}
                </span>
                <span
                  className="badge badge-dark"
                  style={{ marginLeft: "6px" }}
                >
                  {this.props.amountDark}
                </span>
              </div>
            ) : (
              <span className="badge badge-dark" style={{ marginLeft: "6px" }}>
                {this.props.amount}
              </span>
            )}
          </div>
        </Title>
        <Droppable droppableId={this.props.deck.id}>
          {(provided, snapshot) => (
            <CardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.cards.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  breakPoint={this.props.breakPoint}
                />
              ))}
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    );
  }
}
