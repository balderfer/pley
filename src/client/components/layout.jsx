const React = require('react');

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
              <a href="/">
                <li className="brand">
                    <img src="./logo.svg" alt="Pley Logo"/>
                </li>
              </a>
              <a href="/docs">
                <li className="link">
                    <p>Docs</p>
                </li>
              </a>
              <a href="/about">
                <li className="link">
                    <p>About</p>
                </li>
              </a>
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