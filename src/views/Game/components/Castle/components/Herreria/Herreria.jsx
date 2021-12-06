import React, { Component } from 'react'
import HerreriaNft from '../../../../../../images/Game/NFT.png'
import HerreriaStats from './HerreriaStats'


class Herreria extends Component {

  constructor() {
    super();
    this.state = {
      levelHe: 1,
      starHe: 1,
    };
  }

  render() {

    return (
      <div id="herreriaModal">
        <h1>HERRERIA</h1>
        <HerreriaStats />
        <img src={HerreriaNft} width="200px" height="200px" alt="" />
      </div>
    );
  }
}



export default Herreria;
