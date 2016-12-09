const React = require('react');
const Layout = require('./layout.jsx');

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsState: 'INPUT',
      // name: page.data.user.name,
      password: '',
      newPassword: '',
      confirmPassword: '',
      inSaveRequest: false,
      unsuccessfulSaveAttempt: false,
      successfulSaveAttempt: false
    };
  }

  componentDidMount() {
    
  }

  setPassword(newPassword) {
    this.updateSaveAttemptStatus();

    this.setState({
      password: newPassword
    });
  }

  setNewPassword(newPassword) {
    this.updateSaveAttemptStatus();

    this.setState({
      newPassword: newPassword
    });
  }

  setConfirmPassword(newPassword) {
    this.updateSaveAttemptStatus();

    this.setState({
      confirmPassword: newPassword
    });
  }

  setName(newName) {
    this.updateSaveAttemptStatus();

    this.setState({
      name: newName
    });
  }

  setUnsuccessfulSaveAttempt(newSaveState) {
    this.setState({
      unsuccessfulSaveAttempt: newSaveState
    });
  }

  updateSaveAttemptStatus() {
    if (this.state.unsuccessfulSaveAttempt) {
      this.setUnsuccessfulSaveAttempt(false);
    }

    if (this.state.successfulSaveAttempt) {
      this.setUnsuccessfulSaveAttempt(false);
    }
  }

  saveSettings() {
    const dataToSend = {
      name: this.state.name,
      currentPassword: this.state.password
    };

    if (this.state.password && this.state.confirmPassword) {
      dataToSend.password = this.state.newPassword;
      dataToSend.confirmPassword = this.state.confirmPassword;
    }

    $.post({
      url: '/settings', 
      data: dataToSend,
      error: () => {
        setUnsuccessfulSaveAttempt(true);
      }}).done((data, status, xhr) => {
        if (xhr.status != 200) {
          setUnsuccessfulSaveAttempt(true);
        } else {
          setSuccessfulSaveAttempt(true);
        }
      });
  }

  renderSuccessfulSaveAttemptMessages() {
    if (this.state.successfulSaveAttempt) {
      return (
        <div>
          <p className="errorMessage">Error updating settings, please try again.</p>
        </div>
      );
    }
  }

  renderUnsuccessfulSaveAttemptMessages() {
    if (this.state.unsuccessfulSaveAttempt) {
      return (
        <div>
          <p className="errorMessage"></p>
        </div>
      );
    }
  }

  render() {
    return (
      <Layout>
        <div className='about'>
          <div className="container">
            <div className="text-container">
              <h2>Settings</h2>
              <br/>
              <br/>
              <input className=""></input>
              <input type="text"
                className="nameInput"
                placeholder="Name"
                onChange={e => {
                  this.setName(e.target.value);
                }}
                value={this.state.name}
              />

              <input type="password"
                className="passwordInput"
                placeholder="Current Password"
                onChange={e => {
                  this.setPassword(e.target.value);
                }}
                value={this.state.password}
              />
              <input type="password"
                className="passwordInput"
                placeholder="New Password (Leave blank if you don't want to update)"
                onChange={e => {
                  this.setPassword(e.target.value);
                }}
                value={this.state.newPassword}
              />
              <input type="password"
                className="passwordInput"
                placeholder="Re-Enter New Password"
                onChange={e => {
                  this.setConfirmPassword(e.target.value);
                }}
                value={this.state.confirmPassword}
              />
              <input type="button"
                className="saveSettings"
                onClick={() => {
                  if(!this.state.inSaveRequest) {
                    this.saveSettings();
                  }
                }}>
                Save
              </input>
              {this.renderSuccessfulSaveAttemptMessages()}
              {this.renderUnsuccessfulSaveAttemptMessages()}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Settings;