import React, { PropTypes } from 'react';
import DashboardHeader from './dashboard-header.jsx';

export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
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
            <ul>
              <li>Project</li>
              <li>Project</li>
              <li>Project</li>
              <li>Project</li>
            </ul>
          </div>
          <div className="dashboard-content">
            Content
          </div>
        </div>
      </div>
    );
  }
}
