
import React, { PropTypes } from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  sendVerificationEmail() {
    // TODO:
    console.log('Send them an email.');

    const verificationCreationUrl = '/verify';

    $.ajax({
      type: 'POST',
      url: verificationCreationUrl,
      data: {
        email: this.props.verificationEmail
      },
      success: (data) => {
        console.log('post success! data:',data);
      }
    });
  }

  getContent() {
    if (this.props.navState === 'LANDING') {
      return (
        <a>
          <button
            onClick={() => {
              this.props.setNavState('EMAIL');
            }}>
            Get Started &rarr;
          </button>
        </a>
      );
    } else if (this.props.navState === 'EMAIL') {
      return (
        <a>
          <input type="text" className="email-textbox" placeholder="Email"
            onChange={e => {
              this.props.setVerificationEmail(e.target.value);
            }}
            value={this.props.verificationEmail}></input>
          <button
            onClick={() => {
              this.sendVerificationEmail();
              this.props.setNavState('SENT');
            }}>
            Let{'\''}s Go &rarr;
          </button>
        </a>
      );
    } else if (this.props.navState === 'SENT') {
      return <div>
              <p>
                &#10003; We{'\''}ve sent you an email with a verification link in it.
                Please open it and click on the link so we can ensure you{'\''}re a Purdue student.
              </p>
            </div>;
    }
  }

  render() {
    return (
      <div className="hero">
        <img src="./logo.svg" alt="Pley Logo"/>
        <div className="text-container">
          <h1>Pley</h1>
          <p>
            Pley is a free web application hosting service for Purdue students, built by Purdue students. Get your website up and running so fast.
          </p>
          {this.getContent()}
          <br></br>
          <a href="mailto:usb@cs.purdue.edu">
            <button>Contact Us</button>
          </a>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  navState: PropTypes.string,
  verificationEmail: PropTypes.string,
  setNavState: PropTypes.func,
  setVerificationEmail: PropTypes.func
};

module.exports = Landing;