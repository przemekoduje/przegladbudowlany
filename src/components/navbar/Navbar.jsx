import "./navbar.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-text">
          
          <HashLink smooth to="/#services">
            <a href="/">USŁUGI</a>
          </HashLink>
          
          <HashLink smooth to="/#about">
            <a href="/">O MNIE</a>
          </HashLink>
          
          {/* <Link to={`/blog`} className="temp">
            
              BLOG
            
          </Link> */}

          <Link to={`/console`} className="temp">
            
              Console
            
          </Link>
          
            
          
        </div>
        <div className="menu-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={`full-screen-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-content">
          
          <HashLink smooth to="/#services">
            <a href="/" onClick={toggleMenu}>USŁUGI</a>
          </HashLink>
          <HashLink smooth to="/#about" >
            <a href="#about" onClick={toggleMenu}>
              O MNIE
            </a>
          </HashLink>
          
          
          
          <Link to={`#`} onClick={toggleMenu} className="temp">
            
              BLOG
            
          </Link>
        </div>
      </div>
    </nav>
  );
}
