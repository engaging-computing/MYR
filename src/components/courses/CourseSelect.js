import React, { Component } from "react";

import {
    ButtonBase,
    Button,
    Card,
    CardContent,
    IconButton,
    Icon,
    Modal,
    Tooltip,
    Typography,
    Grid,
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
        this.categories = ["geometry", "transformations", "animations", "groups", "firstTimer", "teachers", "misc"];
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
        let anyCategorySelected = (arr) => {
            let hasBeenSelected = false;
            for(let i = 0; i < arr.length; i++) {
                if (this.state.categoryFilter[arr[i]]) {
                    hasBeenSelected = true;
                }
            }
            return hasBeenSelected;
        };
        if (course && this.state.difficultyFilter[this.difficulties[course.difficulty]] && anyCategorySelected(course.categories)) {
            let id = course._id;
            let shortname = course.shortname;
            let name = course.name;
            let description = course.description;
            let difficulty = this.convertCamelCase(this.difficulties[course.difficulty]);
            let categories = course.categories.length > 0 ? course.categories.map(this.convertCamelCase).join(", ") : "None";
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
                                <h5>
                                    {name}
                                </h5>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Difficulty : {difficulty}
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Categories : {categories}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {description}
                                </Typography>
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

    convertCamelCase = (text) => {
        //converts camelCase difficulty/category filters keys into Mixed Case button labels
        if (typeof(text) === "string") {
            return text.charAt(0).toUpperCase() + text.replace(/([A-Z]){1}/g, " $1").slice(1);
        }
        else {
            return text;
        }
    }    
    
    setFilterValue = (val, key, type) => {
        //console.log(val + key + type);
        if (type === "difficulty") {
            let newState = this.state;
            newState.difficultyFilter[key] = val;
            this.setState(newState);
        }
        else if (type === "category") {
            let newState = this.state;
            newState.categoryFilter[key] = val;
            this.setState(newState);
        }
    }

    setAllFilters = (value, type) => {
        switch(type){
            case "difficulty":
                for(let i in this.difficulties) {
                    this.setFilterValue(value , this.difficulties[i], "difficulty");
                }    
                break;
            case "category":
                for(let i in this.categories) {
                    this.setFilterValue(value , this.categories[i], "difficulty");
                }    
                break;
            default:
        }   
    }

    filterHelper = (key, type) => {
        if (key) {
            //converts camelCase difficulty/category filters keys into Mixed Case button labels
            let buttonText = this.convertCamelCase(key);
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
                    onClick={this.setFilterValue(!filter[key], key, type)}
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
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <div>
                                        {
                                            this.difficulties.map(i => { return this.filterHelper(i, "difficulty"); })
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() => {this.setAllFilters(true, "difficulty");}}
                                        size="small">
                                        Select All
                                    </Button>
                                    <Button
                                        onClick={() => {this.setAllFilters(false, "difficulty");}}

                                        size="small">
                                        Deselect All
                                    </Button>                            
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <h5>Categories: </h5>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <div>
                                        {
                                            this.categories.map(i => { return this.filterHelper(i, "category"); })
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() => {this.setAllFilters(true, "category");}}
                                        size="small">
                                        Select All
                                    </Button>
                                    <Button
                                        onClick={() => {this.setAllFilters(false, "category");}}
                                        size="small">
                                        Deselect All
                                    </Button>
                                </Grid>
                            </Grid>
                            
                            <br></br>
                        </div>
                        <br></br>
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

