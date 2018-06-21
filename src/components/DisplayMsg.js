import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  return {
    top: '38%',
    left: '38%',
    transform: `translate(-24%, -24%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '24%',
    backgroundColor: "#fff",
    padding: 20,
    border: "1px solid",
    borderRadius: 5
  },
});

class DisplayMsg extends Component {

  handleCancel = () => {
    if(typeof this.props.cancelFunc === 'function') { 
      this.props.cancelFunc();
    };
  };

  handleConfirm = () => {
    if(typeof this.props.confirmedFunc === 'function') { 
      this.props.confirmedFunc();
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby={this.props.headerText}
          aria-describedby={this.props.bodyText}
          open={this.props.open}
          onClose={this.handleCancel}
          onBackdropClick={this.handleCancel}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h3>{this.props.headerText}</h3>
            <p>{this.props.bodyText}</p>
            <Button
              color="primary"
              onClick={this.handleConfirm}
            >
              Continue
            </Button>
            <Button
              color="secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(DisplayMsg);
