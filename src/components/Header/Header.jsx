import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import PatoLogo from '../../images/patologo.png'
import ConnectWalletButton from '../Buttons/ConnectWalletButton'
import AddTokenButton from '../Buttons/AddTokenButton'

import './Header.css'

class Header extends Component {

  render() {
    return (
      <header>
        <div id="tokenModal">
          <a href="/" id="hh1">
            <img src={PatoLogo} width="30" height="30" alt="" />
            <h1>Pato</h1><h1>Verde</h1><h1>Projects</h1>
          </a>
          <nav>
            <ul id="menu">
              <NavLink className="inactive" activeClassName="active" to="/claim">
                <li>
                  Claim
                </li>
              </NavLink>
              <NavLink className="inactive" activeClassName="active" to="/pool">
                <li>
                  Pool
                </li>
              </NavLink>
              <NavLink className="inactive" activeClassName="active" to="/game">
                <li
                >Game
                </li>
              </NavLink>
              <NavLink className="inactive" activeClassName="active" to="/marketplace">
                <li
                >Marketplace
                </li>
              </NavLink>
            </ul>
          </nav>
        </div>
        <div id="walletModal">
          <small>POLYGON NETWORK</small>
          <AddTokenButton />
          <ConnectWalletButton />
        </div>
      </header>
    );
  }
}

export default Header;
