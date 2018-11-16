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
    //let currentLevel = 0;
    //this.props.courseActions.fetchCourse(this.props.courseName)
    // if (this.props.course.lesson) {
    //   this.props.lesson = this.props.course.lesson
    // }
    // else {
    //console.log(this)
    //console.log(this.props)
    // this.props.lessonActions.fetchLesson(this.props.course.lessons[currentLevel])
    // this.props.lessonActions.fetchLesson('5b9b1dcd484a8011dfa5aa92')
    // }
  }

  //TODO: Adapt to see if the current lesson is the end of the course, if not add button
  nextLesson = () => {
    if (this.props.lesson.next && window.confirm('Are you sure you want to continue?\nYou will lose any unsaved work!')) {
      this.props.lessonActions.fetchLesson(this.props.lesson.next);
    }
  }

  //TODO: Adapt to see if the current lesson is the begining of the course, if not add button
  lastLesson = () => {
    if (this.props.lesson.previous && window.confirm('Are you sure you want to continue?\nYou will lose any unsaved work!')) {
      this.props.lessonActions.fetchLesson(this.props.lesson.previous);
    }
  }

  renderBtns = () => (
    <Grid container spacing={24} id="lesson=btns">
      <Grid item xs={6}>
        <Button
          variant="outlined"
          onClick={() => this.lastLesson()}
          color="primary"
          disabled={Number(this.props.lesson.previous) === 0}         //TODO Change
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
          disabled={Number(this.props.lesson.next) === 0}             //TODO Change
          fullWidth
          className="">
          Next
            <Icon className="material-icons">chevron_right</Icon>
        </Button>
      </Grid>
    </Grid>
  )

  render() {
    return (
      <div id="lesson">
        <h1>{this.props.lesson.name}</h1>
        <p>{this.props.lesson.prompt} </p>
        <this.renderBtns />
      </div>
    );
  }
}


export default Lesson;
