import React, { Component } from 'react';
import axios from 'axios';
import CloseIcon from '../../close.png';
import { Link } from 'react-router-dom';

export default class Cards extends Component {
    state = {
        cardName: '',
        cardIndex: '',
        imageUrl: '',
        cardNumber: '',
        cardType: '',
        cardElement: '',
        cardCost: '',
        cardRace: '',
        cardPower: '',
        cardSet: '',
        cardIllust: '',
        cardSplash: '',
        cardEffects: [],
        windowWidth: window.innerWidth    
    };

    async componentDidMount() {
      const { cardIndex } = this.props.match.params;
      const dataUrl = './CardDB.json';

      const cardRes = await axios.get(dataUrl);

      const cardName = cardRes.data['cards'][cardIndex].name;
      const imageUrl = cardRes.data['cards'][cardIndex].url;
      const cardNumber = cardRes.data['cards'][cardIndex].number;
      const cardType = cardRes.data['cards'][cardIndex].type;
      const cardElement = cardRes.data['cards'][cardIndex].element;
      const cardCost = cardRes.data['cards'][cardIndex].cost;
      const cardRace = cardRes.data['cards'][cardIndex].race;
      const cardPower = cardRes.data['cards'][cardIndex].power;
      const cardSet = cardRes.data['cards'][cardIndex].set;
      const cardIllust = cardRes.data['cards'][cardIndex].illust;
      const cardSplash = cardRes.data['cards'][cardIndex].splash;
      const cardWholeEffect = cardRes.data['cards'][cardIndex].effect;
      const cardEffects = cardWholeEffect.split('^^');
      this.setState({ cardName, imageUrl, cardNumber, cardType, cardElement, cardCost, cardRace,
        cardPower, cardSet, cardIllust, cardSplash, cardEffects });

      document.title = cardName;
      }

      componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }

      componentWillUnmount() {
        document.title = "Argent DB";
      }

  handleWindowSizeChange = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  printEffects () {
        var effects = this.state.cardEffects;
        var container = document.getElementById('effects');
        var effectsExist = document.getElementsByClassName('effects-class');
        if ( effectsExist.length > 0 ) { return; }
        effects.forEach(function(effect) {
          container.innerHTML += ('<span class="effects-class resp-text">' + effect + '</span>');
        });
  }

  render() {
    const windowWidth = this.state.windowWidth;
    const isMobile = windowWidth <= 576;
    if ( !isMobile ) {
      return (
        <div className="card" onClick={e => e.preventDefault()}>
          <div className="card-header">
            <div className="header">
             <div className="row">
              <div className="col-sm-auto my-auto">
                <h2>{this.state.cardName}</h2>
              </div>
              <div className="col-sm-2 my-auto">
                <h4>{this.state.cardNumber}</h4>
              </div>
              <div className="col-sm-1 ml-auto my-auto">
                  <Link to="/">
                    <img src={CloseIcon} className="close" alt="close window" /> 
                  </Link>
              </div>
             </div> 
            </div>
          </div>
          <div className="card-body">
          <div className="row">
              <div className="col-md-7 col-lg-6 col-sm-6 col-6">
                <img src={this.state.imageUrl} className="img-fluid cardImgRounded" alt="Card unavailable"></img>
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
                        <span className="resp-text">{this.state.cardElement}</span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Cost:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                        <span className="resp-text">{this.state.cardCost || '-'}</span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Races:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                      <span className="resp-text">{this.state.cardRace || '-'}</span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-5 col-lg-4 col-sm-4">
                        <span className="faint-text">Power:</span>
                      </div>
                      <div className="col-md-7 col-lg-8 col-sm-8">
                      <span className="resp-text">{this.state.cardPower || '-'}</span>
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
                    <div id="effects" className="col-md-7 col-lg-8 col-sm-8 desktop-padding-1">
                      {this.printEffects()}
                    </div>
                  </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card" onClick={e => e.preventDefault()}>
          <div className="card-header mobile-padding">
            <div className="header">
              <div className="row">
                <div className="col-sm-auto col-auto my-auto">
                  <h2>{this.state.cardName}</h2>
                </div>
                <div className="col-sm-2 col-2 mt-1">
                  <h4>{this.state.cardNumber}</h4>
                </div>
                <div className="col-sm-1 col-1 ml-auto mr-2">
                    <Link to="/">
                      <img src={CloseIcon} className="mobile-close" alt="close window" /> 
                    </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body mobile-padding-2">
            <div className="row">
              <div className="col-12">
                <img src={this.state.imageUrl} className="img-fluid cardImgRounded" alt="Card unavailable"></img>
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
                    <span className="resp-text">{this.state.cardElement}</span>
                  </li>
                  <li className="list-group-item less-padding">
                    <span className="faint-text">Cost:</span>
                    <br />
                    <span className="resp-text">{this.state.cardCost || '-'}</span>
                  </li>
                </ul>
              </div>
              <div className="col-7">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="faint-text">Races:</span>
                    <br />
                    <span className="resp-text">{this.state.cardRace || '-'}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="faint-text">Power:</span>
                    <br />
                    <span className="resp-text">{this.state.cardPower || '-'}</span>
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
      )
    }
  }
}
