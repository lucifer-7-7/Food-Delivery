import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({});

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
   
    document.body.classList.toggle('mobile-nav-active', !isMobileNavActive);
  };

  
  const toggleDropdown = (key) => {
    setActiveDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <header id="header" className={`header d-flex align-items-center sticky-top ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container position-relative d-flex align-items-center justify-content-between">
        {}
        <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
        <img src="/img/Venkatalakshmi Logo.png" alt="Venkatalakshmi Logo" />
          {}
        </a>

        {}
        <nav id="navmenu" className={`navmenu ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
          <ul>
            <li><a href="#hero" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            
            <li><a href="#gallery">Gallery</a></li>
            <li className="dropdown">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                toggleDropdown('main');
              }}>
                <span>Dropdown</span> 
                <i className={`bi ${activeDropdowns['main'] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </a>
              <ul className={activeDropdowns['main'] ? 'dropdown-active' : ''}>
                <li><a href="#">Dropdown 1</a></li>
                <li className="dropdown">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('sub');
                  }}>
                    <span>Deep Dropdown</span> 
                    <i className={`bi ${activeDropdowns['sub'] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </a>
                  <ul className={activeDropdowns['sub'] ? 'dropdown-active' : ''}>
                    <li><a href="#">Deep Dropdown 1</a></li>
                    <li><a href="#">Deep Dropdown 2</a></li>
                    <li><a href="#">Deep Dropdown 3</a></li>
                    <li><a href="#">Deep Dropdown 4</a></li>
                    <li><a href="#">Deep Dropdown 5</a></li>
                  </ul>
                </li>
                <li><a href="#">Dropdown 2</a></li>
                <li><a href="#">Dropdown 3</a></li>
                <li><a href="#">Dropdown 4</a></li>
              </ul>
            </li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="mobile-nav-toggle" onClick={toggleMobileNav}>
            <i className={`bi ${isMobileNavActive ? 'bi-x' : 'bi-list'}`}></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;