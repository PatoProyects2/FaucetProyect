import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom"
import styled from 'styled-components'
import Shop from './components/Shop/Shop'
import Elements from './components/Elements/Elements'
import Castle from './components/Castle/Castle'
import Gold from '../../images/Game/gold.png'
import Gems from '../../images/Game/gema.png'
import Wood from '../../images/Game/wood.png'

const GameStyled = styled.div`
margin: 0 auto;
width: 700px;
height: 100%;
border: 3px solid #c4c4c4;
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

class Game extends Component {

    render() {

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
                <Routes>
                    <Router>
                        <Switch>
                            <Route path="/game/castle">
                                <Castle />
                            </Route>
                            <Route path="/game/shop">
                                <Shop />
                            </Route>
                            <Route path="/game/elements">
                                <Elements />
                            </Route>
                        </Switch>
                        <NavLink className="off" activeClassName="on" to="/game/castle">
                            <button
                                id="buttonCastle"
                            >
                            </button>
                        </NavLink>
                        <NavLink className="off" activeClassName="on" to="/game/shop">
                            <button
                                id="buttonShop"
                            >
                            </button>
                        </NavLink>
                        <NavLink className="off" activeClassName="on" to="/game/elements">
                            <button
                                id="buttonBag"
                            >
                            </button>
                        </NavLink>
                    </Router>
                </Routes>
            </GameStyled>
        );
    }
}

export default Game;
