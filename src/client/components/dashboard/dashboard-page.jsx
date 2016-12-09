import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DashboardHeader from './dashboard-header.jsx';
import DashboardProjectContainer from './dashboard-project-container.jsx';
const Router = require('react-router');
const request = require('superagent');

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProject: null,
      projects: []
    };
  }

  componentWillMount() {
    if (page.data.user && page.data.user._id) {
      this.loadProjects();
    } else {
      Router.browserHistory.push("/");
    }
  }

  loadProjects() {
    request
      .post('/api/app/all')
      .withCredentials()
      .end((err, res) => {
        console.log(res);
        this.setState({
          projects: JSON.parse(res.text)
        });
      });
  }

  logout() {
    window.location.href = '/logout';
  }

  render() {
    return (
      <div className="dashboard">
        <DashboardHeader/>
        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <h2>Your Apps</h2>
            <ul>
              {this.renderApps()}
            </ul>
            <a href="/dashboard/new"><button>New Application</button></a>
          </div>
          <div className="dashboard-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  renderApps() {
    return this.state.projects.map((project) => {
      return (
        <li key={project._id} className="floating-hover">
          <Link to={"/dashboard/"+project._id}>{project.name}</Link>
        </li>
      );
    });
  }
}
