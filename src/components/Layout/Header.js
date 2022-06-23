import React from 'react';

import {header, heading1} from './Layout.module.scss';

const Header = () => (
  <nav className={header}>
      <h1 className={heading1}>Creo React Album</h1>
  </nav>
);

export default Header;