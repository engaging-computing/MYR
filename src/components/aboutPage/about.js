import React, { Component }  from "react";
import myrHeaderImage from "./img/queen_status.png";
import myrLogo from "./img/MYR-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBook, faChartPie, faPalette } from "@fortawesome/free-solid-svg-icons";



class About extends Component { 
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
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="# ">About</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="../../">Editor</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/support">Support</a>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-theme text-warning" href="/about/team">Team</a>
                        </li>
                    </ul>
                </div>
            </nav>
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
    myrCharacteristics() {
        return (
            <div className="d-flex justify-content-center my-2">
                <div className="row w-75">
                    <div className="col-lg-4">
                        <div className="icons-none-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="icons-none-icon d-flex">
                                <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faBook} size="5x"></FontAwesomeIcon>
                            </div>
                            <h3 className="text-center">Educational</h3>
                            <p className="lead mb-0 text-center">MYR is an educational tool that strikes a balance with the ease of use and challenge.
                            We drew inspiration from
                            Logo Turtle and Processing to provide a beginner friendly experience for teaching and learning with MYR.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icons-none-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <div className="icons-none-icon d-flex">
                                <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faPalette} size="5x"></FontAwesomeIcon>
                            </div>
                            <h3 className="text-center">Expressive</h3>
                            <p className="lead mb-0 text-center">Delivering a beginner friendly experience in VR can be difficult. MYR provides an easy
                            to use API to interact
                            with the scene. We also provide an integrated environment for learning and expressing your ideas.</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="icons-none-item mx-auto mb-0 mb-lg-3">
                            <div className="icons-none-icon d-flex">
                                <FontAwesomeIcon className="mx-auto my-3 text-theme" icon={faChartPie} size="5x"></FontAwesomeIcon>
                            </div>
                            <h3 className="text-center">Research</h3>
                            <p className="lead mb-0 text-center">This tool was developed by the Engaging Computing Group at UMass Lowell. This project
                            is one step on the way
                            to delivering an educational and engaging experience that is based on constructing VR worlds.</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    myrFeatures() {
        return (
            <div className="d-flex justify-content-center">
                <div className="col-sm-9 col-xs-12">
                    <div className="list-group">
                        <div className="card-header">
                            <h2>Features</h2>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Simple API</h5>
                            </div>
                            <p className="mb-1">Our simple API helps you build virtual scenes and explore programming at the same time.</p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Built for Classrooms</h5>
                            </div>
                            <p className="mb-1">With built in <a href="/about/collections">collections</a>, sharing code with a teacher, club mentor, or other group leader is
                                simple.</p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Save and Share</h5>
                            </div>
                            <p className="mb-1">Once logged in you are able to save your work and share the url with a friend.</p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Real-time Sync</h5>
                            </div>
                            <p className="mb-1">Real-time sync allows you to program and enjoy your work almost instantaneously on a VR
                            headset.</p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Lots of Devices</h5>
                            </div>
                            <p className="mb-1">MYR is built with WebVR and supports almost a wide range of devices ranging from cardboard
                            to full VR rig.</p>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    aboutFooter() {
        return (
            <footer className="footer p-5" style={{backgroundColor: "#EBEDEF"}}>
                <div className="d-flex justify-content-center ">
                    <div className="row">
                        <div className="col h-100 text-center text-lg-start my-auto">
                            <ul className="footer about-footer list-inline mb-2">
                                <li className="footer-links list-inline-item">
                                    <a href="# ">About</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="../../">Editor</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/support ">Support</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/team ">Team</a>
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
                <div>
                    <this.handleNavigation></this.handleNavigation>
                </div>
                <div style={{backgroundColor: "#EBEDEF"}}>
                    <this.myrHeader></this.myrHeader>
                    <this.myrCharacteristics></this.myrCharacteristics>
                    <this.myrFeatures></this.myrFeatures>
                    <this.aboutFooter></this.aboutFooter>
                </div>
            </div>
        );
    }
}

export default About;