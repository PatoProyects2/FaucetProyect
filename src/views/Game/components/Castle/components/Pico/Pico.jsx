import React, { Component } from 'react'
import PicoNft from '../../../../../../images/Game/pico.png'
import PicoStats from './PicoStats'

class Pico extends Component {
  constructor() {
    super();
    this.state = {
      pico: 'FALSE',
      levelPi: 1,
    };
  }

  render() {

    return (
      <div id="picoModal">
        <h1>PICO</h1>
        <PicoStats />
        <img src={PicoNft} width="200px" height="200px" alt="" />
      </div>
    );
  }
}



export default Pico;