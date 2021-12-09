import React, { useState } from 'react'

import NavLinks from './NavLinks'
import MenuButton from './MenuButton'
import { HeaderWrapper } from "./Styles/HeaderStyles";

import PatoLogo from '../../images/patologo.png'

import './Header.css'

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>
      <a href="/" id="hh1">
        <img src={PatoLogo} width="30" height="30" alt="" />
        <h1>Pato</h1><h1>Verde</h1><h1>Projects</h1>
      </a>
      <NavLinks open={open} />
      <MenuButton open={open} handleClick={handleClick} />
    </HeaderWrapper>
  );
}

export default Header;
