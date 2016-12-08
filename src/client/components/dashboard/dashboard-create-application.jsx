import React, { PropTypes } from 'react';
import DashboardPage from './dashboard-page.jsx';

export default class DashboardCreateApplication extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <DashboardPage>
        <div className="create-application">
          <div className="dashboard-header dashboard-header-light">
            <div className="breadcrumbs">
              <a href="/dashboard">Dashboard</a>
              <i className="icon ion-chevron-right"></i>
              <h2>Create Application</h2>
            </div>
          </div>
        </div>
      </DashboardPage>
    );
  }
}