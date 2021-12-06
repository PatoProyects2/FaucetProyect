import React, { Component } from 'react'
import styled from 'styled-components'
import Animated from 'animated/lib/targets/react-dom'
import Easing from 'animated/lib/Easing'

import CofreFront from '../../../../images/Game/cofre_front.png'
import CofreBack from '../../../../images/Game/cofre_back.png'

const ShopStyled = styled.div`
display: -inline-block;

`

const Chest = styled.div`
display: inline-block;
`
class Shop extends Component {
  constructor() {
    super();
    this.state = {
      chest1: false,
      chest2: false,
    };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange1(chest1) {
    this.setState({ chest1 });
  }

  handleChange2(chest2) {
    this.setState({ chest2 });
  }

  animatedValue1 = new Animated.Value(0);
  chest1 = () => {
    this.animatedValue1.setValue(0);

    Animated.timing(
      this.animatedValue1,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
      }
    )
      .start();
  }

  animatedValue2 = new Animated.Value(0);
  chest2 = () => {
    this.animatedValue2.setValue(0);

    Animated.timing(
      this.animatedValue2,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
      }
    )
      .start();
  }

  render() {

    return (
      <ShopStyled>
        <h1>SHOP</h1>
        <Chest>
          <div class="carta-box">
            <div class="carta">
              <div class="cara">
                <img src={CofreFront} width="130px" height="130px" alt="" />
              </div>
              <div class="cara detras">
                <img src={CofreBack} width="130px" height="130px" alt="" />
              </div>
            </div>
          </div>
          <button
            class="chestButton"
            onClick={this.chest1}
          >
            50 USDT
          </button>
          <Animated.div
            style={
              Object.assign(
                {},
                styles.box,
                { opacity: this.animatedValue1 })}
          >
            <p>HERRERIA ID:</p>
          </Animated.div>
        </Chest>
        <Chest>
          <div class="carta-box">
            <div class="carta">
              <div class="cara">
                <img src={CofreFront} width="130px" height="130px" alt="" />
              </div>
              <div class="cara detras">
                <img src={CofreBack} width="130px" height="130px" alt="" />
              </div>
            </div>
          </div>
          <button
            class="chestButton"
            onClick={this.chest2}
          >
            100 GOLD
          </button>
          <Animated.div
            style={
              Object.assign(
                {},
                styles.box,
                { opacity: this.animatedValue2 })}
          >
            <p>PICO ID: </p>
          </Animated.div>
        </Chest>
      </ShopStyled>
    );
  }
}

const styles = {
  box: {
    display: 'flex',
    position: 'relative',
    margin: '0 auto',
    marginTop: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '15px',
    width: '256px',
    height: '40px',
    paddingTop: '19px',
    border: '1px #00ff40 solid',
    boxShadow: '0 2px 8px #000000',
    cursor: 'auto',
  },
}

export default Shop;
