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
  componentDidMount() {
    this.props.actions.render(this.props.level.crntStage.sceneText,
      this.props.user ? this.props.user.uid : 'anon');

    this.props.levelActions.fetchLevel(1);
  }

  handleChange = index => {
    let answers = this.state.answers;
    answers[index] = !answers[index];
    this.setState({ answers: answers });
  };

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

  // This looks like it could be optimized
  isCorrect = () => {
    let correct = [];
    let stage = this.props.level.crntStage;

    if (stage.isQuiz) {
      correct = stage.opts.filter((it, index) => {
        return it.value !== this.state.answers[index];
      });
    }
    this.setState({ answers: defaultAnswers });
    return correct.length === 0;
  }

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