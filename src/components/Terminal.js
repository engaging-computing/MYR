import React, { Component } from 'react';
import Console from 'react-console-component';

class Terminal extends Component {
  echo = (text) => {
    try {
      this.refs.console.log(eval(text));
    } catch (err) {
      this.refs.console.log(err.message)
    }
    this.refs.console.return();
  }
  render = () => {
    return (
      <div id="terminal">
        <Console ref="console"
          handler={this.echo}
          autofocus={true}
        />
      </div>
    )
  }
}

export default Terminal