import React, { PropTypes } from 'react';
import DashboardPage from './dashboard-page.jsx';
const request = require('superagent');
const Router = require('react-router');

export default class DashboardCreateApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appName: "",
      ghUrl: "",
      inRequest: false,
      applicationState: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.appNameChanged = this.appNameChanged.bind(this);
    this.ghUrlChanged = this.ghUrlChanged.bind(this);
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
              <input name="appName" id="appName" type="text" value={this.state.appName} onChange={this.appNameChanged}/>
            </div>
            
            <div className="input-row">
              <label htmlFor="ghurl">Github URL</label>
              <input name="ghurl" id="ghurl" type="text" value={this.state.ghUrl} onChange={this.ghUrlChanged}/>
            </div>
                        
            <div className="input-row">
              <button onClick={this.submitForm}>Continue</button>
            </div>

            {this.renderApplicationState()}
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

  ghUrlChanged(e) {
    this.setState({
      ghUrl: e.target.value
    });
  }

  setInRequest(newInRequest) {
    this.setState({
      inRequest: newInRequest
    });
  }

  setApplicationState(newState) {
    this.setState({
      applicationState: newState
    });
  }

  renderApplicationState() {
    if (this.state.applicationState === 'REQUESTING') {
      return (
        <div className="input-row">
          <a className="applicationCreationWorking">Working... This may take up to 30 seconds.</a>
        </div>
      );
    } else if(this.state.applicationState === 'BUILDING') {
      return (
        <div className="input-row">
          <a className="applicationCreationBuilding">Success! Your application is now building. <br/><br/>If you refresh it will appear on the sidebar momentarily.</a>
        </div>
      );
    }
  }

  submitForm() {
    if (!this.state.inRequest) {
      this.setInRequest(true);
      this.setApplicationState('REQUESTING');

      request
        .post('/api/app/create')
        .set('Content-Type', 'application/json')
        .send({
          applicationName: this.state.appName,
          githubUrl: this.state.ghUrl
        })
        .withCredentials()
        .end((err, res) => {
          this.setInRequest(false);

          if (res.status === 200) {
            this.setApplicationState('BUILDING');
            // Router.browserHistory.push('/dashboard/' + this.state.appName);
          }
        });
    }
  }
}