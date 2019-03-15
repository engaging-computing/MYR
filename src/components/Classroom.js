import React, { Component } from "react";
import Select from 'react-select';

import {
    ButtonBase,
    IconButton,
    Icon,
    Modal,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import '../css/Classroom.css';

// FUNC to position modal in the middle of the screen
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%"
    };
}

// CSS for modal
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

// CSS for buttons
const btnStyle = {
    base: {
        marginTop: 20,
        justifyContent: "left",
        width: "100%"
    },
    on: {
        color: "#3f51b5",
    },
    off: {
        color: "#333",
    },
    save: {
        padding: 5,
        margin: 5,
        color: "#333",
        width: "100%"
    },
    cancel: {
        padding: 5,
        margin: 5,
        color: "red",
        width: "100%"
    }
};

class ClassroomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentOpen: false,
            selectedClassroom: "",
            selectedProject: ""
        };
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    handleCurrentToggle = () => {
        this.setState({ currentOpen: !this.state.currentOpen });
    }

    handleChange = (selectedClassroom) => {
        this.setState({ selectedClassroom: selectedClassroom.value, currentOpen: true });
        this.props.classroomActions.asyncClass(this.state.selectedClassroom);
    }

    selectClassroom = () => {
        const { selectedClassroom } = this.state;
        const userClassrooms = this.props.classrooms.classrooms;
        let optionItems = [];
        const placeholder = "Select a classroom";

        userClassrooms.map((classroom) =>
            optionItems.push({
                value: classroom.classroomID,
                label: classroom.classroomID
            })
        );

        return (
            <div>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleChange} value={selectedClassroom} />
            </div>
        );
    }

    handleProjectSelect = (selectedProject) => {
        console.log(selectedProject.value)
        this.setState({ selectedProject: selectedProject.value });
    }

    selectProject = () => {
        const { selectedProject } = this.state;
        const classroom = this.props.classrooms.classroom;
        let optionItems = [];
        const placeholder = "Select a project";

        classroom.map((classroom) =>
            optionItems.push({
                value: classroom.classroomID,
                label: classroom.classroomID
            })
        );

        return (
            <div>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleProjectSelect} value={selectedProject} />
            </div>
        );
    };

    currentClassroom = () => {
        const { classes } = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.currentOpen}
                    onClose={this.handleCurrentToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.handleCurrentToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <div>{"Classroom:" + this.state.currentClassroom}</div>
                        <div className="col-12 border-bottom">Submitted Projects</div>
                        <this.selectProject />
                    </div>
                </Modal >
            </div>
        );
    }

    // Render all of the elements
    render() {
        const { classes } = this.props;
        return (
            <div>
                <IconButton
                    onClick={this.handleToggle}
                    id="configure-scene"
                    style={{
                        color: "#fff",
                        margin: 2,
                        padding: 0,
                    }}>
                    <Icon className="material-icons">library_books</Icon>
                </IconButton >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.handleToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <div>Classroom Options</div>
                        <div className="col-12 border-bottom">Current Classrooms</div>
                        <this.selectClassroom />
                        <this.currentClassroom />
                        <div className="col-12 border-bottom">Create a Classroom</div>
                    </div>
                </Modal >
            </div >
        );
    }
}

const Classroom = withStyles(modelStyles)(ClassroomModal);

export default Classroom;
