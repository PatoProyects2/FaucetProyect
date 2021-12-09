import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarWrapper } from "./Styles/NavLinkStyles";
import styled from 'styled-components'

import ConnectWalletButton from '../Buttons/ConnectWalletButton'
import AddTokenButton from '../Buttons/AddTokenButton'

function NavLinks({ open }) {
    return (
        <NavbarWrapper open={open}>
            <p>
                <NavLink className="inactive" activeClassName="active" to="/claim">Claim</NavLink>
                <NavLink className="inactive" activeClassName="active" to="/pool">Pool</NavLink>
                <NavLink className="inactive" activeClassName="active" to="/game">Game</NavLink>
                <NavLink className="inactive" activeClassName="active" to="/marketplace">Marketplace</NavLink>
            </p>
            <AddTokenButton />
            <ConnectWalletButton />
        </NavbarWrapper >
    );
}

export default NavLinks;
