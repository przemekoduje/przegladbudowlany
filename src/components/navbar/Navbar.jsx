import './navbar.scss'
import React, { useState } from 'react';
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className='navbar'>
        <div className="navbar-text">
          <a href="/">USŁUGI</a>
          <a href="/">O MNIE</a>
          <a href="/">BLOG</a>
          <a href="/">PRZEPISY</a>
        </div>
        <div className="menu-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
        <div className={`full-screen-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="menu-content">
            <Link to={`/`}>
              <a href="/" onClick={toggleMenu}>USŁUGI</a>
            </Link>
            <Link to={`/`}>
              <a href="#about" onClick={toggleMenu}>O MNIE</a>
            </Link>
              
          </div>
        </div>
    </nav>
    
  )
}
