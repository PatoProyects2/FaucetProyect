import React from 'react'
import {
    Switch,
    Route,
    NavLink,
    useRouteMatch,
    useParams
} from "react-router-dom"
import styled from 'styled-components'

import Shop from './components/Shop/Shop'
import Elements from './components/Elements/Elements'
import Castle from './components/Castle/Castle'

import Gold from '../../images/Game/gold.png'
import Gems from '../../images/Game/gema.png'
import Wood from '../../images/Game/wood.png'

import './Game.css'

const GameStyled = styled.div`
margin: 0 auto;
position: absolute;
top: 200px;
left: 0;
right: 0;
`

const HeaderStyled = styled.div`
margin: 0 auto;
color: white;
padding: 10px;
`

const Tokens = styled.div`
display: inline-block;
padding: 15px;
`

const Routes = styled.div`
margin: 0 auto;
color: white;
padding: 10px;
bottom: 0px;
`

function Slide() {
    let { slide } = useParams();

    return (
        <div>
            <h1>{slide}</h1>
        </div>

    );
};

function Game() {
    let { path, url } = useRouteMatch();

    return (
        <GameStyled>
            <HeaderStyled>
                <Tokens>
                    <img src={Gold} width="25" height="25" alt="" />
                    &nbsp;100
                </Tokens>
                <Tokens>
                    <img src={Gems} width="25" height="25" alt="" />
                    &nbsp;400
                </Tokens>
                <Tokens>
                    <img src={Wood} width="25" height="25" alt="" />
                    &nbsp;20
                </Tokens>
            </HeaderStyled>
            <Switch>
                <Route exact path={path}>
                    <h1>Start playing</h1>
                </Route>
                <Route path={`${path}/:slide`} component={Slide} />
            </Switch>
            <Switch>
                <Route path={`${path}/castle`} component={Castle} />
                <Route path={`${path}/shop`} component={Shop} />
                <Route path={`${path}/elements`} component={Elements} />
            </Switch>
            <NavLink className="off" activeClassName="on" to={`${url}/castle`}>
                <button
                    id="buttonCastle"
                >
                </button>
            </NavLink>
            <NavLink className="off" activeClassName="on" to={`${url}/shop`}>
                <button
                    id="buttonShop"
                >
                </button>
            </NavLink>
            <NavLink className="off" activeClassName="on" to={`${url}/elements`}>
                <button
                    id="buttonBag"
                >
                </button>
            </NavLink>

        </GameStyled>
    );
};

export default Game;
