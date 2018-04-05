import React, { Component } from 'react';
import Console from 'react-console-component';

class Terminal extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
    };
  }
  echo = (text) => {
    if (text.length > 0) {
      try {
        if (text[text.length-1] != ";") {
          text = text + ";"
        }
        var history = this.state.history.join(""); 
        window.eval(history);
        this.refs.console.log(eval(text));
        // if the above command succeeded then safe to add to history
        this.state.history.push(text);
      } catch (err) {
        this.refs.console.log(err.message)
      }
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