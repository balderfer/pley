import './../lib/fetch-min.js';

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
      inLoginRequest: false
    };
  }

  componentDidMount() {
    
  }

  login(email, password) {
    console.log('Log them in!');

    this.setInLoginRequest(true);
    this.setLoginState('LOGGING_IN');

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then((response) => {
      this.setInLoginRequest(false);
      if(response.status === 200) {
        return response.json();
        // console.log('response:',);
        // Save the token locally.
        // $window.sessionStorage.token = response.body.;
      } else if(response.status === 401) {
        this.setLoginState('INPUT');
      } else if(response.status === 400) {
        this.setLoginState('INPUT');
      }
    }).then((json) => {
      if(json && json.token) {
        console.log('Assigning token:', json.token);

        const cookieLength = 1000 /* 1000 days from now. */ *24*60*60*1000;
        const expiresDate = new Date();
        expiresDate.setTime(Date.now() + cookieLength);
        const expiresString = 'expires=' + expiresDate.toUTCString();

        document.cookie = 'pleyCoin=' + json.token + '; ' + expiresString;

        // Redirect to the main page.
        Router.browserHistory.push('/');
        // console.log('props', this.props);
        // this.props.route.setNavState('LANDING');
      }
    }).catch((ex) => {
      console.log('parsing failed', ex)
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

  renderLoginStatus() {
    if (this.state.loginState === 'INPUT') {
      return (
        <div className="loginForm">
          <input
            type="text"
            className="emailInput"
            placeholder="Email"
            onChange={e => {
              this.setEmail(e.target.value);
            }}
            value={this.state.email}
          />
          <br/>
          <input
            type="password"
            className="passwordInput"
            placeholder="Password"
            onChange={e => {
              this.setPassword(e.target.value);
            }}
            value={this.state.password}
          />
          <p className="inputNote"></p>
          <button
            onClick={() => {
              if(!this.state.inLoginRequest) {
                this.login(this.state.email, this.state.password);
              }
            }}>
            Sign In &rarr;
          </button>
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