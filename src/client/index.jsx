// External Libraries.
// import './lib/fetch.min.js';

const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const IndexRoute = require('react-router').IndexRoute;
const browserHistory = require('react-router').browserHistory;

// Local components.
const Layout = require('./components/layout.jsx');
const Landing = require('./components/landing.jsx');
const Docs = require('./components/docs.jsx');
const About = require('./components/about.jsx');
const Login = require('./components/login.jsx');
import DashboardProjectContainer from './components/dashboard/dashboard-project-container.jsx';
import DashboardCreateApplication from './components/dashboard/dashboard-create-application.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayEmail: false,
      navState: 'LANDING',
      verificationEmail: '',
    };
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
      <Router history={browserHistory}>
        <Route path="/" component={Landing}/>
        <Route path="/docs" component={Docs}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login} 
          setNavState={navState => this.setState({navState})}/>
        <Route path="/dashboard" component={DashboardProjectContainer}/>
        <Route path="/dashboard/new" component={DashboardCreateApplication}/>
        <Route path="/dashboard/:projectId" component={DashboardProjectContainer}/>
      {this.getLanding()}
      </Router>
    );
  }
}

ReactDOM.render((
  <App/>
), document.getElementById('content'));