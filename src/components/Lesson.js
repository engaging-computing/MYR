import React, { Component } from 'react';
import {
  Button,
  Icon,
  Grid
} from '@material-ui/core';

class Lesson extends Component {
  componentDidMount() {
    this.props.lessonActions.fetchFirstLesson(1);
  }

  nextLesson = () => {
    if (this.props.lesson.next && window.confirm('Are you sure you want to continue?\nYou will lose any unsaved work!')) {
      this.props.lessonActions.fetchLesson(this.props.lesson.next);
    }
  }

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
          disabled={Number(this.props.lesson.previous) === 0}
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
          disabled={Number(this.props.lesson.next) === 0}
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
