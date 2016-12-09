const request = require('superagent');

const React = require('react');
const Router = require('react-router');

const Layout = require('./layout.jsx');

/**
 * This manages the client side login process.
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginState: 'INPUT',
      email: '',
      password: '',
      loadingDots: '',
      inLoginRequest: false,
      unsuccessfulLoginAttempt: false
    };
  }

  login(email, password) {
    console.log('Log them in!');

    if (this.state.unsuccessfulLoginAttempt) {
      this.setState({
        unsuccessfulLoginAttempt: false
      });
    }

    this.setInLoginRequest(true);
    this.setLoginState('LOGGING_IN');

    request
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        email: email,
        password: password
      })
      .withCredentials()
      .end((err, res) => {
        if (err || res.statusCode !== 200) {
          this.setState({
            unsuccessfulLoginAttempt: true
          });

          this.setInLoginRequest(false);
          this.setLoginState('INPUT');
        } else {
          window.location = '/dashboard';
        }
      });
  }

  setLoginState(newLoginState) {
    this.setState({
      loginState: newLoginState
    });
  }

  setPassword(newPassword) {
    this.setState({
      password: newPassword
    });
  }

  setEmail(newEmail) {
    this.setState({
      email: newEmail
    });
  }

  setInLoginRequest(newRequestState) {
    this.setState({
      inLoginRequest: newRequestState
    });
  }

  getLoginMessage() {
    if (this.state.unsuccessfulLoginAttempt) {
      return 'Invalid email or password';
    }
  }

  renderLoginStatus() {
    if (this.state.loginState === 'INPUT') {
      return (
        <div className="dashboard  loginForm  form">
          <div className="input-row">
            <label>Email</label>
            <input
              type="text"
              className="emailInput"
              placeholder="Email"
              onChange={e => {
                this.setEmail(e.target.value);

                if (this.state.unsuccessfulLoginAttempt) {
                  this.setState({
                    unsuccessfulLoginAttempt: false
                  });
                }
              }}
              value={this.state.email}
            />
          </div>

          <div className="input-row">
            <label>Password</label>
            <input
              type="password"
              className="passwordInput"
              placeholder="Password"
              onChange={e => {
                this.setPassword(e.target.value);

                if (this.state.unsuccessfulLoginAttempt) {
                  this.setState({
                    unsuccessfulLoginAttempt: false
                  });
                }
              }}
              value={this.state.password}
            />
          </div>

          <div className="input-row">
            <button
              onClick={() => {
                if(!this.state.inLoginRequest) {
                  this.login(this.state.email, this.state.password);
                }
              }}>
              Sign In &rarr;
            </button>
          </div>

          <div className="input-row">
            <a className="loginMessage">{this.getLoginMessage()}</a>
          </div>
        </div>
      );
    } else if (this.state.loginState === 'LOGGING_IN') {
      return (
        <div className="loginForm">
          <p>Working{this.state.loadingDots}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <Layout>
        <div className='about'>
          <div className="container">
            <div className="text-container">
              <h2>Sign in</h2>
            </div>
            {this.renderLoginStatus()}
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Login;