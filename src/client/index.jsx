const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./components/landing.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEmail: false,
      navState: 'LANDING',
      verificationEmail: '',
    };
  }

  componentDidMount() {
    
  }

  getLanding() {
    return <Landing
      verificationEmail={this.state.verificationEmail}
      navState={this.state.navState}
      setNavState={navState => this.setState({navState})}
      setVerificationEmail={verificationEmail => this.setState({verificationEmail})}
    />;
  }

  render() {
    return (
      <div>
        {this.getLanding()}
      </div>
    );
  }
}

ReactDOM.render((
  <App/>
), document.getElementById('content'));