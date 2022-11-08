import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAt, faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component }  from "react";
import myrLogo from "./img/MYR-Logo.png";
import myrHeaderImage from "./img/queen_status.png";

class Support extends Component {
    handleNavigation() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-theme static-top fixed-top text-uppercase px-3" id="mainNav" style={{backgroundColor: "#4E4E4E"}}>
                <a className="navbar-brand text-theme mx-2 text-warning" href="../">
                    <img src={myrLogo} width="30 " height="30 " className="d-inline-block align-top " alt=" "></img>
                    MYR
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav-orange ms-auto " >
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/">About</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="../../">Editor</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="# ">Support</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="# ">Team</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    supportHeader() {
        return (
            <div className="container my-3">
                <div className="row ">
                    <div className="col-md-12 lead ">
                        <h3 className="text-center ">MYR Support</h3>
                        <p className="text-center ">
                            Need help? Have an issue? We're here to help.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    supportGrid() {
        return (
            <div className="container ">
                <div className="row ">
                    <div className="col-lg-4 ">
                        <div className="icons-hover-item mx-auto mb-5 mb-lg-0 mb-lg-3 ">
                            <a href="mailto:support@learnmyr.org" className="icons-hover-link">
                                <div className="icons-hover-icon d-flex ">
                                    <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faAt} size="5x"></FontAwesomeIcon>
                                </div>
                            </a>
                            <h3 className="text-center">Contact Us</h3>
                            <p className="lead mb-0 text-center">
                            We want your input: questions, bug reports, complaints, praise, feature requests — every little bit helps.
                            Let us know what
                            we can do to improve MYR.
                                <br />
                                <a href="mailto:support@learnmyr.org ">support@learnmyr.org</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 ">
                        <div className="icons-hover-item mx-auto mb-5 mb-lg-0 mb-lg-3 ">
                            <a href="https://github.com/engaging-computing/MYR" target="noopener" className="icons-hover-link">
                                <div className="icons-hover-icon d-flex ">
                                    <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faBug} size="5x"></FontAwesomeIcon>
                                </div>
                            </a>
                            <h3 className="text-center">Found a bug?</h3>
                            <p className="lead mb-0 text-center">If you found a bug, please let us know! 
                                You can send us an email at <a href="mailto:support@learnmyr.org ">support@learnmyr.org</a> or submit an issue on our <a href="https://github.com/engaging-computing/MYR ">GitHub</a>.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 ">
                        <div className="icons-hover-item mx-auto mb-0 mb-lg-3 ">
                            <a href="https://github.com/engaging-computing/MYR" target="noopener" className="icons-hover-link">
                                <div className="icons-hover-icon d-flex ">
                                    <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faGithub} size="5x"></FontAwesomeIcon>
                                </div>
                            </a>
                            <h3 className="text-center">Open Source</h3>
                            <p className="lead mb-0 text-center">Looking to contribute or extend MYR? Just curious about the code behind MYR?
                                <br />Head over to our <a href="https://github.com/engaging-computing/MYR ">GitHub</a> page! </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    myrHeader() {
        return (
            <header>
                <div className="container text-center mt-5 pt-5 pb-2">
                    <div className="row align-items-center">
                        <div className="col-md mx-2" >
                            <h1 className="display-4 fw-light ">MYR</h1>
                            <p className="lead mb-4 ">A virtual reality experience for the classroom.</p>
                        </div>
                        <div className="col-md mx-2">
                            <div className="card ">
                                <img src={myrHeaderImage} className="card-img-top " alt="User Example - Queen Status by Shandira Ferguson "></img>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
    supportFooter() {
        return (
            <footer className="footer p-5" style={{backgroundColor: "#EBEDEF"}}>
                <div className="d-flex justify-content-center ">
                    <div className="row">
                        <div className="col h-100 text-center text-lg-start my-auto">
                            <ul className="footer about-footer list-inline mb-2">
                                <li className="footer-links list-inline-item">
                                    <a href="/about/ ">About</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="../../">Editor</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="# ">Support</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="# ">Team</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/tos ">Terms of Service</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/privacy">Privacy Policy</a>
                                </li>
                            </ul>
                            <p className="small mb-4 mb-lg-0 about-footer">&copy; 2018 - <span id="date"></span> - University of Massachusetts Lowell,
                                <a href="https://sites.uml.edu/engaging-computing "> Engaging Computing Group</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    render() {
        return (
            <div>
                <this.handleNavigation></this.handleNavigation>
                <div style={{backgroundColor: "#EBEDEF"}}>
                    <this.myrHeader></this.myrHeader>
                    <this.supportHeader></this.supportHeader>
                    <this.supportGrid></this.supportGrid>
                    <this.supportFooter></this.supportFooter>
                </div>
            </div>
        );
    }
}

export default Support; 