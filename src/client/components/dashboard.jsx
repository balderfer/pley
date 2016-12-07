import React, { PropTypes } from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.resetCookie = this.resetCookie.bind(this);
  }

  resetCookie() {
    document.cookie = "pleyCoin=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.router.browserHistory.push("/");
  }

  render() {
    return (
      <div>
        <h1>Dashboard!</h1>
        <button
          onClick={this.resetCookie}>
          Sign Out
        </button>
      </div>
    );
  }
}

module.exports = Dashboard;