import React, { Component } from "react";

/**
 * React component class for the footer includes link to about page, privacy policy, TOS, etc.
 */
class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="row m-3 text-center" >
                    <div className="col-lg-4 d-flex">
                        <span><strong>MYR:</strong></span>
                        <ul className="pl-2 list-inline">
                            <li className="pl-2 list-inline-item">
                                <a href="https://learnmyr.org/about/" target="_blank" rel="noopener noreferrer">About</a>
                            </li>
                            <li className="pl-2 list-inline-item">
                                <a href="mailto:support@learnmyr.org" target="_blank" rel="noopener noreferrer">Support</a>
                            </li>
                            <li className="pl-2 list-inline-item">
                                <a href="https://learnmyr.org/about/team/" target="_blank" rel="noopener noreferrer">Team </a>
                            </li>
                            <li className="pl-2 list-inline-item">
                                <a href="https://github.com/engaging-computing/MYR" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 d-none d-md-block text-center">
                        <div>© 2018 - {new Date().getFullYear()}<span>&nbsp;</span>
                            <a href="https://sites.uml.edu/engaging-computing/" target="_blank" rel="noopener noreferrer">University of Massachusetts Lowell, Engaging Computing Group</a>
                        </div>
                    </div>
                    <div className="col-sm-12 d-block d-md-none text-center">
                        <div>© 2018 - {new Date().getFullYear()}<br />
                            <a href="https://sites.uml.edu/engaging-computing/" target="_blank" rel="noopener noreferrer">University of Massachusetts Lowell,<br />Engaging Computing Group</a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <ul className=" list-inline text-lg-right">
                            <li className="pl-2 list-inline-item">
                                <a href="https://learnmyr.org/about/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                            </li>
                            <li className="pl-2 list-inline-item">
                                <a href="https://learnmyr.org/about/tos/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer >
        );
    }
}


export default Footer;
