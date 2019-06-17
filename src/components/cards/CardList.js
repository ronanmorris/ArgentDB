import React, { Component } from 'react';
import styled from 'styled-components';
import CardCard from './CardCard';
import loadMoreImage from '../../loadMore.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import cardData from '../../CardDB.json';
import DeckBuilderButton from '../layout/DeckBuilderButton';

const Card = styled.div`
  background: rgba(198, 198, 198, 0.4);
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    cursor: pointer;
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

export default class CardList extends Component {

  constructor(props) {
    super(props)
    this.buttonUpdateState = this.buttonUpdateState.bind(this);
    this.buttonAddToDeck = this.buttonAddToDeck.bind(this);
    this.inputRef = React.createRef();
  }
    state = {
      url: './CardDB.json',
      cards: [],
      currentDeck: [],
      search: "",
      filerShow: true,
      filterButtonClicked: 'Hide Filters',
      cardsPerRow: '',
      windowWidth: window.innerWidth,
      showItems: 25,
      filteredAmount: '',
      maxShowItems: null,
      sAllText: true,
      sName: false,
      sText: false,
      sRaces: false,
      sAllTypes: true,
      sChampion: false,
      sSpirit: false,
      sUnit: false,
      sSpell: false,
      sAugment: false,
      sTower: false,
      sShard: false,
      sAllCost: true,
      sCost0: false,
      sCost1: false,
      sCost2: false,
      sCost3: false,
      sCost4: false,
      sCost5: false,
      sCost6: false,
      sCost7up: false,
      sAllElement: true,
      sLight: false,
      sFire: false,
      sAir: false,
      sWater: false,
      sDark: false,
      sNeutral: false
    };

  //Updates the search field onchange
  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleChangeRows(event) {
    this.setState({ cardsPerRow: event.target.value });
  }

  handleShowMore() {
    this.setState({
      showItems:
        this.state.showItems >= this.state.maxShowItems ?
          this.state.showItems : this.state.showItems + 25
    })
    if ( this.state.showItems >= this.state.maxShowItems ) {
      this.setState({ showItems: this.state.maxShowItems });
    }
  }

  handleEnter(e) {
    if (e.key === 'Enter') {
      e.target.blur();
      this.setState({ filerShow: false })
      if (this.state.filterButtonClicked === 'Hide Filters') {
      this.setState({ filterButtonClicked: 'Show Filters'});
    }
    }
  }

  buttonAddToDeck(event) {
    let split = event.target.id.split('x');
    let quantity = split[0];
    let index = split[1];
    let currentDeck = this.state.currentDeck;
    let exists = false;
    currentDeck.forEach(function(card) {
      if (card.index === index) {
        exists = true;
        if (card.quantity !== quantity) {
          card.quantity = quantity;
        }
      }
    });

    if (!exists) {
      currentDeck.push({index: index, quantity: quantity});
    }

    let i;
    for(i = 0; i < currentDeck.length; i++) {
      if (currentDeck[i].quantity === "0") {
        currentDeck.splice(i, 1);
      }
    }
    this.setState({currentDeck: currentDeck})
  }

  //set the amount of initial columns based on window size
  resetRows() {
    let perRow;
    if ( this.state.windowWidth < 576 ) { perRow = 3 }
    else if ( this.state.windowWidth >= 576 && this.state.windowWidth < 768 ) { perRow = 3 }
   else if ( this.state.windowWidth >= 768 && this.state.windowWidth < 992 ) { perRow = 4 }
    else { perRow = 6 }
    this.setState({ cardsPerRow: perRow })
  }

  //decrease the amount of card columns, resetting if invalid input
  decrementRows() {
    let i = this.state.cardsPerRow;
    if (isNaN(i)) { this.resetRows(); }
    else if ( i <= 1 ) { i = 1 }
    else { i -= 1 }
    this.setState({ cardsPerRow: i })
  }

  //increase the amount of card columns, resetting if invalid input
  incrementRows() {
    let i = this.state.cardsPerRow;
    if (isNaN(i)) { this.resetRows(); }
    else if ( i >= 10 ) { i = 10 }
    else { i += 1 }
    this.setState({ cardsPerRow: i })
  }

  checkExistsInDeck(index) {
    return index 
  }

  buttonUpdateState(event) {
    //Toggle the button being clicked
    this.setState({ [event.target.id]: (this.state[event.target.id] ? false : true )});
    //Toggle Seach In All texts off if one of the other buttons are clicked
    if ( this.state.sAllText && (event.target.id === "sName" || "sText" || "sRaces") ) {
      this.setState({ sAllText: false });
    }
    //Toggle Seach In All Types off if one of the other buttons are clicked
    if ( this.state.sAllTypes && (event.target.id === "sChampion" || "sSpirit" || "sUnit" || "sSpell" || "sAugment" || "sTower" || "sShard" ) ) {
      this.setState({ sAllTypes: false });
    }
    //Toggle Seach all Costs off if one of the other buttons are clicked
    if ( this.state.sAllCost && (event.target.id === "sCost0" || "sCost1" || "sCost2" || "sCost3" || "sCost4" || "sCost5" || "sCost6" || "sCost7up") ) {
      this.setState({ sAllCost: false });
    }
    //Toggle Seach all Elemeents off if one of the other buttons are clicked
    if ( this.state.sAllElement && (event.target.id === "sLight" || "sFire" || "sAir" || "sWater" || "sDark" || "sNeutral") ) {
      this.setState({ sAllElement: false });
    }
    //Toggle the other buttons off if Seach in all Texts is clicked
    if ( (event.target.id === "sAllText") && (this.state.sName || this.state.sText || this.state.sRaces) ) {
      this.setState({
        sName: false,
        sText: false,
        sRaces: false
      })
    }
    //Toggle the other buttons off if Seach in all Types is clicked
    if ( (event.target.id === "sAllTypes") && (this.state.sChampion || this.state.sSpirit || this.state.sUnit || this.state.sSpell || this.state.sAugment || this.state.sTower || this.state.sShard) ) {
      this.setState({
        sChampion: false,
        sSpirit: false,
        sUnit: false,
        sSpell: false,
        sAugment: false,
        sTower: false,
        sShard: false
      })
    }
    //Toggle the other buttons off if Seach all Costs is clicked
    if ( (event.target.id === "sAllCost") && (this.state.sCost0 || this.state.sCost1 || this.state.sCost2 || this.state.sCost3 || this.state.sCost4 ||
      this.state.sCost5 || this.state.sCost6 || this.state.sCost7up ) ) {
      this.setState({
        sCost0: false,
        sCost1: false,
        sCost2: false,
        sCost3: false,
        sCost4: false,
        sCost5: false,
        sCost6: false,
        sCost7up: false
      })
    }
    //Toggle the other buttons off if Seach all Elements is clicked
    if ( (event.target.id === "sAllElement") && (this.state.sLight || this.state.sFire || this.state.sAir || this.state.sWater || this.state.sDark || this.state.sNeutral) ) {
      this.setState({
      sLight: false,
      sFire: false,
      sAir: false,
      sWater: false,
      sDark: false,
      sNeutral: false
      })
    }
  }

  toggleFilter(){
    this.setState({ filerShow: !this.state.filerShow })
    if (this.state.filterButtonClicked === 'Show Filters') {
      this.setState({ filterButtonClicked: 'Hide Filters'});
    } else {
      this.setState({ filterButtonClicked: 'Show Filters'});
    }
  }
  
  async componentDidMount() {
    //fetches card data from the JSON file. URL stored in state
      this.setState({ 
        cards: cardData['cards'],
        maxShowItems: cardData['cards'].length
     });
      this.resetRows();
  }

  componentDidUpdate() {
    //Makes sure that the Search in All texts is on if the other three buttons are off
    if ( (!this.state.sAllText) ) {
      if ( !(this.state.sName) && !(this.state.sText) && !(this.state.sRaces) ) { this.setState({ sAllText: true}); }
    }
    //Makes sure that the Search in All texts is on if the other three buttons are off
    if ( (!this.state.sAllTypes) ) {
      if ( !(this.state.sChampion) && !(this.state.sSpirit) && !(this.state.sUnit) && !(this.state.sSpell) && !(this.state.sAugment) && !(this.state.sTower) && !(this.state.sShard)) { this.setState({ sAllTypes: true}); }
    }
    //Makes sure that the Search in All costs is on if the other 8 buttons are off
    if ( (!this.state.sAllCost) ) {
      if ( !(this.state.sCost0) && !(this.state.sCost1) && !(this.state.sCost2) && !(this.state.sCost3) && !(this.state.sCost4) &&
      !(this.state.sCost5) && !(this.state.sCost6) && !(this.state.sCost7up) ) { this.setState({ sAllCost: true}); }
    }
    //Makes sure that the Search in All Elements is on if the other three buttons are off
    if ( (!this.state.sAllElement) ) {
      if ( !(this.state.sLight) && !(this.state.sFire) && !(this.state.sAir) && !(this.state.sWater) && !(this.state.sDark) && !(this.state.sNeutral)) { this.setState({ sAllElement: true}); }
    }
  }

  render() {
    //variable for showing the filters dropdown
    const show = (this.state.filerShow) ? "show" : "" ;
    
    //variables for filtering results
    const filter = this.state.search.toLowerCase();
    let currentList = this.state.cards;
    let filteredCards = currentList;
    let filterMap;
    let cardsPerRow = this.state.cardsPerRow.toString();

    if ( (this.state.search !== "") || !(this.state.sAllText) || !(this.state.sAllTypes) || !(this.state.sAllCost) || !(this.state.sAllElement) ) {
      //Search Names, Races AND Text
      if ( this.state.sAllText ) {
        filteredCards = filteredCards.filter(card => {
          return (
            card.name.toLowerCase().indexOf(filter) >= 0 ||
            card.race.toLowerCase().indexOf(filter) >= 0 ||
            card.effect.toLowerCase().indexOf(filter) >= 0
          )
        });
      //Search Names
      }
      if ( this.state.sName ) {
        filteredCards = filteredCards.filter(card => {
          return ( card.name.toLowerCase().indexOf(filter) >= 0 )
        });
      //Search Races
      }
      if ( this.state.sText ) {
        filteredCards = filteredCards.filter(card => {
          return ( card.effect.toLowerCase().indexOf(filter) >= 0 )
        });
      //Search Text
      }
      if ( this.state.sRaces ) {
        filteredCards = filteredCards.filter(card => {
          return ( card.race.toLowerCase().indexOf(filter) >= 0 )
        });
      }

      //Filter out card Types if they are not selected
      if ( !(this.state.sAllTypes) ) {
        if ( !(this.state.sChampion) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Champion" )
          });
        }
        if ( !(this.state.sSpirit) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Spirit" )
          });
        }
        if ( !(this.state.sUnit) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Unit" )
          });
        }
        if ( !(this.state.sSpell) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Spell" )
          });
        }
        if ( !(this.state.sAugment) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Augment" )
          });
        }
        if ( !(this.state.sTower) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Tower" )
          });
        }
        if ( !(this.state.sShard) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.type !== "Shard" )
          });
        }
      }
      //Filter out card Costs if they are not selected
      if ( !(this.state.sAllCost) ) {
        filteredCards = filteredCards.filter(card => {
          return ( card.cost !== "" )
        });
        if ( !(this.state.sCost0) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "0" )
          });
        }
        if ( !(this.state.sCost1) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "1" )
          });
        }
        if ( !(this.state.sCost2) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "2" )
          });
        }
        if ( !(this.state.sCost3) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "3" )
          });
        }
        if ( !(this.state.sCost4) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "4" )
          });
        }
        if ( !(this.state.sCost5) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "5" )
          });
        }
        if ( !(this.state.sCost6) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.cost !== "6" )
          });
        }
        if ( !(this.state.sCost7up) ) {
          filteredCards = filteredCards.filter(card => {
            return ( 
              card.cost !== "7" ||
              card.cost !== "8" ||
              card.cost !== "9" ||
              card.cost !== "10"
              )
          });
        }
      }
      //Filter out card Elements if they are not selected
      if ( !(this.state.sAllElement) ) {
        if ( !(this.state.sLight) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Light" )
          });
        }
        if ( !(this.state.sFire) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Fire" )
          });
        }
        if ( !(this.state.sAir) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Air" )
          });
        }
        if ( !(this.state.sWater) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Water" )
          });
        }
        if ( !(this.state.sDark) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Dark" )
          });
        }
        if ( !(this.state.sNeutral) ) {
          filteredCards = filteredCards.filter(card => {
            return ( card.element !== "Neutral" )
          });
        }
      }
    } else {
      filteredCards = this.state.cards;
    }

      let currentIndexArray = [];
      let x;
      for(x = 0; x < this.state.currentDeck.length; x++) {
        currentIndexArray.push([this.state.currentDeck[x].index, this.state.currentDeck[x].quantity]);
      }
      let qtySelected;
      filterMap = filteredCards.slice(0, this.state.showItems).map(
        card => (
          <div key={"a" + card.index} className={"card-img width-" + cardsPerRow}>
            {card.unique ? (
              <div className="button-position">
                <div className={"btn-group btn-deck btn-deck-toppadding-" + cardsPerRow}>
                  <button id={"0x" + card.index} type="button"
                    className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el2 => el2[1] === "0")) ? ("btn-danger"): ("btn-outline-danger"))
                      : ("btn-danger")
                      ) + " deck-btn-" + cardsPerRow}
                    onClick={this.buttonAddToDeck}>x0</button>
                  <button id={"1x" + card.index} type="button" className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el2 => el2[1] === "1")) ? ("btn-info"): ("btn-outline-info"))
                      : ("btn-outline-info")
                      ) + " deck-btn-" + cardsPerRow} onClick={this.buttonAddToDeck}>x1</button>
                </div>
              </div>
            ) : (
              <div className="button-position">
                <div className={"btn-group btn-deck btn-deck-toppadding-" + cardsPerRow}>
                  <button id={"0x" + card.index} type="button" className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el2 => el2[1] === "0")) ? ("btn-danger"): ("btn-outline-danger"))
                      : ("btn-danger")
                      ) + " deck-btn-" + cardsPerRow} onClick={this.buttonAddToDeck}>x0</button>
                  <button id={"1x" + card.index} type="button" className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el => el[0] === card.index && el[1] === "1")) ? ("btn-info"): ("btn-outline-info"))
                      : ("btn-outline-info")
                      ) + " deck-btn-" + cardsPerRow} onClick={this.buttonAddToDeck}>x1</button>
                  <button id={"2x" + card.index} type="button" className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el => el[0] === card.index && el[1] === "2")) ? ("btn-info"): ("btn-outline-info"))
                      : ("btn-outline-info")
                      ) + " deck-btn-" + cardsPerRow} onClick={this.buttonAddToDeck}>x2</button>
                  <button id={"3x" + card.index} type="button" className={"btn " + ((currentIndexArray.find(el => el[0] === card.index)) ?
                      ((currentIndexArray.find(el => el[0] === card.index && el[1] === "3")) ? ("btn-info"): ("btn-outline-info"))
                      : ("btn-outline-info")
                      ) + " deck-btn-" + cardsPerRow} onClick={this.buttonAddToDeck}>x3</button>
                </div>
              </div>
            )}
            <CardCard
              key={card.index}
              index={card.index}
              name={card.name}
              url={card.url}
              columns={this.state.cardsPerRow}
            >
            </CardCard>
          </div>
        )
      )
    

    return (
      <React.Fragment>
        <div className="foot-pad">
        {filteredCards ? (
          <div>
            <span className="rft">
            <div className="input-group mb-3 pd-cool">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary button-padded" type="button" data-toggle="button" 
                onClick={ this.toggleFilter.bind(this) }> 
                { this.state.filterButtonClicked }
                </button>
              </div>
              <input type="text" id="searchbox" name='search' className="form-control" value={this.state.search}
                onChange={this.handleChange.bind(this)} onKeyDown={this.handleEnter.bind(this)} placeholder="Search Cards..." />
            </div>
            <div className={"collapse" + show}>
              <div className="card card-body padded-card">
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="search-text-padded">Search In:</div>
                        </div>
                        <div className="col-md-10">
                        <button type="button" id="sAllText" className={"btn-right-margin btn rft " + (this.state.sAllText ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>All</button>
                        <div className="btn-group btn-group-wrap" role="group" aria-label="Basic example">
                          <button type="button" id="sName" className={"btn rft " + (this.state.sName ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Name</button>
                          <button type="button" id="sText" className={"btn rft " + (this.state.sText ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Text</button>
                          <button type="button" id="sRaces" className={"btn rft " + (this.state.sRaces ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Races</button>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="search-text-padded">Card Type:</div>
                        </div>
                        <div className="col-md-10">
                        <button type="button" id="sAllTypes" className={"btn-right-margin btn rft " + (this.state.sAllTypes ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>All</button>
                        <div className="btn-group btn-group-wrap" role="group" aria-label="Basic example">
                          <button type="button" id="sChampion" className={"btn rft " + (this.state.sChampion ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Champion</button>
                          <button type="button" id="sSpirit" className={"btn rft " + (this.state.sSpirit ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Spirit</button>
                          <button type="button" id="sUnit" className={"btn rft " + (this.state.sUnit ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Unit</button>
                          <button type="button" id="sSpell" className={"btn rft " + (this.state.sSpell ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Spell</button>
                          <button type="button" id="sAugment" className={"btn rft " + (this.state.sAugment ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Augment</button>
                          <button type="button" id="sTower" className={"btn rft " + (this.state.sTower ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Tower</button>
                          <button type="button" id="sShard" className={"btn rft " + (this.state.sShard ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Shard</button>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="search-text-padded">Card Cost:</div>
                        </div>
                        <div className="col-md-10">
                        <button type="button" id="sAllCost" className={"btn-right-margin btn rft " + (this.state.sAllCost ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>All</button>
                        <div className="btn-group btn-group-wrap" role="group" aria-label="Basic example">
                          <button type="button" id="sCost0" className={"btn rft " + (this.state.sCost0 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>0</button>
                          <button type="button" id="sCost1" className={"btn rft " + (this.state.sCost1 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>1</button>
                          <button type="button" id="sCost2" className={"btn rft " + (this.state.sCost2 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>2</button>
                          <button type="button" id="sCost3" className={"btn rft " + (this.state.sCost3 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>3</button>
                          <button type="button" id="sCost4" className={"btn rft " + (this.state.sCost4 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>4</button>
                          <button type="button" id="sCost5" className={"btn rft " + (this.state.sCost5 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>5</button>
                          <button type="button" id="sCost6" className={"btn rft " + (this.state.sCost6 ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>6</button>
                          <button type="button" id="sCost7up" className={"btn rft " + (this.state.sCost7up ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>7+</button>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          <div className="search-text-padded">Element:</div>
                        </div>
                        <div className="col-md-10">
                        <button type="button" id="sAllElement" className={"btn-right-margin btn rft " + (this.state.sAllElement ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>All</button>
                        <div className="btn-group btn-group-wrap" role="group" aria-label="Basic example">
                          <button type="button" id="sLight" className={"btn rft " + (this.state.sLight ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Light</button>
                          <button type="button" id="sFire" className={"btn rft " + (this.state.sFire ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Fire</button>
                          <button type="button" id="sAir" className={"btn rft " + (this.state.sAir ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Air</button>
                          <button type="button" id="sWater" className={"btn rft " + (this.state.sWater ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Water</button>
                          <button type="button" id="sDark" className={"btn rft " + (this.state.sDark ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Dark</button>
                          <button type="button" id="sNeutral" className={"btn rft " + (this.state.sNeutral ? "btn-secondary" : "btn-light")} onClick={ this.buttonUpdateState }>Neutral</button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <span className="float-right desktop-padding-2">Cards per row </span>
                    </div>
                    <div className="col-6 col-sm-6">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-secondary button-padded-2 rft " type="button"
                          onClick={this.decrementRows.bind(this)}>-</button>
                        </div>
                        <input type="text" className="form-control centre-input rft " aria-describedby="basic-addon1"
                        value={this.state.cardsPerRow} onChange={this.handleChangeRows.bind(this)} />
                        <div className="input-group-append">
                          <button className="btn btn-outline-secondary button-padded-2 rft " type="button"
                          onClick={this.incrementRows.bind(this)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
            
          
          <div className="row">
            {filterMap}
            {(this.state.showItems >= filteredCards.length) ? null : (
              <div className={"width-" + this.state.cardsPerRow.toString()}>
                <Card className="card transparent-bg">
                  <LazyLoadImage 
                    className="card-img-top rounded mx-auto"
                    src={loadMoreImage}
                    draggable="false"
                    onClick={this.handleShowMore.bind(this)}
                  />
                </Card>
              </div>
            )}
          </div>
          <DeckBuilderButton currentDeck={this.state.currentDeck} />
          </span>
        </div>
        ) : (
        <h1>Loading Cards</h1>
        )}
        </div>
      </React.Fragment>
    );
  }
}

