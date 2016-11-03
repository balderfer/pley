const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./components/landing.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEmail: false,
      navState: 'LANDING',
    };
  }

  componentDidMount() {
    
  }

  getLanding() {
    return <Landing
      displayEmail={this.state.displayEmail}
      navState={this.state.navState}
      setNavState={navState => this.setState({navState})}
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