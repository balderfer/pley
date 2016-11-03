const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const browserHistory = require('react-router').browserHistory;
const Layout = require('./components/layout.jsx');
const Landing = require('./components/landing.jsx');
const Docs = require('./components/docs.jsx');
const Contact = require('./components/contact.jsx');

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
      <Layout>
        <Router history={browserHistory}>
          <Route path="/" component={Landing}/>
          <Route path="/docs" component={Docs} />
          <Route path="/contact" component={Contact} />
        {this.getLanding()}
        </Router>
      </Layout>
    );
  }
}

ReactDOM.render((
  <App/>
), document.getElementById('content'));