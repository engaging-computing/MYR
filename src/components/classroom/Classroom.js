import React, { Component } from "react";
import Select from "react-select";
import { classes } from "../../firebase.js";

import {
    Button,
    ButtonBase,
    Icon,
    Modal,
    TextField
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import "../../css/Classroom.css";

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
            addOpen: false,
            openOpen: false,
            deleteOpen: false,
            newClassroomID: ""
        };
    }

    handleChange = (selectedClassroom) => {
        window.location.href = window.origin + "/class/" + selectedClassroom.value;
    }

    handleDelete = (selectedClassroom) => {
        this.props.classroomActions.deleteClass(selectedClassroom.value, selectedClassroom.label);
        this.handleCloseAll();
    }

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAddClassToggle = () => {
        this.setState({ addOpen: !this.state.addOpen });
    }

    handleOpenClassToggle = () => {
        this.setState({ openOpen: !this.state.openOpen });
    }

    handleDeleteClassToggle = () => {
        this.setState({ deleteOpen: !this.state.deleteOpen });
    }

    handleCloseAll = () => {
        this.setState({ addOpen: false, openOpen: false, deleteOpen: false });
        this.props.handleClassroomClose();
    }

    selectClassroom = () => {
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
                <h5>Select a classroom to open.</h5>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleChange} />
            </div>
        );
    }

    deleteClassroom = () => {
        const userClassrooms = this.props.classrooms.classrooms;
        let optionItems = [];
        const placeholder = "Select a classroom";

        userClassrooms.map((classroom) =>
            optionItems.push({
                value: classroom.id,
                label: classroom.classroomID
            })
        );

        return (
            <div>
                <h5>Select a classroom to delete.</h5>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleDelete} />
            </div>
        );
    }

    handleSubmit = () => {
        let existingClasses = [];
        if (!this.props.user) {
            window.alert("You must be signed in to create a class.");
            this.handleAddClassToggle();
        }
        else {
            let newClassroomID = this.state.newClassroomID.toLowerCase();
            classes.where("classroomID", "==", newClassroomID).get().then(snap => {
                snap.forEach(doc => {
                    existingClasses.push({
                        id: doc.id
                    });
                });
            }).then(() => {
                if (existingClasses.length > 0) {
                    window.alert("Error: A class already exists with that class code.");
                }
                else {
                    let newID = classes.doc().id;
                    classes.doc(newID).set({
                        classroomID: newClassroomID,
                        timestamp: Date.now(),
                        uid: this.props.user.uid
                    }).then(() => {
                        this.props.classroomActions.asyncClasses(this.props.user.uid);
                        window.alert("Classroom added!");
                        this.handleCloseAll();
                    });
                }
            });
        }
    }

    addClass = () => (
        <div>
            <h5>Please enter a new class code.</h5>
            <TextField
                id="standard-name"
                type="text"
                onChange={this.handleTextChange("newClassroomID")}
            />
            <Button
                color="primary"
                onClick={() => {
                    this.handleSubmit();
                }} >
                Submit
            </Button>
        </div>
    );

    // Render all of the elements
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.props.handleClassroomToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.props.handleClassroomToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <div className="row d-flex">
                            <div className="col-12 border-bottom">Classroom Options</div>
                            <div className="col-6">
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleOpenClassToggle(); }} >
                                    <Icon className="material-icons">storage</Icon>
                                    Open a Class
                                </ButtonBase>
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleDeleteClassToggle(); }} >
                                    <Icon className="material-icons">delete</Icon>
                                    Delete a Class
                                </ButtonBase>
                            </div>
                            <div className="col-6">
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleAddClassToggle(); }} >
                                    <Icon className="material-icons">add_circle</Icon>
                                    Create a Class
                                </ButtonBase>
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => window.open(window.origin + "/about/classrooms")} >
                                    <Icon className="material-icons">info</Icon>
                                    About Classes
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </Modal >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addOpen}
                    onClose={this.handleAddClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleAddClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.addClass />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openOpen}
                    onClose={this.handleOpenClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleOpenClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.selectClassroom />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteOpen}
                    onClose={this.handleDeleteClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleDeleteClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.deleteClassroom />
                    </div>
                </Modal>
            </div >
        );
    }
}

const Classroom = withStyles(modelStyles)(ClassroomModal);

export default Classroom;
