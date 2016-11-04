const React = require('react');
const Layout = require('./layout.jsx');

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Layout>
        <div className='about'>
          <div className="container">
            <div className="text-container">
              <h2>About Us</h2>
              <p>We're a group of CS students at Purdue who are passionate about web applications. We believe that the future depends on the liberty to deploy a web application whenever you wish. Help us change the future, just press Pley.</p>
              <br/>
              <br/>
              <a href="mailto:evanw@purdue.edu"><button>Contact Us</button></a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = About;