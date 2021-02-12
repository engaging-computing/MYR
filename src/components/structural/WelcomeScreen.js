import React from "react";

import {
    Button,
    Icon,
    IconButton,
    Modal,
    Hidden
} from "@material-ui/core";

import WelcomeScene from "./WelcomeScene.js";
import ProjectView from "./header/ProjectView.js";
import CourseSelect from "../courses/CourseSelect.js";

import { withStyles } from "@material-ui/core/styles";
import "../../css/WelcomeScreen.css";

function getOuterModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%",
        maxHeight: "90%"
    };
}

/**
 * CSS for modal
 * @param {*} theme 
 */
const modelStyles = theme => ({
    outer: {
        position: "absolute",
        width: theme.spacing(150),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        "overflow-y": "auto"
    },
    paper: {
        position: "absolute",
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    info: {
        position: "absolute",
        width: theme.spacing(100),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    }
});

const exitBtnStyle = {
    position: "absolute",
    top: 0,
    right: 0,
};
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsOpen: false,
            projectsTab: "b",
            coursesOpen: false
        };
    }

    componentDidMount() {
        if (!this.getCookie("hasVisited")) {
            this.props.handleWelcomeToggle();
        }
    }

    getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie = () => {
        if (!this.getCookie("hasVisited")) {
            let date = new Date();
            date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
            let expiration = "; expires=" + date.toGMTString();
            let cookie = "hasVisited=true" + expiration;
            document.cookie = cookie;
        }
    }

    handleClose = () => {
        this.setCookie();
        this.props.handleWelcomeToggle();
    };

    neverAgainCookie = () => {
        document.cookie = "hasVisited=true; expires=Thu, 31 Dec 2099 12:00:00 UTC;";
        this.handleClose();
    }

    neverAgain = () => {
        return (
            <Button
                onClick={this.neverAgainCookie}
                className="neverAgain-btn">
                Don't show again
            </Button >
        );
    }

    handleProjectToggle = () => {
        this.setCookie();
        this.setState({ projectsOpen: !this.state.projectsOpen });
        this.setState({ projectTab: "b" });
    };

    handleCoursesToggle = () => {
        this.setCookie();
        this.setState({ coursesOpen: !this.state.coursesOpen });
    };

    handleTourToggle = () => {
        this.setCookie();
        this.setState({ tourOpen: !this.state.tourOpen });
    };

    helperButtons = () => {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="contained"
                        onClick={this.handleCoursesToggle}
                        className="welcome-btn">
                        <Icon className="material-icons">school</Icon>
                        View Courses
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="contained"
                        onClick={this.handleProjectToggle}
                        className="welcome-btn">
                        <Icon className="material-icons">perm_media</Icon>
                        View Example Scenes
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="contained"
                        href="/reference"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.setCookie}
                        className="welcome-btn">
                        <Icon className="material-icons">help</Icon>
                        Open the Reference
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4 d-none d-md-block" >
                    <Button
                        variant="contained"
                        onClick={() => {
                            this.props.handleTourToggle();
                            this.props.handleWelcomeToggle();
                        }}
                        className="welcome-btn">
                        <Icon className="material-icons">map</Icon>
                        Take the Tour
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="contained"
                        href="/about/support"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.setCookie}
                        className="welcome-btn">
                        <Icon className="material-icons">alternate_email</Icon>
                        Get Support
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="contained"
                        href="https://github.com/engaging-computing/MYR"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.setCookie}
                        className="welcome-btn">
                        <Icon className="material-icons">code</Icon>
                        Visit our GitHub
                    </Button >
                </div >
            </div>
        );
    }

    handleModals = () => {
        return (
            <div id="modals">
                <ProjectView
                    deleteFunc={this.props.deleteProj}
                    userProjs={this.props.userProjs}
                    exampleProjs={this.props.exampleProjs}
                    projectsOpen={this.state.projectsOpen}
                    handleProjectToggle={this.handleProjectToggle}
                    tab={this.state.projectsTab}
                    hideTooltip={true} />
                <CourseSelect
                    courses={this.props.courses}
                    coursesOpen={this.state.coursesOpen}
                    handleCoursesToggle={this.handleCoursesToggle}
                    hideTooltip={true} />
            </div>
        );
    }

    cookieMessage = () => {
        return (
            <p id="cookie-consent" className="text-center">MYR uses cookies which are necessary for its functioning. You accept the use of cookies by continuing to use MYR per the <a href="/about/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <React.Fragment>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.props.welcomeOpen}
                        onClose={this.handleClose}>
                        <div style={getOuterModalStyle()} className={classes.outer}>
                            <IconButton
                                color="default"
                                style={exitBtnStyle}
                                onClick={this.handleClose}>
                                <Icon className="material-icons">close</Icon>
                            </IconButton>
                            <h3 className="text-center">Welcome to MYR!</h3>
                            <Hidden mdUp>
                                <hr />
                                <this.cookieMessage />
                            </Hidden>
                            <hr />
                            <div className="row no-gutters">
                                <div id="welcome-description" className="col-12 col-md-6 col-lg-8">
                                    <p>MYR is an educational tool that strikes a balance with the ease of use and challenge. We drew inspiration from Logo Turtle and Processing to provide a beginner friendly experience for teaching and learning with MYR. If you want to learn more about MYR itself, visit our <a href="/about" target="_blank" rel="noopener noreferrer">about page</a>.</p>
                                    <p>Within the editor you can create 3D scenes using JavaScript and the MYR API. You can then view your scene in the viewer using a computer, tablet, smartphone, or a VR headset.</p>
                                    <p>MYR is being developed by the <a href="https://sites.uml.edu/engaging-computing" target="_blank" rel="noopener noreferrer">Engaging Computing Group at UMass Lowell</a>. If you ever need support with MYR for any reason, please reach out via our <a href="/about/support/" target="_blank" rel="noopener noreferrer">support page</a>.</p>
                                    <p>The scene "Dropsies" is an interactive scene built in MYR. Click on it to move around!</p>
                                </div>
                                <div id="welcome-viewer" className="col-12 col-md-6 col-lg-4">
                                    <WelcomeScene />
                                </div>
                            </div>
                            <hr />
                            <this.helperButtons />
                            <this.handleModals />
                            <hr />
                            <this.neverAgain />
                            <Hidden smDown>
                                <hr />
                                <this.cookieMessage />
                            </Hidden>
                        </div>
                    </Modal>
                </React.Fragment>
            </div >
        );
    }
}

const WelcomeScreen = withStyles(modelStyles)(Welcome);

export default WelcomeScreen;