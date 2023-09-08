import React from 'react';
import logoPath from '../images/logo.svg';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого" />
      <nav className="header__nav-bar">
        <p className="header__text">{props.email}</p>
        <button className="header__text" onClick={props.onClick}>{props.text}</button>
      </nav>
    </header>
  );
}

export default Header