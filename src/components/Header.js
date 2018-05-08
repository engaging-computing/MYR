import React, { Component } from 'react';
import { auth, provider } from '../firebase.js';
import { Popover, Menu, MenuItem } from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      account: null,
      open: false,
      sceneName: ""
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((account) => {
      if (account) {
        this.setState({ account });
        this.props.actions.login(account);
      }
    });
    this.setState({ 
      anchorEl: document.getElementById("user"),
      sceneName: this.props.scene.name
     });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({ account: null });
    });
    this.props.actions.logout();
  }

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const account = result.account;
      this.setState({ account });
      this.props.actions.login(account);
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
    });
  };

  // Close the popover dialog for account management 
  handleRequestClose = (event) => {
    this.setState({ open: false });
  };

  // Handles the change of the scene name input
  handleChange = (event) => {
    this.setState({sceneName: event.target.value});
  }

  submitName = (event) => {
    event.preventDefault();
    this.props.actions.nameScene(this.state.sceneName);
    return false;
  }

  // Input for adding the scene name
  sceneName = () => {
    return (
      <form id="scene-name" onSubmit={this.submitName} onBlur={this.submitName}>
        <input name="name" type="text"
          placeholder="Name your scene"
          value={this.state.sceneName !== "untitled" ? this.state.sceneName : ""}
          onChange={this.handleChange} />
      </form>
    );
  }

  loginBtn = () => {
    let btn;
    if (this.state.account !== null) {
      btn = <Menu><MenuItem primaryText="Log Out" onClick={this.logout} /></Menu>;
    } else {
      btn = <Menu><MenuItem primaryText="Log In" onClick={this.login} /></Menu>;
    }
    let photoURL = this.state.account ? this.state.account.photoURL: process.env.PUBLIC_URL + '/img/acct_circle.svg';
    return (
      <div id="user">
        <Avatar
          id="login"
          src={photoURL}
          onClick={this.handleClick}
          label="Logout" />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}>
          {btn}
        </Popover>
      </div>
    );
  }

  render() {
    return (
      <header className="App-header">
        <h1>MYR</h1>
        <this.sceneName />
        {this.loginBtn()}
      </header>
    );
  }
}

export default Header;