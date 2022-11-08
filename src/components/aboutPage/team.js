import React, { Component }  from "react";
import myrLogo from "./img/MYR-Logo.png";
import myrHeaderImage from "./img/queen_status.png";
import maleHS from "./img/team/male.png";
//import femaleHS from "./img/team/female.jpg"; 
import jaelynDonesHS from "./img/team/jaelyn_dones.jpg";
import jasonKieslingHS from "./img/team/jason_kiesling.jpg"; 
import justinLuHS from "./img/team/justin_lu.jpg"; 
import chrisBernsHS from "./img/team/chris_berns.jpg";
import elenaIzotovaHS from "./img/team/elena_izotova.jpg";
import vrindaPunjHS from "./img/team/vrinda_punj.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";

class Team extends Component {
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

    teamMembers() {
        return (
            <div className="container ">
                <div className="row ">
                    <div className="col-md-12 lead ">
                        <h3 className="text-center ">Meet the Team!</h3>
                        <p className="text-center ">
                            MYR is being developed by the Engaging Computing Group at UMass Lowell under the direction of <a href="https://www.uml.edu/Sciences/kcs-advisory-board/martin-fred.aspx " target="_blank ">Dr. Fred
                            Martin.
                            </a>
                        </p>
                    </div>
                </div>
                <hr />
                <h4 className="text-center ">MYR Development Team</h4>
                {/*First Row*/}
                
                {/*Second Row*/}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">John Kelly</h5>
                                    <p className="team-title ">
                                        Lead Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Mathematics 2023</div>
                                        <br />
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Third Row*/}
                <div className="row team-card">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Ryan Maradiaga</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2025</div>
                                        <br />
                                        <a href="https://github.com/RJMaradiaga" target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Steven Huynh</h5>
                                    <p className="team-title ">
                                        Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2025</div>
                                        <br />
                                    </p>
                                </td>
                            </tr>     
                        </table>
                    </div>
                </div>
                <hr />
                <h4 className="text-center ">Alumni</h4>
                {/*First Row*/}
                <div className="row team-card">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={jaelynDonesHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Jaelyn Dones</h5>
                                    <p className="team-title ">
                                        Lead Developer 2020-2021
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2024</div>
                                        <br />
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Bryan Montalvan</h5>
                                    <p className="team-title ">
                                        Lead Developer 2020-2021
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2024</div>
                                        <br />
                                        <a href="https://www.linkedin.com/in/bryan-montalvan/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Second Row */}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={jasonKieslingHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Jason Kiesling</h5>
                                    <p className="team-title ">
                                    Lead Developer 2019-2020
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2021</div>
                                        <br />
                                        <a href="mailto:jason@learnmyr.org " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="http://jasondkiesling.com " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faLink}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://www.linkedin.com/in/jasondkiesling/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/jasondkiesling " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">David Jones-Martin</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2026</div>
                                        <br />
                                        <a href="mailto:david_jonesmartin@student.uml.edu" target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Third Row*/}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={chrisBernsHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Chris Berns</h5>
                                    <p className="team-title ">
                                        Lead Developer 2018-2019
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2019</div>
                                        <br />
                                        <a href="mailto:chris@learnmyr.org" target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="http://chrisberns.com " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faLink}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://www.linkedin.com/in/chris-berns/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/CBernsCode " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={elenaIzotovaHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Elena Izotova</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2021</div>
                                        <br />
                                        <a href="mailto:elena@learnmyr.org " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://elenaizotova.com/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faLink}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://www.linkedin.com/in/elenaizotova/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/elenaizotova " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Fourth Row*/}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={vrindaPunjHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Vrinda Punj</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2021</div>
                                        <br />
                                        <a href="mailto:vrinda@learnmyr.org " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://www.linkedin.com/in/vrinda-punj-366389b5/ " target="_blank "
                                            className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/vrindapunj " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Sam Dodson</h5>
                                    <p className="team-title ">
                                        Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                        <br />
                                        <a href="https://github.com/samuelmarquis " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>     
                        </table>
                    </div>
                </div>
                {/*Fifth Row*/}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">John Swanson</h5>
                                    <p className="team-title ">
                                        Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                        <br />
                                        <a href="mailto:david_jonesmartin@student.uml.edu" target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>     
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Samuel Zuk</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Sixth Row*/}
                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Patrick Sullivan</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.E. Computer Engineering 2023</div>
                                        <br />
                                        <a href="https://www.linkedin.com/in/patrick-sullivan-5801921a1/ " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faLinkedin}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/beewyka819 " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table> 
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Keith Valin</h5>
                                    <p className="team-title ">
                                        Lead Developer 2020-2022
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                        <br />
                                        <a href="https://www.linkedin.com/in/keith-valin-8b670b120/" target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons" icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a href="https://github.com/kdvalin " target="_blank " className="icons-hover-link">
                                            <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {/*Seventh Row*/}

                <div className="row team-card ">
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={justinLuHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Justin Lu</h5>
                                    <p className="team-title ">
                                        Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                    </p>
                                    <a href="https://github.com/jlu18 " target="_blank " className="icons-hover-link">
                                        <FontAwesomeIcon className="team-icons"icon={faGithub}></FontAwesomeIcon>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="card info-card card-body col-lg-5 col-sm-12 mx-4">
                        <table>
                            <tr>
                                <td>
                                    <img className="team-photo " src={maleHS} />
                                </td>
                                <td>
                                    <h5 className="card-title ">Joshua Sullivan</h5>
                                    <p className="team-title ">
                                    Developer
                                    </p>
                                    <p className="card-text ">
                                        <div className="team-degree ">B.S. Computer Science 2022</div>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    teamFooter() {
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
                    <this.teamMembers></this.teamMembers>
                    <this.teamFooter></this.teamFooter>
                </div>
            </div>
        );
    }
}

export default Team; 