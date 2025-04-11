import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          <span className="subtitle">Learn More</span>{' '}
          <span className="description-title">About Us</span>
        </p>
      </div>

      <div className="container">
        <div className="about-content-wrapper">
          <div className="about-image-column" data-aos="fade-up" data-aos-delay="100">
            <img src="/img/about.jpg" className="main-image" alt="About Our Restaurant" />
            <div className="reservation-card">
              <h3>Book a Table</h3>
              <p className="phone-number">+1 5589 55488 55</p>
            </div>
          </div>

          <div className="about-text-column" data-aos="fade-up" data-aos-delay="250">
            <div className="content">
              <p className="intro-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <ul className="feature-list">
                <li className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                </li>
                <li className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
                </li>
                <li className="feature-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate trideta
                    storacalaperda mastiro dolore eu fugiat nulla pariatur.
                  </span>
                </li>
              </ul>
              
              <p className="description-text">
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident
              </p>

              <div className="video-container">
                <img src="/img/about-2.jpg" className="video-thumbnail" alt="Restaurant Interior" />
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="video-play-button"
                  aria-label="Play video about our restaurant"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;