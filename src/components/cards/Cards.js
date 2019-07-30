import React, { Component } from "react";
import CloseIcon from "../../close.png";
import { Link } from "react-router-dom";
import cardData from "../../CardDB.json";

export default class Cards extends Component {
  //Initial state
  state = {
    cardName: "",
    cardIndex: "",
    imageUrl: "",
    cardNumber: "",
    longNumber: false,
    cardType: "",
    cardElement: "",
    cardCost: "",
    cardRace: "",
    cardPower: "",
    cardRarity: "",
    cardSet: "",
    cardIllust: "",
    cardSplash: "",
    cardEffects: [],
    windowWidth: window.innerWidth
  };

  componentDidMount() {
    //Get all info for this card and set to state
    let cardIndex = this.props.match.params.cardIndex;
    let cardIndexInt = parseInt(cardIndex);
    let thisCard;
    for (let i = 0; i < cardData.cards.length; i++) {
      if (cardData.cards[i].index === cardIndexInt) {
        thisCard = cardData.cards[i];
      }
    }
    const cardName = thisCard.name;
    const imageUrl = thisCard.url;
    const cardNumber = thisCard.number;
    const longNumber = thisCard.number.length > 15;
    const cardType = thisCard.type;
    const cardElement = thisCard.element;
    const cardCost = thisCard.cost;
    const cardRace = thisCard.race;
    const cardPower = thisCard.power;
    const cardRarity = thisCard.rarity;
    const cardSet = thisCard.set;
    const cardIllust = thisCard.illust;
    const cardSplash = thisCard.splash;
    const cardWholeEffect = thisCard.effect;
    const cardEffects = cardWholeEffect.split("^^");
    this.setState({
      cardName,
      imageUrl,
      cardNumber,
      longNumber,
      cardType,
      cardElement,
      cardCost,
      cardRace,
      cardPower,
      cardRarity,
      cardSet,
      cardIllust,
      cardSplash,
      cardEffects
    });

    //Change page title to card name
    document.title = cardName;
  }

  componentWillMount() {
    //Listen for window resize events
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    //Reset page title on unmount
    document.title = "Argent DB";
  }

  handleWindowSizeChange = () => {
    //Update state with window width on resize event
    this.setState({ windowWidth: window.innerWidth });
  };

  //Function to list all of a card's effects in different spans so that they are spaced out
  printEffects() {
    var effects = this.state.cardEffects;
    var container = document.getElementById("effects");
    var effectsExist = document.getElementsByClassName("effects-class");
    //Prevent looping
    if (effectsExist.length > 0) {
      return;
    }
    effects.forEach(function(effect) {
      container.innerHTML +=
        '<span class="effects-class resp-text">' + effect + "</span>";
    });
  }

  render() {
    //Check for mobile screens and return layout accordingly
    const windowWidth = this.state.windowWidth;
    const isMobile = windowWidth <= 576;
    if (!isMobile) {
      return (
        <div className="card" onClick={e => e.preventDefault()}>
          <div className="card-header">
            <div className="header">
              <div className="row">
                <div className="col-sm-auto my-auto">
                  <h2>{this.state.cardName}</h2>
                </div>
                <div className="col-sm-4 my-auto">
                  <h4>{this.state.cardNumber}</h4>
                </div>
                <Link to="/">
                  <div className="close-button">
                    <img src={CloseIcon} className="close" alt="close window" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-7 col-lg-6 col-sm-6 col-6">
                <img
                  src={this.state.imageUrl}
                  className="img-fluid cardImgRounded"
                  alt="Card unavailable"
                />
              </div>
              <div className="col-md-5 col-lg-6 col-sm-6 col-6">
                <ul className="list-group list-group-flush list-line">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Card Type:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">{this.state.cardType}</span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Element:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">
                          {this.state.cardElement}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Cost:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">
                          {this.state.cardCost || "-"}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Races:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">
                          {this.state.cardRace || "-"}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Power:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">
                          {this.state.cardPower || "-"}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Rarity:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">
                          {this.state.cardRarity || "-"}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Set:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">{this.state.cardSet}</span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item item-inline">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Effects:</span>
                      </div>
                      <div
                        id="effects"
                        className="col-md-7 col-lg-8 col-sm-8 desktop-padding-1"
                      >
                        {this.printEffects()}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card" onClick={e => e.preventDefault()}>
          <div className="card-header mobile-padding">
            {!this.state.longNumber ? (
              <div className="header">
                <div className="row">
                  <div className="col-sm-auto col-auto my-auto">
                    <h2>{this.state.cardName}</h2>
                  </div>
                  <div className="col-sm-3 col-3 mt-1">
                    <h4 style={{ whiteSpace: "nowrap" }}>
                      {this.state.cardNumber}
                    </h4>
                  </div>
                  <div className="col-sm-1 col-1 ml-auto mr-2">
                    <Link to="/">
                      <img
                        src={CloseIcon}
                        className="mobile-close"
                        alt="close window"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="header">
                <div className="row">
                  <div className="col-sm-auto col-auto my-auto">
                    <h2>{this.state.cardName}</h2>
                  </div>

                  <Link to="/">
                    <div className="close-button-mobile">
                      <img
                        src={CloseIcon}
                        className="mobile-close"
                        alt="close window"
                      />
                    </div>
                  </Link>
                </div>
                <div className="row">
                  <div className="col-sm-10 col-10 ml-0 pl-1">
                    <h4>{this.state.cardNumber}</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="card-body mobile-padding-2">
            <div className="row">
              <div className="col-12">
                <img
                  src={this.state.imageUrl}
                  className="img-fluid cardImgRounded"
                  alt="Card unavailable"
                />
              </div>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item less-padding no-top-border mobile-padding-3">
                <div className="row">
                  <div className="col-5">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item less-padding">
                        <span className="faint-text">Card Type:</span>
                        <br />
                        <span className="resp-text">{this.state.cardType}</span>
                      </li>
                      <li className="list-group-item less-padding">
                        <span className="faint-text">Element:</span>
                        <br />
                        <span className="resp-text">
                          {this.state.cardElement}
                        </span>
                      </li>
                      <li className="list-group-item less-padding">
                        <span className="faint-text">Cost:</span>
                        <br />
                        <span className="resp-text">
                          {this.state.cardCost || "-"}
                        </span>
                      </li>
                      <li className="list-group-item less-padding">
                        <span className="faint-text">Rarity:</span>
                        <br />
                        <span className="resp-text">
                          {this.state.cardRarity || "-"}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-7">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="faint-text">Races:</span>
                        <br />
                        <span className="resp-text">
                          {this.state.cardRace || "-"}
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span className="faint-text">Power:</span>
                        <br />
                        <span className="resp-text">
                          {this.state.cardPower || "-"}
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span className="faint-text">Set:</span>
                        <br />
                        <span className="resp-text">{this.state.cardSet}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="list-group-item less-padding mobile-padding-3">
                <div className="row">
                  <div className="col-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="faint-text">Effects:</span>
                      </li>
                    </ul>
                  </div>
                  <div id="effects" className="col-9 mobile-padding-4">
                    {this.printEffects()}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
