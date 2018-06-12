import React, { Component } from 'react';
import { Icon, IconButton, Button, FormControl, FormControlLabel, FormGroup, Checkbox } from 'material-ui';

const defaultAnswers = [false, false, false, false, false];

class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelIndex: 0,
      answers: defaultAnswers
    };
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
                label={it.text}
                control=
                {
                  <Checkbox
                    checked={this.state.answers[index]}
                    onChange={() => this.handleChange(index)}
                    value={it.value}
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
    let stage = this.props.level.stages[this.state.levelIndex];

    if (stage.isQuiz) {
      correct = stage.opts.filter((it, index) => {
        return it.value !== this.state.answers[index];
      });
    }
    this.setState({answers: defaultAnswers});
    return correct.length === 0;
  }

  stageHelper = (stage) => {
    if (stage.isQuiz) {
      return (
        this.formHelper(stage.opts)
      );
    } else {
      return ( <p>{stage.levelText}</p> );
    }
  }

  handleForward = () => {
    let stage = this.props.level.stages[this.state.levelIndex];
    if(stage.isQuiz && !this.isCorrect()){
      return 0;
    }
    let nextLevel = this.state.levelIndex + 1;
    if (nextLevel < this.props.level.stages.length) {
      this.setState({ levelIndex: nextLevel });
      this.props.actions.render(this.props.level.stages[nextLevel].sceneText);
    }
  }

  handleBackwards = () => {
    let prevLevel = this.state.levelIndex - 1;
    if (prevLevel >= 0) {
      this.setState({ levelIndex: prevLevel });
      this.props.actions.render(this.props.level.stages[prevLevel].sceneText);
    }
  }


  render() {
    let stage = this.props.level.stages[this.state.levelIndex];
    return (
      <div id='lessons'>
        {/* <div><h1>{this.props.level.name}</h1></div> */}
        <h3>{stage.prompt}</h3>
        {stage ? this.stageHelper(stage) : null}
        <div>
          <Button
            size="small"
            aria-label='Menu'
            style={{ color: '#222', marginRight: '0.25em' }}
            onClick={this.handleBackwards}>
            <Icon style={{ fontSize: 32 }}>chevron_left</Icon> Go Back
          </Button>
          {stage.isQuiz 
            ?
            <Button
              size="small"
              aria-label='Menu'
              style={{ color: '#222', marginRight: '0.25em', float: 'right' }}
              onClick={this.handleForward}>
              Submit <Icon style={{ fontSize: 32 }}>chevron_right</Icon>
            </Button> 
            :
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