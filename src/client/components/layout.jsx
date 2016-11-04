const React = require('react');
const Link = require('react-router').Link;

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='layout'>
        <div className="header">
          <div className="container">
            <ul>
              <Link to="/">
                <li className="brand">
                    <img src="./logo.svg" alt="Pley Logo"/>
                </li>
              </Link>
              <Link to="/docs">
                <li className="link">
                    <p>Docs</p>
                </li>
              </Link>
              <Link to="/about">
                <li className="link">
                    <p>About</p>
                </li>
              </Link>
              <Link to="#">
                <li>
                    <button>Sign Up</button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Layout;