import React, { PropTypes } from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    window.location.href = '/logout';
  }

  render() {
    return (
      <div>
        <h1>Dashboard!</h1>
        <button
          onClick={this.logout}>
          Sign Out
        </button>
      </div>
    );
  }
}

module.exports = Dashboard;