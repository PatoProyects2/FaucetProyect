import React, { Component } from 'react'
import HachaNft from '../../../../../../images/Game/hacha.png'
import HachaStats from './HachaStats'


class Hacha extends Component {
  constructor() {
    super();
    this.state = {
      hacha: 'FALSE',
      levelHa: 1,
    };
  }



  render() {

    return (
      <div id="hachaModal">
        <h1>HACHA</h1>
        <HachaStats />
        <img src={HachaNft} width="200px" height="200px" alt="" />
      </div>
    );
  }
}



export default Hacha;
