
import React, { PropTypes } from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navState: 'LANDING',
      email: ''
    };
  }

  sendVerificationEmail() {
    // TODO:
    console.log('Send them an email.');

    const verificationCreationUrl = '/verify';

    $.post(verificationCreationUrl, {
      email: this.state.email
    }, (data) => {
      console.log('posted! data:', data);
    });
  }

  setNavState(newNavState) {
    this.setState({
      navState: newNavState
    });
  }

  setEmail(newEmail) {
    this.setState({
      email: newEmail
    });
  }

  renderMessage() {
    if (this.state.navState === 'SENT') {
      return (
        <div className="text-container">
          <p className="small">
            &#10003; We{'\''}ve sent you an email with a verification link in it.
            Please open it and click on the link so we can ensure you{'\''}re a Purdue student.
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="hero">
        <div className="container">
          <div className="text-container">
            <h1>Pley</h1>
            <p>
              Pley is a free web application hosting service for Purdue students, built by Purdue students. Get your website up and running so fast.
            </p>
          </div>
          <div className="emailForm">
            <input
              type="text"
              className="emailInput"
              placeholder="Email"
              onChange={e => {
                this.setEmail(e.target.value);
              }}
              value={this.state.email}
            />
            <button
              onClick={() => {
                this.sendVerificationEmail();
                this.setNavState('SENT');
              }}>
              Sign Up &rarr;
            </button>
          </div>
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}

module.exports = Landing;