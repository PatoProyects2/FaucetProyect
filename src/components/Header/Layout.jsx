import React, { useEffect } from 'react';
import styled from 'styled-components';
import { keepTheme } from '../../themes/Themes';
import Header from './Header';

const HeaderBar = styled.div`

`

const Layout = ({ children }) => {
  useEffect(() => {
    keepTheme();
  });
  return (
    <HeaderBar>
      <Header />
      {children}
    </HeaderBar>
  );
};
export default Layout;