import React, { PropTypes } from 'react';

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
        header
      </div>
    );
  }
}
