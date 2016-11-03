
import React, { PropTypes } from 'react';

class Landing extends React.Component {
  render() {
    return (
      <div className="hero">
        <img src="./logo.svg" alt="Pley Logo"/>
        <div className="text-container">
          <h1>Pley</h1>
          <p>
            Pley is a free web application hosting service for Purdue students, built by Purdue students. Get your website up and running so fast.
          </p>
          <input type="text" className="email-textbox  js-email-textbox"></input>
          <a className="get-started  js-get-started"><button>Get Started &rarr;</button></a>
          <br></br>
          <a href="mailto:evanw@purdue.edu"><button>Contact Us</button></a>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  displayEmail: PropTypes.bool,
  navState: PropTypes.string,
  setNavState: PropTypes.func,
};

module.exports = Landing;