import { Hidden } from "@material-ui/core";
import React, { Component }  from "react";
import myrHeaderImage from "./img/queen_status.png";
import myrLogo from "./img/MYR-Logo.png";

class AboutCollections extends Component {
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
    
    collectionsHeader() {
        return (
            <section className="collections ">
                <div className="container w-75">
                    <div className="row p-3">
                        <div className="col-md-12 lead ">
                            <h3 className="text-center display-4">MYR Collections</h3>
                            <p className="text-center ">
                                MYR Collections are a way for students to easily submit scenes to one location. Students are able
                                to add a collection ID to
                                their scene which allows you as a teacher to easily see all scenes submitted in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        ); 
    }

    collectionsFeatures() {
        return (
            <section className="faq">
                <div className="d-flex justify-content-center">
                    <div className="col-sm-9 col-xs-12">
                        <div className="list-group">
                            <div className="card-header">
                                <h2>Frequently Asked Questions</h2>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">What are MYR collections?</h5>
                                </div>
                                <p className="mb-1">MYR collections are a way for people such as teachers and club presidents to
                                    share projects. Any user
                                    can create a collection code that any other user can then add to their scene. The owner of
                                    the
                                    collection code can then see of all the projects with that code in one place.</p>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Who can create a collection?</h5>
                                </div>
                                <p className="mb-1">Any MYR user can create a collection! All you need to create a collection is to be
                                    logged in.</p>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">How do I create a collection?</h5>
                                </div>
                                <p className="mb-1">To create a collection, open the hamburger menu (the three lines) in the top left
                                    corner. From there,
                                    select the "collections" option. Select the create a className option, enter your className code of
                                    choice,
                                    and click submit!</p>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">I got a message saying my class code is already taken. What does this mean?
                                    </h5>
                                </div>
                                <p className="mb-1">Another MYR user has already added a collection with that code. Please choose a
                                    unique collection name.</p>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Who can add to a collection?</h5>
                                </div>
                                <p className="mb-1">Any MYR user can add a collection code to their project. There are no special
                                    permissions or restrictions
                                    required.</p>
                            </div>
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">How do I get help if my question isn't answered here?</h5>
                                </div>
                                <p className="mb-1">Please reach out! Check our <a href="../support">support page</a> to see how to reach us.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } 


    collectionsFooter() {
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
            <div style={{overflow: Hidden}}>
                <div>
                    <this.handleNavigation></this.handleNavigation>
                </div>
                <div style={{backgroundColor: "#EBEDEF"}}>
                    <this.myrHeader></this.myrHeader>
                    <this.collectionsHeader></this.collectionsHeader>
                    <this.collectionsFeatures></this.collectionsFeatures>
                    <this.collectionsFooter></this.collectionsFooter>
                </div>
            </div>
        );
    }
}

export default AboutCollections; 