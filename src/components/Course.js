import React, { Component } from 'react';
import {
  Button,
  Icon,
  Grid
} from '@material-ui/core';

class Lesson extends Component {
  componentDidMount() {
    console.log(this.props)
    console.log(this.props.course)
  }

  nextLesson = () => {
    const { currentIndex } = this.props.courses;
    const { lessons } = this.props.course;
    if (window.confirm('Are you sure you want to continue?\nYou will lose any unsaved work!')) {
      this.props.courseActions.nextLesson(currentIndex, lessons[currentIndex + 1]);
    }
  }

  lastLesson = () => {
    const { currentIndex } = this.props;
    const { lessons } = this.props.course;
    if (window.confirm('Are you sure you want to continue?\nYou will lose any unsaved work!')) {
      this.props.courseActions.previousLesson(currentIndex, lessons[currentIndex + 1]);
    }
  }

  renderBtns = () => {
    const { course, courses } = this.props;
    let nextValid = courses && courses.currentIndex != null && course && course.lessons;
    let prevValid = courses && courses.currentIndex != null;
    return (
      <Grid container spacing={24} id="lesson=btns">
        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={() => this.lastLesson()}
            color="primary"
            disabled={prevValid ? courses.currentIndex <= 0 : true}
            fullWidth
            className="">
            <Icon className="material-icons">chevron_left</Icon>
            Prev
        </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={() => this.nextLesson()}
            color="primary"
            disabled={nextValid ? courses.currentIndex >= course.lessons.length - 1 : true}
            fullWidth
            className="">
            Next
            <Icon className="material-icons">chevron_right</Icon>
          </Button>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <div id="lesson">
        <h1>{(this.props.lesson && this.props.lesson.name) ? this.props.lesson.name : "Loading..."}</h1>
        <p>{(this.props.lesson && this.props.lesson.prompt) ? this.props.lesson.prompt : "Loading..."} </p>
        <this.renderBtns />
      </div>
    );
  }
}


export default Lesson;
