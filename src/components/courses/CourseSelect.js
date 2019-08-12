import React, { Component } from "react";

import {
    ButtonBase,
    Button,
    Card,
    CardContent,
    IconButton,
    Icon,
    Modal,
    Tooltip
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import "../../css/CourseSelect.css";

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
        width: theme.spacing.unit * 100,
        maxWidth: "90%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class CourseSelectModal extends Component {
    constructor(props) {
        super(props);
        this.difficulties = ["beginner", "intermediate", "advanced", "expert"];
        this.categories = ["geometry", "transformations", "animations", "groups", "firstTimer", "teachers"];
        this.state = {
            difficultyFilter : {},
            categoryFilter : {},
        };
        for(let i in this.difficulties) {
            this.state.difficultyFilter[this.difficulties[i]] = true;
        }
        for(let i in this.categories) {
            this.state.categoryFilter[this.categories[i]] = true;
        }
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
                    <a
                        tabIndex="0"
                        rel="noopener noreferrer"
                        role="button"
                        href={link}>
                        <Card>
                            <CardContent>
                                <h4>{name}</h4>
                                <p>{description}</p>
                            </CardContent>
                        </Card>
                    </a>
                    <br></br>
                </div >
            );
        } else {
            return null;
        }
    }

    filterHelper = (key, type) => {
        if (key) {
            //converts camelCase difficulty/category filters keys into Mixed Case button labels
            let buttonText = key.replace(/([A-Z]){1}/g, " " + "$1");
            buttonText = buttonText.charAt(0).toUpperCase() + buttonText.slice(1);
            let filter;
            if (type === "difficulty") {
                filter = this.state.difficultyFilter;
            }
            else if (type === "category") {
                filter = this.state.categoryFilter;
            }
            return(
                <Button
                    variant={filter[key] ? "contained" : "outlined"}
                    onClick={() => {
                        if (type === "difficulty") {
                            let newState = this.state;
                            newState.difficultyFilter[key] = !filter[key];
                            this.setState(newState);
                        }
                        else if (type === "category") {
                            let newState = this.state;
                            newState.categoryFilter[key] = !filter[key];
                            this.setState(newState);
                        }
                    }}
                    size="small">
                    {buttonText}
                </Button>
            );
        }
        else {
            return null;
        }
    }
        
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
                                    padding: 0,
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
                        <div id="filters" className="border-bottom">
                            <h5>Difficulty: </h5>
                            <div>
                                {
                                    this.difficulties.map(i => { return this.filterHelper(i, "difficulty"); })
                                }
                            </div>
                            <br></br>
                            <h5>Categories: </h5>
                            <div>
                                {
                                    this.categories.map(i => { return this.filterHelper(i, "category"); })
                                }
                            </div>
                        </div>
                        <div className="row" id="courses">
                            { // Sort the users projects in alphabetical order
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

