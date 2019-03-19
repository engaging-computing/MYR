import React, { Component } from "react";
import Select from 'react-select';

import {
    ButtonBase,
    IconButton,
    Icon,
    Modal
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

class ClassroomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    }

    handleChange = (selectedClassroom) => {
        window.location.href = window.origin + '/class/' + selectedClassroom.value;
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
                        <div className="col-12 border-bottom">Create a Classroom</div>
                    </div>
                </Modal >
            </div >
        );
    }
}

const Classroom = withStyles(modelStyles)(ClassroomModal);

export default Classroom;
