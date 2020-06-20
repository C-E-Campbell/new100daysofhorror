import React from "react";

import { Link } from "react-router-dom";
import "./Header.style.scss";

const Header = props => {
  return (
    <div className="header" id="header">
      <div className="header-container">
        <Link to="/" className="header-logo"></Link>
        <ul className="header-nav">
          <Link to="/login" className="header-li">
            Dashboard
          </Link>
          <Link to="/journal" className="header-li">
            Spill Your Guts
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
