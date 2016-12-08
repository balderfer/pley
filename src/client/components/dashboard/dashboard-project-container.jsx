import React, { PropTypes } from 'react';
import DashboardPage from './dashboard-page.jsx';

export default class DashboardProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageState: "loading"
    };
  }

  componentWillMount() {
    this.loadProject(page.data.activeProject);
  }

  loadProject(projectId) {
    console.log(projectId);
    if (projectId == null) {
      this.setState({
        pageState: "empty"
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
          <a href="/dashboard/new"><button>Create Application</button></a>
          <p>Still need help? Check out our <a href="/docs">docs</a>.</p>
        </div>
      </div>
    );
  }

  renderLoaded() {
    return (
      <h1>Loaded</h1>
    );
  }
}
