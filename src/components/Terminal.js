import React, { Component } from 'react';
import Console from 'react-console-component';
import $ from "jquery";

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
        if (text[text.length - 1] !== ";") {
          text = text + ";";
        }
        var history = this.state.history.join("");
        /* eslint-disable */
        window.eval(history);
        this.refs.console.log(eval(text));
        /* eslint-enable */
        // if the above command succeeded then safe to add to history
        this.state.history.push(text);
      } catch (err) {
        this.refs.console.logX("error", err.message);
      }
    }
    this.refs.console.return();
  }

  handleWelcome = () =>{
    if(this.props.errors !== "Everything Looks Good"){
      $('.react-console-welcome').addClass('error');
    } else {
      $('.react-console-welcome').removeClass('error');
    }
    return this.props.errors;
  }

  render = () => {
    return (
      <div id="terminal">
        <Console ref="console"
          handler={this.echo}
          autofocus={true}
          welcomeMessage={this.handleWelcome()}
        />
      </div>
    );
  }
}

export default Terminal;