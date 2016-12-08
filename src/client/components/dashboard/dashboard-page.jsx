import React, { PropTypes } from 'react';
import DashboardHeader from './dashboard-header.jsx';
import DashboardProjectContainer from './dashboard-project-container.jsx';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProject: null
    };
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
              <li className="floating-hover">App</li>
              <li className="floating-hover">App</li>
              <li className="floating-hover">App</li>
              <li className="floating-hover">App</li>
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
}
