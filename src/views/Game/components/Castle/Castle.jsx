import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import HerreriaNft from '../../../../images/Game/NFT.png'
import HachaNft from '../../../../images/Game/hacha.png'
import PicoNft from '../../../../images/Game/pico.png'

import Herreria from './components/Herreria/Herreria'
import Hacha from './components//Hacha/Hacha'
import Pico from './components/Pico/Pico'

class Castle extends Component {

  render() {

    return (
      <div>
        <Router>
          <NavLink className="off" activeClassName="on" to="/animation/castle/herreria">
            <img id="herreria" src={HerreriaNft} width="100px" height="100px" alt="" />
          </NavLink>
          <NavLink className="off" activeClassName="on" to="/animation/castle/hacha">
            <img id="hacha" src={HachaNft} width="100px" height="100px" alt="" />
          </NavLink>
          <NavLink className="off" activeClassName="on" to="/animation/castle/pico">
            <img id="pico" src={PicoNft} width="100px" height="100px" alt="" />
          </NavLink>
          <Switch>
            <Route path="/animation/castle/herreria">
              <Herreria />
            </Route>
            <Route path="/animation/castle/hacha">
              <Hacha />
            </Route>
            <Route path="/animation/castle/pico">
              <Pico />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Castle;
