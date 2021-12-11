import React, { useState } from 'react'

import NavLinks from './components/NavLinks'
import MenuButton from './components/MenuButton'
import Toggle from "./components/Toggle";

import { HeaderWrapper } from "./Styles/HeaderStyles";

import ConnectWalletButton from '../Buttons/ConnectWalletButton'
import AddTokenButton from '../Buttons/AddTokenButton'

import './Header.css'

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>
      <NavLinks open={open} />
      <MenuButton open={open} handleClick={handleClick} />
      <Toggle />
      <AddTokenButton />
      <ConnectWalletButton />
    </HeaderWrapper>
  );
}

export default Header;
