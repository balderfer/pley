import React, { PropTypes } from 'react';
import DashboardPage from './dashboard-page.jsx';
const request = require('superagent');
const Router = require('react-router');

export default class DashboardCreateApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: ""
    };

    this.submitForm = this.submitForm.bind(this);
    this.appNameChanged = this.appNameChanged.bind(this);
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

          <div className="create-application-form form form-large">
            <div className="input-row">
              <label htmlFor="appName">Application Name</label>
              <input name="appName" type="text" value={this.state.appName} onChange={this.appNameChanged}/>
            </div>
            <div className="input-row">
              <button onClick={this.submitForm}>Continue</button>
            </div>
          </div>
        </div>
      </DashboardPage>
    );
  }

  appNameChanged(e) {
    this.setState({
      appName: e.target.value
    });
  }

  submitForm() {
    request
      .post('/api/app/create')
      .set('Content-Type', 'application/json')
      .send({
        applicationName: this.state.appName
      })
      .withCredentials()
      .end((err, res) => {
        if (res.status === 200 && res.body && res.body._id) {
          Router.browserHistory.push('/dashboard/' + res.body._id);
        }
      });
  }
}