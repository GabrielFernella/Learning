import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <NavLink to="/" end>
        inicio
      </NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="sobre">Sobre</NavLink>
    </div>
  );
};

export default Header;
