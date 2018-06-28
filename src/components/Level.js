import React, { Component } from 'react';
import { Icon, Button, FormControl, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

const defaultAnswers = [false, false, false, false, false];

class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: defaultAnswers
    };
  }

  /**
  * @summary - When the Level component mounts we want to inject the code that comes with the lesson
  * 
  */
  componentDidMount() {
    this.props.actions.render(this.props.level.crntStage.sceneText,
      this.props.user ? this.props.user.uid : 'anon');

    this.props.levelActions.fetchLevel(1);
  }

  /**
  * @summary - this handles the slection of answers from the quiz
  * 
  */
  handleChange = index => {
    let answers = this.state.answers;
    answers[index] = !answers[index];
    this.setState({ answers: answers });
  };

  /**
  * @summary - This helps produce the quiz
  * 
  * @param {} opts - The options to be displayed in the quiz
  * 
  * @returns - 
  */
  formHelper = (opts) => {
    return (
      <FormControl component="fieldset">
        <FormGroup row={true}>
          {opts ? opts.map((it, index) => {
            return (
              <FormControlLabel
                key={index}
                label={it.text}
                control=
                {
                  <Checkbox
                    checked={this.state.answers[index]}
                    onChange={() => this.handleChange(index)}
                    value={String(it.value)}
                  />
                }
              />
            );
          }) : null}
        </FormGroup>
      </FormControl>
    );
  }

  /**
  * @summary - This method corrects the test 
  * 
  * @returns {Bool} - Whether the answers are accepted or not
  */
  isCorrect = () => {
    let answers = [];
    let stage = this.props.level.crntStage;

    // filter answers to only incorrect solutions
    if (stage.isQuiz) {
      answers = stage.opts.filter((it, index) => {
        return it.value !== this.state.answers[index];
      });
    }
    this.setState({ answers: defaultAnswers }); // reset
    return answers.length === 0;
  }

  /**
   * @summary - This helps determines to render a prompt or a quiz
   * 
   * @param {object} stage - level object
   * 
   * @returns - 
   */
  stageHelper = (stage) => {
    if (stage.isQuiz) {
      return (
        this.formHelper(stage.opts)
      );
    } else {
      return (<p>{stage.levelText}</p>);
    }
  }

  handleForward = () => {
    let stage = this.props.level.crntStage;
    if (stage.isQuiz && !this.isCorrect()) {
      return 0;
    }
    this.props.levelActions.nextStage();
  }

  handleBackwards = () => {
    this.props.levelActions.prevStage();
  }


  render() {
    let stage = this.props.level.crntStage;
    return (
      <div id='lessons'>
        <h5>{stage.prompt}</h5>
        {stage ? this.stageHelper(stage) : null}
        <div id="lesson-btns">
          <Button
            size="small"
            aria-label='Menu'
            style={{ color: '#222', marginRight: '0.25em' }}
            onClick={this.handleBackwards}>
            <Icon style={{ fontSize: 32 }}>chevron_left</Icon> Go Back
          </Button>
          {stage.isQuiz
            ? // then
            <Button
              size="small"
              aria-label='Menu'
              style={{ color: '#222', marginRight: '0.25em', float: 'right' }}
              onClick={this.handleForward}>
              Submit <Icon style={{ fontSize: 32 }}>chevron_right</Icon>
            </Button>
            : // otherwise
            <Button
              size="small"
              aria-label='Menu'
              style={{ color: '#222', marginRight: '0.25em', float: 'right' }}
              onClick={this.handleForward}>
              Next <Icon style={{ fontSize: 32 }}>chevron_right</Icon>
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default Level;