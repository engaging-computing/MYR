import React, { Component } from 'react';
import Console from 'react-console-component';

class Terminal extends Component {
  echo = (text) => {
    this.refs.console.log(text);
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