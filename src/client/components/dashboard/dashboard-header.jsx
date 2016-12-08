import React, { PropTypes } from 'react';
import Dropdown from './dropdown.jsx';

export default class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    window.location.href = '/logout';
  }

  render() {
    return (
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <img src="/logo-light.svg" alt="Pley Logo"/>
          <h1>Pley</h1>
        </div>
        <div className="dashboard-header-right">
          <Dropdown align="right"/>
        </div>
      </div>
    );
  }
}
