import React from "react";

import {
    Button,
    Icon,
    IconButton,
    Modal
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

// CSS for modal
const modelStyles = theme => ({
    outer: {
        position: "absolute",
        width: theme.spacing.unit * 150,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        "overflow-y": "auto"
    },
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    info: {
        position: "absolute",
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const exitBtnStyle = {
    position: "fixed",
    top: 0,
    right: 0,
};
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeOpen: false,
            projectsOpen: false,
            projectsTab: "b",
            coursesOpen: false
        };
        this.emailRef = React.createRef();
    }

    componentDidMount() {
        if (!this.getCookie("firstTime")) {
            let date = new Date();
            date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
            let expiration = "; expires=" + date.toGMTString();
            let cookie = "firstTime=true" + expiration;
            document.cookie = cookie;
            this.setState({ welcomeOpen: true });
        }
    }

    getCookie = (cname) => {
        let name = cname + "=";
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

    handleClose = () => {
        this.setState({ welcomeOpen: false });
    };

    neverAgainCookie = () => {
        document.cookie = "firstTime=true; expires=Thu, 31 Dec 2099 12:00:00 UTC;";
    }

    neverAgain = () => {
        return (
            <Button className="neverAgain-btn">
                Never show this screen again
            </Button >
        );
    }

    handleProjectToggle = () => {
        this.setState({ projectsOpen: !this.state.projectsOpen });
        this.setState({ projectTab: "b" });
    };

    handleCoursesToggle = () => {
        this.setState({ coursesOpen: !this.state.coursesOpen });
    };

    handleTourToggle = () => {
        this.setState({ tourOpen: !this.state.tourOpen });
    };

    helperButtons = () => {
        return (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        onClick={this.handleCoursesToggle}
                        className="welcome-btn">
                        <Icon className="material-icons">school</Icon>
                        View Courses
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        onClick={this.handleProjectToggle}
                        className="welcome-btn">
                        <Icon className="material-icons">perm_media</Icon>
                        View Example Scenes
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        href="/reference"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="welcome-btn">
                        <Icon className="material-icons">help</Icon>
                        Open the Reference
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        onClick={() => {
                            this.props.handleTourToggle();
                            this.setState({ welcomeOpen: false });
                        }}
                        className="welcome-btn">
                        <Icon className="material-icons">map</Icon>
                        Take the Tour
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        href="/about/support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="welcome-btn">
                        <Icon className="material-icons">alternate_email</Icon>
                        Get Support
                    </Button >
                </div >
                <div className="col-xs-12 col-md-6 col-lg-4" >
                    <Button
                        variant="raised"
                        href="https://github.com/engaging-computing/MYR"
                        target="_blank"
                        rel="noopener noreferrer"
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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <React.Fragment>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.welcomeOpen}
                        onClose={this.handleClose}>
                        <div style={getOuterModalStyle()} className={classes.outer}>
                            <IconButton
                                color="default"
                                style={exitBtnStyle}
                                onClick={this.handleClose}>
                                <Icon className="material-icons">close</Icon>
                            </IconButton>
                            <h3 className="text-center">Welcome to MYR!</h3>
                            <hr />
                            <div id="welcome-description" className="row no-gutters">
                                <div className="col-12 col-md-6 col-lg-8">
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
                        </div>
                    </Modal>
                </React.Fragment>
            </div >
        );
    }
}

const WelcomeScreen = withStyles(modelStyles)(Welcome);

export default WelcomeScreen;