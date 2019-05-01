import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import loadingGIF from '../cards/loading.gif';

const Sprite = styled.img`
  display: none;
`;

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
state ={
  name: '',
  imageUrl: '',
  cardIndex: '',
  imageLoading: true
  };

  //when the card mounts, pull the name, index and image location then update this cards state
  componentDidMount () {
    const name = this.props.name;
    const cardIndex = this.props.index;
    const imageUrl = this.props.url;

    this.setState({name, imageUrl, cardIndex})
  }

  render() {
    
    return (
      <div>
      {/*</div><div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-6 col-6 mb-3">*/}
        <StyledLink to={`cards/${this.state.cardIndex}`}>
          <Card className="card">
            {/*show loading spinner if the image hasnt been displayed yet*/}
            {this.state.imageLoading ? (
              <div className="text-center mt-4">
              <img src={loadingGIF} style={{ width: '2em', height: '2em' }} alt="Loading GIF" />
              </div>
            ) : null}

            {/*Show the card image, removing the spinner when it loads*/}
            <Sprite className="card-img-top rounded mx-auto"
            onLoad={() => this.setState({ imageLoading: false })}
            src={this.state.imageUrl}
            style={ this.state.imageLoading ? null : {display: "block"}}
            draggable="false"
            />
          </Card>
        </StyledLink>
      </div>
    )
  }
}
