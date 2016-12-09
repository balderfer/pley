import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DashboardPage from './dashboard-page.jsx';
const request = require('superagent');

export default class DashboardProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageState: "loading",
      projects: [],
      activeProject: null
    };

    this.updateActiveProject = this.updateActiveProject.bind(this);
  }

  componentWillMount() {
    this.loadProject(this.props);
  }

  componentWillUpdate(newProps, newState) {
    if (this.props.params.projectId !== newProps.params.projectId) {
      this.loadProject(newProps);
    }
  }

  loadProject(props) {
    if (props.params && props.params.projectId) {
      if (page.data.projects.length > 0) {
        var projects = page.data.projects;
        for (var i in projects) {
          if (projects[i].name === props.params.projectId) {
            console.log(projects[i]);
            this.setState({
              pageState: "loaded",
              activeProject: projects[i]
            });
          }
        }
      } else {
        request
          .post('/api/app/all')
          .withCredentials()
          .end((err, res) => {
            var projects = JSON.parse(res.text);
            for (var i in projects) {
              if (projects[i].name === props.params.projectId) {
                this.setState({
                  pageState: "loaded",
                  activeProject: projects[i]
                });
              }
            }
          });
      }
    } else {
      this.setState({
        pageState: "empty"
      });
    }
  }

  getActiveProjectName() {
    if (this.props.params && this.props.params.projectId) {
      return this.props.params.projectId;
    } else {
      return null;
    }
  }

  render() {
    return (
      <DashboardPage activeProjectName={this.getActiveProjectName()} updateActiveProject={this.updateActiveProject}>
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
            <h2>{this.state.activeProject.name}</h2>
          </div>
        </div>
        <div className="project">
          <div className="section">
            <h3>URL</h3>
            <a href={this.state.activeProject.lines[0].split(" ")[0]}>{this.state.activeProject.lines[0].split(" ")[0]}</a>
          </div>
          <div className="section">
            <h3>Github URL</h3>
            <a href={this.renderGithubURL()}>{this.renderGithubURL()}</a>
          </div>
          <div className="section">
            <h3>Status</h3>
            {this.renderStatusMessages()}
          </div>
        </div>
      </div>
    );
  }

  renderGithubURL() {
    var array = this.state.activeProject.status.split(" ");
    for (var i in array) {
      if (array[i].indexOf("github.com/") > 0) {
        return array[i];
      }
    }
    return "";
  }

  renderStatusMessages() {
    return this.state.activeProject.lines.map((line) => {
      if (line.indexOf("deployment #") > 0 || line.indexOf("build #") > 0) {
        return (
          <p>{line}</p>
        );
      }
    })
  }

  updateActiveProject(project) {
    this.setState({
      activeProject: project
    });
  }
}
