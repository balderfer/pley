import React, { PropTypes } from 'react';
import Dropdown from './dropdown.jsx';
import { Link } from 'react-router';

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
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="dashboard-header-right">
          <Dropdown align="right"/>
        </div>
      </div>
    );
  }
}
