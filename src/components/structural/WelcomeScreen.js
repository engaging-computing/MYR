import React from "react";
import QRCode from "qrcode.react";
import {
    Button,
    ButtonBase,
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Tooltip,
    Tabs,
    Tab
} from "@material-ui/core";

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

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
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
        "overflow-y": "scroll"
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
            welcomeOpen: false
        };
        this.emailRef = React.createRef();
    }

    componentDidMount() {
        if (!this.getCookie("firstTime")) {
            let date = new Date();
            date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
            let expiration = "; expires=" + date.toGMTString();
            let cookie = "firstTime=true" + expiration;
            // let cookie = "firstTime=true; expires=Thu, 31 Dec 2099 12:00:00 UTC;"
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

    helperButtons = () => {
        return (
            <div
                className="proj col-xs-12 col-md-6 col-lg-4 pt-2 pl-0" >
                <Button
                    variant="raised"
                    // onClick={this.props.actions.recover}
                    color="#3f51b5"
                    className="welcome-btn"
                >
                    <Icon className="material-icons">replay</Icon>
                    Recover
                </Button >
            </div >
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
                            <div className="row no-gutters">
                                <div className="col-12 col-md-8">
                                    <p >MYR is an educational tool that strikes a balance with the ease of use and challenge. We drew inspiration from Logo Turtle and Processing to provide a beginner friendly experience for teaching and learning with MYR. If you want to learn more about MYR itself, visit out <a href="/about">about page</a>.</p>
                                    <p>Within the editor you can create 3D scenes using JavaScript and a special set of instructions or functions to MYR. You can then view your scene in the viewer using a computer, tablet, smartphone, or a VR headset.</p>
                                    <p>MYR is being developed by the <a href="https://sites.uml.edu/engaging-computing">Engaging Computing Group at UMass Lowell</a>. If you ever need support with MYR for any reason, please reach out via our <a href="/about/support/">support page</a>.</p>
                                </div>
                                <div className="col-12 col-md-4">

                                </div>
                            </div>
                            <hr />
                            <this.helperButtons />
                        </div>
                    </Modal>
                </React.Fragment>
            </div >
        );
    }
}

const WelcomeScreen = withStyles(modelStyles)(Welcome);

export default WelcomeScreen;