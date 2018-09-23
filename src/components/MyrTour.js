import React, { Component } from 'react';
import Tour from 'reactour';
import { Button } from '@material-ui/core';

class MyrTour extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: false
    };
  }

  closeTour = () => {
    this.setState({ isTourOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Tour
          steps={steps}
          maskClassName="mask"
          isOpen={this.state.isTourOpen}
          onRequestClose={this.closeTour} />
        <Button
          style={{ color: "#fff", fontSize: "66%" }}
          size="small"
          className="d-none d-md-block"
          onClick={() => this.setState({ isTourOpen: true })}>
          Take the Tour
        </ Button>
      </React.Fragment>
    );
  }
}

const steps = [
  {
    selector: '#ace-editor',
    content: 'This is the editor. You can create 3D scenes using JavaScript ' +
      'and a special set of instructions or functions to MYR.',
  },
  {
    selector: '#play-btn',
    content: 'The Play button will render the scene.'
  },
  {
    selector: '#stop-btn',
    content: 'The Stop button will stop the scene. \n Use this to save battery.'
  },
  {
    selector: '#scene',
    content: 'The View is where you can see you work. \n Click the goggle to view in VR.'
  },
  {
    selector: '#new-btn',
    content: 'Create a new scene from scratch. Be sure to save first!',
  },
  {
    selector: '#save-btn',
    content: 'Save your work.',
  },
  {
    selector: '#open-btn',
    content: 'See previous work and view examples.',
  },
  {
    selector: '#ref-btn',
    content: 'Use the Reference to see all MYR has to offer.',
  },
  {
    selector: '#view-btn',
    content: 'Change you view in the scene, fly, and/or disable the grid.',
  },
  {
    selector: '#user',
    content: 'You can log in with a Google account.',
  },
];

export default MyrTour;
