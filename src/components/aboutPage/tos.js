import React, { Component }  from "react";
import myrLogo from "./img/MYR-Logo.png";
import myrHeaderImage from "./img/queen_status.png";

class Tos extends Component {
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
    
    privacyPolicy() {
        return (
            <div className="row justify-content-center ">
                <div className="col-sm-9 col-xs-12 ">
                    <div className="list-group ">
                        <div className="card-header ">
                            <h2 className="text-center ">Terms of Service</h2>
                            <p className="text-center ">
                                <a>MYR is governed by the below terms of service.</a>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h1 className="mb-1 "> Terms of Service</h1>
                                <small>Effective date: October 01, 2018</small>
                            </div>
                            <p className="mb-1 ">
                                <p>University of Massachusetts Lowell, Engaging Computing Group (&quot;us&quot;, &quot;we&quot;, or
                                &quot;our&quot;)
                                operates the <a href="http://learnmyr.org ">learnmyr.org</a> website (the &quot;Service&quot;).</p>
                                <p>The Service is also governed by our Privacy Policy located at <a href="../privacy ">learnmyr.org/about/privacy</a>.
                                    <br /> In addition, it is also governed by any applicable University of Massachusetts Lowell
                                    Informational Technology
                                    policies located at <a href="http://uml.edu/it/policies " target="_blank ">uml.edu/it/policies</a>.</p>
                                <p>This page informs you of our policies regarding your use of the Service.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Information Collection And Use</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>By accessing the website at <a href="http://learnmyr.org ">learnmyr.org</a>, you are agreeing to be bound by these terms of service,
                                    all applicable laws and regulations,
                                    and agree that you are responsible for compliance with any applicable local laws. If you do not agree
                                    with
                                    any of these terms, you are prohibited from using or accessing this site. The materials contained in
                                    this
                                    website are protected by applicable copyright and trademark law.
                                </p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Use License</h2>
                            </div>
                            <p className="mb-1 ">
                                <p> The Service is granted use under an MIT license.</p>
                                <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
                                associated
                                documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including
                                without
                                limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
                                of
                                the Software, and to permit persons to whom the Software is furnished to do so, subject to the following
                                conditions:
                                </p>
                                <p>The above copyright notice and this permission notice shall be included in all copies or substantial
                                portions
                                of the Software.</p>
                                <p>
                                The software is provided &quot;as is&quot;, without warranty of any kind, express or implied, including
                                but not limited to
                                the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
                                shall
                                the authors or copyright holders be liable for any claim, damages or other liability, whether in an
                                action
                                of contract, tort or otherwise, arising from, out of or in connection with the software or the use or
                                other
                                dealings in the software. </p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Disclaimer</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>The materials on the Service are provided on an &#39;as is&#39; basis. We make no warranties, expressed
                                or
                                implied, and hereby disclaims and negates all other warranties including, without limitation, implied
                                warranties
                                or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
                                property
                                or other violation of rights.</p>
                
                                <p>Further, we do not warrant or make any representations concerning the accuracy, likely results, or
                                reliability
                                of the use of the materials on its website or otherwise relating to such materials or on any sites
                                linked
                                to this site. </p>
                
                                <p>The Service may be modified at any time for any reason without notice. We do not make any claims for
                                the continued
                                availability of any feature or the Service as a whole.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Limitations</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages
                                for
                                loss of data or profit, or due to business interruption) arising out of the use or inability to use the
                                materials
                                on the Service, even if we or one of our authorized representatives have been notified orally or in
                                writing
                                of the possibility of such damage. Because some jurisdictions do not allow limitations on implied
                                warranties,
                                or limitations of liability for consequential or incidental damages, these limitations may not apply to
                                you.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Availability</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We make no claims for any level of availability of the Service. We reserve the right to restrict use of
                                the
                                Service at any time for maintenance, upgrades, repairs, or for any other reason. We reserve the right to
                                restrict access partially or in whole to any individual or any group at any time for any reason. We have
                                no duty to notify said individual or group or provide a reason to said individual or group.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Accuracy of Materials</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>The materials appearing on the Service could include technical, typographical, or photographic errors.
                                We do
                                not warrant that any of the materials on its website are accurate, complete or current. We may make
                                changes
                                to the materials contained on its website at any time without notice. However we do not make any
                                commitment
                                to update the materials.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">External Links</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We have not reviewed all of the sites linked to its website and is not responsible for the contents of
                                any
                                such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any
                                such
                                linked website is at the user&#39;s own risk.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Modifications</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>We may revise these terms of service for its website at any time without notice. By using this website
                                you
                                are agreeing to be bound by the then current version of these terms of service.</p>
                            </p>
                        </div>
                        <div className="list-group-item list-group-item-action flex-column align-items-start ">
                            <div className="d-flex w-100 justify-content-between ">
                                <h2 className="mb-1 ">Contact Us</h2>
                            </div>
                            <p className="mb-1 ">
                                <p>If you have any questions about these Terms of Service, please contact us:</p>
                                <ul>
                                    <li>By email: <a href="mailto:tos@learnmyr.org " target="_blank ">tos@learnmyr.org</a>
                                    </li>
                    
                                    <li>By mail: </li>
                                    <blockquote>Engaging Computing Group
                                        <br /> Department of Computer Science
                                        <br /> 1 University Avenue
                                        <br /> Lowell, MA 01854</blockquote>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    collectionsFooter() {
        return (
            <footer className="footer bg-light ">
                <div className="container ">
                    <div className="row ">
                        <div className="col h-100 text-center text-lg-start my-auto">
                            <ul className="footer-links list-inline mb-2 ">
                                <li className="footer-links list-inline-item ">
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
                                    <a href="# ">Terms of Service</a>
                                </li>
                                <li className="list-inline-item ">&sdot;</li>
                                <li className="list-inline-item ">
                                    <a href="/about/privacy ">Privacy Policy</a>
                                </li>
                            </ul>
                            <p className="text-muted small mb-4 mb-lg-0 ">&copy; 2018 - <span id="date"></span> - University of Massachusetts Lowell,
                                <a href="https://sites.uml.edu/engaging-computing ">Engaging Computing Group</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
    tosFooter() {
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
                                    <a href="# ">Terms of Service</a>
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
                    <this.privacyPolicy></this.privacyPolicy>
                    <this.tosFooter></this.tosFooter>
                </div>
            </div>
        );
    }
    
}

export default Tos; 
