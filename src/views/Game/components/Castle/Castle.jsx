import React from 'react'
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams
} from "react-router-dom"

import HerreriaNft from '../../../../images/Game/NFT.png'
import HachaNft from '../../../../images/Game/hacha.png'
import PicoNft from '../../../../images/Game/pico.png'

import Herreria from './components/Herreria/Herreria'
import Hacha from './components//Hacha/Hacha'
import Pico from './components/Pico/Pico'

function Slide() {
  let { slide } = useParams();

  return (
    <div>
      <h1>{slide}</h1>
    </div>
  );
};

function Castle() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <NavLink className="off" activeClassName="on" to={`${url}/smithy`}>
        <img id="herreria" src={HerreriaNft} width="100px" height="100px" alt="" />
      </NavLink>
      <NavLink className="off" activeClassName="on" to={`${url}/axe`}>
        <img id="hacha" src={HachaNft} width="100px" height="100px" alt="" />
      </NavLink>
      <NavLink className="off" activeClassName="on" to={`${url}/beak`}>
        <img id="pico" src={PicoNft} width="100px" height="100px" alt="" />
      </NavLink>
      <Switch>
        <Route exact path={path}>
          <h1>Select NFT</h1>
        </Route>
        <Route path={`${path}/:slide`} component={Slide} />
      </Switch>
      <Switch>
        <Route path={`${path}/smithy`} component={Herreria} />
        <Route path={`${path}/axe`} component={Hacha} />
        <Route path={`${path}/beak`} component={Pico} />
      </Switch>
    </div>
  );

};

export default Castle;
