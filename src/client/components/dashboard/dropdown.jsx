import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    }

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  getButtonClasses() {
    var classes = "button";
    if (this.state.dropdownOpen) classes += " open";
    return classes;
  }

  getIconClasses() {
    var classes = "icon";
    classes += " ion-chevron-" + (this.state.dropdownOpen ? "up" : "down");
    return classes;
  }

  getMenuClasses() {
    var classes = "dropdown-menu";
    if (this.props.align) classes += " dropdown-menu-" + this.props.align;
    return classes;
  }

  render() {
    return (
      <div className="dropdown">
        <a className={this.getButtonClasses()} onClick={this.toggleDropdown}>
          {page.data.user.name}
          <i className={this.getIconClasses()}></i>
        </a>

        <div className={this.getMenuClasses()} hidden={!this.state.dropdownOpen}>
          <ul>
            <li><Link to="/settings">Settings</Link></li>
            <li><a href="/logout">Log Out</a></li>
          </ul>
        </div>
      </div>
    );
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
}
