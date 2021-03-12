import React, { Component } from "react";

import {
    ButtonBase,
    Card,
    CardContent,
    IconButton,
    Icon,
    Modal,
    Tooltip
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import "../../css/CourseSelect.css";

/**
 * FUNC to position modal in the middle of the screen
 */
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

/**
 * CSS for modal
 * 
 * @param {*} theme !!!DESCRIPTION NEEDED!!! 
 */
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing(100),
        maxWidth: "90%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
    }
});

class CourseSelectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // open: false
        };
    }

    helper = (course) => {
        if (course) {
            let id = course._id;
            let shortname = course.shortname;
            let name = course.name;
            let description = course.description;
            let link = "/course/" + shortname;
            return (
                <div key={id} id={id} title={name}
                    className="course-listing col-xs-12 col-md-6">
                    <Card raised="true">
                        <CardContent>
                            <a
                                tabIndex="0"
                                rel="noopener noreferrer"
                                role="button"
                                href={link}>
                                <h4>{name}</h4>
                                <p>{description}</p>
                            
                            </a>
                        </CardContent>
                    </Card>
                    <br></br>
                </div >
            );
        } else {
            return null;
        }
    }

    /**
     * Render all of the elements
     */
    render() {
        const { classes } = this.props;
        const courses = [].concat(this.props.courses);
        return (
            <div>
                {
                    !this.props.hideTooltip ?
                        <Tooltip title="Courses">
                            <IconButton
                                onClick={this.props.handleCoursesToggle}
                                id="select-course"
                                className="header-btn d-none d-md-block"
                                style={{
                                    color: "#fff",
                                    margin: 2,
                                }}>
                                <Icon className="material-icons">school</Icon>
                            </IconButton >
                        </Tooltip>
                        : null
                }
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.coursesOpen}
                    onClose={this.props.handleCoursesToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.props.handleCoursesToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <h3 className="col-12 p-0 mb-3 border-bottom">Available Courses</h3>
                        <div className="row" id="courses">
                            { // Sort the courses in alphabetical order
                                courses.sort(function (a, b) {
                                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                                }).map(course => {
                                    return this.helper(course);
                                })
                            }
                        </div>
                    </div>
                </Modal >
            </div >
        );
    }
}

const CourseSelect = withStyles(modelStyles)(CourseSelectModal);

export default CourseSelect;

