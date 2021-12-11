import React, { useEffect } from 'react';
import { keepTheme } from '../../themes/Themes';
import Header from './Header';
const Layout = ({ children }) => {
  useEffect(() => {
    keepTheme();
  });
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default Layout;