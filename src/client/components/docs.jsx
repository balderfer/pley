const React = require('react');
const Layout = require('./layout.jsx');

class Docs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Layout>
        <div className='docs'>
          <div className="container">
            <div className="columns">
              <div className="left">
                <ul className="sidenav">

                  <a href="#Introduction_"><li className="listHeader">
                    Introduction  
                  </li></a>
                  <a href="#What_is_Pley_"><li>
                    What is Pley?
                  </li></a>
                  <a href="#Overview_of_documentation"><li>
                    Overview of documentation
                  </li></a>

                  <a href="#Accessing_the_service"><li className="listHeader">
                    Getting Started
                  </li></a>
                  <a href="#From_the_Purdue_domain_"><li>
                    Creating an account
                  </li></a>
                  <a href="#From_the_CS_Department_website_"><li>
                    The Pley dashboard
                  </li></a>

                  <a href="#Deploying_an_Application"><li className="listHeader">
                    Deploying an Application
                  </li></a>
                  <a href="#Containerizing_application_source_code"><li>
                    Containerizing application source code
                  </li></a>
                  <a href="#Pushing_source_code_to_the_Pley_platform"><li>
                    Pushing source code to the Pley platform
                  </li></a>

                  <a href="#Delete_a_deployed_application"><li>
                    Delete a deployed application
                  </li></a>
                  <a href="#Protect_an_application_with_authentication"><li>
                    Protect an application with authentication
                  </li></a>
                  <a href="#Pause_and_resume_a_deployed_application"><li>
                    Pause and resume a deployed application
                  </li></a>
                  <a href="#View_an_applications_log"><li>
                    View an application’s log
                  </li></a>
                  <a href="#Revert_to_a_previous_deployment_of_an_application"><li>
                    Revert to a previous deployment of an application
                  </li></a>
                  <a href="#Add_collaborators_to_an_application"><li>
                    Add collaborators to an application
                  </li></a>
                  <a href="#Customize_the_subdomain_for_an_application"><li>
                    Customize the subdomain for an application
                  </li></a>
                  <a href="#Use_a_custom_domain_for_an_application"><li>
                    Use a custom domain for an application
                  </li></a>

                </ul>
              </div>
              <div className="right">
                <h2>Documentation</h2>

                <div id="Introduction_" className="section section-header">
                  <h3>Introduction</h3>
                </div>

                <div id="What_is_Pley_" className="section">
                  <h4>What is Pley?</h4>
                  <p>Pley is a free-to-use web application hosting service for Purdue students. It runs a fork of <a href='http://kubernetes.io/'>Kubernetes</a> called <a href='https://docs.openshift.org/'>Open Shift Origin</a> to facilitate application deployment and management.</p>
                  <br />
                  <p>Pley was built by Spencer Brown, Ben Alderfer, Rhys Howell, and Evan Walsh in 2016 for their Software Engineering senior project. It is now maintained by the <a href='https://www.purdueusb.com/'>CS Undergraduate Student Board</a>.</p>
                </div>

                <div id="Overview_of_documentation" className="section">
                  <h4>Overview of documentation</h4>
                  <p>This documentation will teach you everything you need to know about how to get your application running on Pley! We'll walk you through how to register an account, deploy your first application, and monitor your application's status.</p>
                </div>

                <div id="Accessing_the_service" className="section section-header">
                  <h3>Getting Started</h3>
                </div>

                <div id="From_the_Purdue_domain_" className="section">
                  <h4>Creating an account</h4>
                  <p>Creating an account is as easy as entering your Purdue email, following the confirmation link we send you, and completing the registration form with your name and desired password.</p>
                  <br />
                  <p>Head to <a target='blank' href='/'>the homepage</a> to sign up now.</p>
                </div>

                <div id="From_the_CS_Department_website_" className="section">
                  <h4>The Pley dashboard</h4>
                  <p>The Pley dashboard is your Pley home base. It's where you can deploy new applications and monitor your existing ones. Once you've registerd an account, log in from <a href='/'>the homepage</a> to get access the dashboard.</p>
                </div>

                <div id="Deploying_an_Application" className="section section-header">
                  <h3>Deploying an Application</h3>
                </div>

                <div id="Containerizing_application_source_code" className="section">
                  <h4>Containerizing application source code</h4>
                  <p>Pley utilizes <a href='http://kubernetes.io'>Kubernetes</a> to support application deployment. Kubernetes applications run as <a href='https://www.docker.com/'>Docker</a> images, which means you'll need to create a Dockerfile to get started (details below).</p>
                  <br />
                  <p>Once you've written a Dockerfile, just push it to GitHub with the rest of your project. Pley will automatically detect your Dockerfile and build and run your application image once you deploy it via the dashboard.</p>
                  <br />
                  <p>Luckily, creating a Dockerfile isn't too complicated. It usually involves writing less than 10 lines of instructions. <a href='https://docs.docker.com/engine/reference/builder/'>Here</a> are Docker's docs on creating Dockerfiles. <a href='https://nodejs.org/en/docs/guides/nodejs-docker-webapp/'>Here's</a> a guide for creating a Dockerfile for a Node.js application. Dockerfiles for other languages and frameworks will be very similar.</p>
                </div>

                <div id="Pushing_source_code_to_the_Pley_platform" className="section">
                  <h4>Pushing source code to the Pley platform</h4>
                  <p>When you log in for the first time, you'll see a button labeled "Create Application". Click that to get started.</p>
                  <br />
                  <p>Once you're looking at the application creation form, simply enter your desired subdomain name and GitHub URL. Your subdomain will be used as &lt;subdomain&gt;.usb.cs.purdue.edu. Your GitHub URL should be the URL you see in your browser address bar when you're viewing the public repository of the application you want to host on Pley. This repository should include a Dockerfile that can be used to build a Docker image that runs your application.</p>
                </div>

                <div id="Delete_a_deployed_application" className="section">
                  <h4>Delete a deployed application</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Protect_an_application_with_authentication" className="section">
                  <h4>Protect an application with authentication</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Pause_and_resume_a_deployed_application" className="section">
                  <h4>Pause and resume a deployed application</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="View_an_applications_log" className="section">
                  <h4>View an application’s log</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Revert_to_a_previous_deployment_of_an_application" className="section">
                  <h4>Revert to a previous deployment of an application</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Add_collaborators_to_an_application" className="section">
                  <h4>Add collaborators to an application</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Customize_the_subdomain_for_an_application" className="section">
                  <h4>Customize the subdomain for an application</h4>
                  <p><em>Coming soon</em></p>
                </div>

                <div id="Use_a_custom_domain_for_an_application" className="section">
                  <h4>Use a custom domain for an application</h4>
                  <p><em>Coming soon</em></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Docs;
