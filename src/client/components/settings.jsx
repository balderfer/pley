const request = require('superagent');

const React = require('react');
import DashboardPage from './dashboard/dashboard-page.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsState: 'INPUT',
      name: page.data.user.name,
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

  setSuccessfulSaveAttempt(newSaveState) {
    this.setState({
      successfulSaveAttempt: newSaveState
    });
  }

  updateSaveAttemptStatus() {
    if (this.state.unsuccessfulSaveAttempt) {
      this.setUnsuccessfulSaveAttempt(false);
    }

    if (this.state.successfulSaveAttempt) {
      this.setSuccessfulSaveAttempt(false);
    }
  }

  saveSettings() {
    this.setState({
      inSaveRequest: true
    });

    const dataToSend = {
      name: this.state.name,
      password: this.state.password
    };

    if (this.state.newPassword && this.state.confirmPassword) {
      if (this.state.newPassword !== this.state.confirmPassword || this.state.newPassword.length < 6 || this.state.newPassword.length > 24) {
        this.setState({
          inSaveRequest: false,
          unsuccessfulSaveAttempt: true
        });
        return;
      } else {
        dataToSend.newPassword = this.state.newPassword;
        dataToSend.confirmPassword = this.state.confirmPassword;
      }
    }

    request
      .post('/settings')
      .set('Content-Type', 'application/json')
      .send(dataToSend)
      .withCredentials()
      .end((err, res) => {
        this.setState({
          inSaveRequest: false
        });

        if (res.statusCode !== 200) {
          this.setUnsuccessfulSaveAttempt(true);
        } else {
          page.data.user.name = dataToSend.name;

          this.setSuccessfulSaveAttempt(true);
        }
      });
  }

  renderSuccessfulSaveAttemptMessages() {
    if (this.state.successfulSaveAttempt) {
      return (
        <div className="input-row">
          <p className="settingsSuccessMessage">Save success!</p>
        </div>
      );
    }
  }

  renderUnsuccessfulSaveAttemptMessages() {
    if (this.state.unsuccessfulSaveAttempt) {
      return (
        <div className="input-row">
          <p className="settingsErrorMessage">Error updating settings, did you supply the correct password? Please try again.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <DashboardPage>
        <div className="settings-container">
          <div className="text-container  form">
            <div className="input-row">
              <h2>Settings</h2>
            </div>

            <div className="input-row">
              <label htmlFor="name">Name</label>
              <input type="text"
                id="name"
                className="nameInput"
                placeholder="Name"
                onChange={e => {
                  this.setName(e.target.value);
                }}
                value={this.state.name}
              />
            </div>
            
            <div className="input-row">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password"
                id="currentPassword"
                className="passwordInput"
                placeholder="Current Password"
                onChange={e => {
                  this.setPassword(e.target.value);
                }}
                value={this.state.password}
              />
            </div>

            <div className="input-row">
              <label htmlFor="newPassword">New Password <span className="smallSettingsLabel">(Leave this blank if you don{'\''}t want to change it.)</span></label>
              <input type="password"
                id="newPassword"
                className="passwordInput"
                placeholder="New Password"
                minLength="6" 
                maxLength="24"
                onChange={e => {
                  this.setNewPassword(e.target.value);
                }}
                value={this.state.newPassword}
              />
            </div>
            
            <div className="input-row">
              <label htmlFor="newPasswordConfirm">Confirm new password</label>
              <input type="password"
                id="newPasswordConfirm"
                className="passwordInput"
                placeholder="Re-Enter New Password"
                minLength="6" 
                maxLength="24"
                onChange={e => {
                  this.setConfirmPassword(e.target.value);
                }}
                value={this.state.confirmPassword}
              />
            </div>
            
            <div className="input-row">
              <button
                className="saveSettings"
                onClick={() => {
                  if(!this.state.inSaveRequest) {
                    this.saveSettings();
                  }
                }}>
                Save
              </button>
            </div>
            
            {this.renderSuccessfulSaveAttemptMessages()}
            {this.renderUnsuccessfulSaveAttemptMessages()}
          </div>
        </div>
      </DashboardPage>
    );
  }
}

module.exports = Settings;