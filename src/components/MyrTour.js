import React, { Component } from 'react';
import Tour from 'reactour';
import { Button } from '@material-ui/core';
import store from '../reducers';

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
          //onAfterOpen={store.getState().scene.settings.viewOnly === true ? () => {store.dispatch({type:"CHANGE_VIEW"})} : ()=>{}}
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
    content: 'The View is where you can see your work. \n Click the goggle to view in VR.'
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
    selector: '#configure-scene',
    content: 'Modify and share your scene including setting the background color, enabling the grid, and enabling flying.',
  },
  {
    selector: '#select-course',
    content: 'View the list of available courses to get you started on using MYR.',
  },
  {
    selector: '#user',
    content: 'You can log in with a Google account in order to save your scenes.',
  },
];

export default MyrTour;
