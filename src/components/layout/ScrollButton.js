import React, { Component } from 'react'
import topIcon from '../../top.png';

export default class ScrollButton extends Component {
    constructor() {
        super();
    
        this.state = {
            intervalId: 0
        };
      }
      
      scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
      }
      
      scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
      }
      
      render () {
          return <img src={topIcon} className="scroll-top fixed-botright" alt="Scroll to Top" onClick={ () => { this.scrollToTop(); }}/>
       }
}

