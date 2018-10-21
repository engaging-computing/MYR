import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row m-3 text-center" >
          <div className="col-lg-4 d-flex">
            <span><strong>MYR:</strong></span>
            <ul className="pl-2 list-inline">
              <li className="pl-2 list-inline-item">
                <a href="https://learnmyr.org/about/">About</a>
              </li>
              <li className="pl-2 list-inline-item">
                <a href="mailto:support@learnmyr.org" >Support</a>
              </li>
              <li className="pl-2 list-inline-item">
                <a href="https://learnmyr.org/about/team/">Team </a>
              </li>
              <li className="pl-2 list-inline-item">
                <a href="https://github.com/isenseDev/MYR" >GitHub</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 text-center">
            <div>© 2018 - <span>&nbsp;</span>
              <a href="https://sites.uml.edu/engaging-computing/">Engaging Computing Group</a>
            </div>
          </div>
          <div className="col-lg-4">
            <ul className=" list-inline text-lg-right">
              <li className="pl-2 list-inline-item">
                <a href="https://learnmyr.org/about/privacy/">Privacy Policy</a>
              </li>
              <li className="pl-2 list-inline-item">
                <a href="https://learnmyr.org/about/tos/">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </footer >
    );
  }
}


export default Footer;
