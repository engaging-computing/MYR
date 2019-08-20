import React, { Component } from "react";
import {
    Button,
    Grid,
    Icon,
    Tooltip
} from "@material-ui/core";

class Lesson extends Component {
    nextLesson = () => {
        const currentIndex = this.props.courses.currentIndex;
        const lessons = this.props.course.lessons;
        if(this.hasEditorChanged()){
            if (window.confirm("Are you sure you want to continue?\nYou will lose any unsaved work!")) {
                this.props.courseActions.nextLesson(currentIndex, lessons[currentIndex + 1]);
            }
        }else{
            this.props.courseActions.nextLesson(currentIndex, lessons[currentIndex + 1]);
        }
    }

    lastLesson = () => {
        const currentIndex = this.props.courses.currentIndex;
        const lessons = this.props.course.lessons;
        if(this.hasEditorChanged()){
            if (window.confirm("Are you sure you want to continue?\nYou will lose any unsaved work!")) {
                this.props.courseActions.previousLesson(currentIndex, lessons[currentIndex - 1]);
            }
        }else{
            this.props.courseActions.previousLesson(currentIndex, lessons[currentIndex - 1]);
        }
    }

    hasEditorChanged = () => {
        let text;
        try {
            let editor = window.ace.edit("ace-editor");
            text = editor.getSession().getValue();

        } catch (err) {
            console.error(err);
        }

        if (this.props.savedText === text) {
            return false;
        }
        return true;
    }

    renderBtns = () => {
        const { course, courses } = this.props;
        let nextValid = courses && courses.currentIndex !== null && course && course.lessons;
        let prevValid = courses && courses.currentIndex !== null;
        return (
            <Grid container spacing={48} id="lesson-btns">
                <Grid item xs={2}>
                    <Tooltip title="Previous Lesson" placement="top-start">
                        <Button
                            onClick={() => this.lastLesson()}
                            color="primary"
                            disabled={prevValid ? courses.currentIndex <= 0 : true}
                            fullWidth
                            className="">
                            <Icon className="material-icons">chevron_left</Icon>
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={2}>
                    <Tooltip title="Next Lesson" placement="top-start">
                        <Button
                            onClick={() => this.nextLesson()}
                            color="primary"
                            disabled={nextValid ? courses.currentIndex >= course.lessons.length - 1 : true}
                            fullWidth
                            className="">
                            <Icon className="material-icons">chevron_right</Icon>
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        );
    }

    render() {
        return (
            <div id="lesson">
                <h3>{(this.props.lesson && this.props.lesson.name) ? this.props.lesson.name : "Loading..."}</h3>
                <p>{(this.props.lesson && this.props.lesson.prompt) ? this.props.lesson.prompt : "Loading..."} </p>
                <this.renderBtns />
            </div>
        );
    }
}


export default Lesson;
