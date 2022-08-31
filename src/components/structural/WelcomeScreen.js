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
import CookieHandler from "../../utils/CookieHandler"; 

/** 
 * @returns {object} Center the Welcome Screen
 */
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

/**
 * Welcome Component returns a modal of welcome screen that shows up when user first enter MYR
 */
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsOpen: false,
            projectsTab: "b",
            coursesOpen: false
        };
    }

    /**
     * Called when the Welcome Screen is mounted (component has been rendererd to the DOM)
     * 
     * Header.js has a state to control whether to show welcome screen or not. By default it's false.
     * So if user hasn't visisted the MYR, toggle the state to true.
     */
    componentDidMount() {
        if (!CookieHandler.getCookie("hasVisited")) {
            this.props.handleWelcomeToggle();
        }
    }

    /**
     * Handler for when the welcome screen is close either by close button or clicking outside of modal
     */
    handleClose = () => {
        CookieHandler.setCookie("hasVisited");
        this.props.handleWelcomeToggle();
    };

    /**
     * @returns {*} Button with don't show again option
     */
    neverAgain = () => {
        return (
            <Button
                onClick={()=>{
                    CookieHandler.neverAgainCookie("hasVisited"); 
                    this.handleClose();
                }}
                className="neverAgain-btn">
                Don't show again
            </Button >
        );
    }

    /**
     * Handler for when user click on example project button
     */
    handleProjectToggle = () => {
        CookieHandler.setCookie("hasVisited");
        this.setState({ projectsOpen: !this.state.projectsOpen });
        this.setState({ projectTab: "b" });
    };

    /**
     * Handler for when user click on courses button
     */
    handleCoursesToggle = () => {
        CookieHandler.setCookie("hasVisited");
        this.setState({ coursesOpen: !this.state.coursesOpen });
    };

    /**
     * Handler for when user click on tour button
     */
    handleTourToggle = () => {
        CookieHandler.setCookie("hasVisited");
        this.setState({ tourOpen: !this.state.tourOpen });
    };

    /**
     * Helper function for creating buttons for navigating project, courses, etc.
     * @returns {HTMLElement} Elements containing 6 buttons
     */
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
                        onClick={()=>{CookieHandler.setCookie("hasVisited");}}
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
                        onClick={()=>{CookieHandler.setCookie("hasVisited");}}
                        className="welcome-btn">
                        <Icon className="material-icons">code</Icon>
                        Visit our GitHub
                    </Button >
                </div >
            </div>
        );
    }

    /**
     * Modals for handling when user clicked on the "exmaple scene" or "coruese" button
     * @returns {HTMLElement} Elements of ProjectView and CourseSelect component 
     */
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
                    hideTooltip={true}
                    renameScene={this.props.renameScene} />
                <CourseSelect
                    courses={this.props.courses}
                    coursesOpen={this.state.coursesOpen}
                    handleCoursesToggle={this.handleCoursesToggle}
                    hideTooltip={true} />
            </div>
        );
    }

    /**
     * @returns Paragraph tag to display permission of using cookie 
     */
    cookieMessage = () => {
        return (
            <p id="cookie-consent" className="text-center">MYR uses cookies which are necessary for its functioning. You accept the use of cookies by continuing to use MYR per the <a href="/about/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
        );
    }

    /**
     * @returns Creates Welcome Screen Modal
     */
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
                            <div className="row g-0">
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