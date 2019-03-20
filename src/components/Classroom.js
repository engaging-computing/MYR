import React, { Component } from "react";
import Select from 'react-select';
import { classes } from '../firebase.js';

import {
    Button,
    ButtonBase,
    IconButton,
    Icon,
    Modal,
    TextField
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
            addOpen: false,
            newClassroomID: ""
        };
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    handleChange = (selectedClassroom) => {
        window.location.href = window.origin + '/class/' + selectedClassroom.value;
    }

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAddClassToggle = () => {
        this.setState({ addOpen: !this.state.addOpen });
    }

    handleCloseAll = () => {
        this.setState({ open: false, addOpen: false });
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
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleChange} />
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
            classes.where('classroomID', '==', this.state.newClassroomID).get().then(snap => {
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
                        classroomID: this.state.newClassroomID,
                        timestamp: Date.now(),
                        uid: this.props.user.uid
                    }).then(() => {
                        this.props.classroomActions.asyncClasses(this.props.user.uid);
                        this.handleCloseAll();
                    });
                }
            });
        }
    }

    addClass = () => (
        <div>
            <h5>Please enter a new class code</h5>
            <TextField
                id="standard-name"
                type="text"
                onChange={this.handleTextChange('newClassroomID')}
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
                        <div className="col-12 border-bottom pt-4">Create a Classroom</div>
                        <ButtonBase
                            style={btnStyle.base}
                            onClick={() => { this.handleAddClassToggle(); }} >
                            <Icon className="material-icons">add</Icon>
                            Create Class
                  </ButtonBase>
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
            </div >
        );
    }
}

const Classroom = withStyles(modelStyles)(ClassroomModal);

export default Classroom;
