import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DashboardPage from './dashboard-page.jsx';
const request = require('superagent');

export default class DashboardProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageState: "loading"
    };
  }

  componentWillMount() {
    this.loadProject(this.props.params.projectId);
  }

  componentWillReceiveProps(newProps) {
    this.loadProject(newProps.params.projectId);
  }

  loadProject(projectId) {
    if (projectId == null) {
      this.setState({
        pageState: "empty"
      });
    } else {
      request
        .post('/api/app/' + projectId)
        .withCredentials()
        .end((err, res) => {
          this.setState({
            pageState: "loaded",
            project: JSON.parse(res.text)
          });
        });
    }
  }

  render() {
    return (
      <DashboardPage>
        <div className="project-container">
          {this.renderPageState()}
        </div>
      </DashboardPage>
    );
  }

  renderPageState() {
    switch (this.state.pageState) {
      case "loading":
        return this.renderLoading();
      case "empty":
        return this.renderEmpty();
      case "loaded":
        return this.renderLoaded();        
    }
  }

  renderLoading() {
    return (
      <h1>Loading</h1>
    );
  }

  renderEmpty() {
    return (
      <div className="project-container-empty">
        <div className="text-box">
          <h2>Getting Started</h2>
          <p>Pley makes it easy for you to publish your applications on the internet. Create your first project to get started!</p>
          <Link to="/dashboard/new"><button>Create Application</button></Link>
          <p>Still need help? Check out our <a href="/docs">docs</a>.</p>
        </div>
      </div>
    );
  }

  renderLoaded() {
    return (
      <div className="project-container-loaded">
        <div className="dashboard-header dashboard-header-light">
          <div className="breadcrumbs">
            <a href="/dashboard">Dashboard</a>
            <i className="icon ion-chevron-right"></i>
            <h2>{this.state.project.name}</h2>
          </div>
        </div>
      </div>
    );
  }
}
