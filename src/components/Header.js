import React, { Component } from 'react';
import { auth, provider } from '../firebase.js';
import { Popover, Menu, MenuItem } from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      sceneName: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((account) => {
      if (account) {
        this.props.logging.login(account);
      } else {
        this.props.logging.logout();
      }
    });
    this.setState({ 
      anchorEl: document.getElementById("user"),
     });
  }

  /**
   * When the user clicks logout
   * Use firebase Auth to logout
   * Finally, call the logout action to sync application sync
   */
  logout = () => {
    auth.signOut().then(() => {
      this.props.logging.logout();
    }); 
  }

  /**
   * When login button is pressed
   * Use firebase auth then set local state
   * Finally call the reducer action to sync up application state
   */
  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const account = result.account;
      this.props.logging.login(account);
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

  // Handles the component's screenName 
  handleChange = (event) => {
    this.setState({sceneName: event.target.value});
  }

  // Handles the application state sync
  submitName = (event) => {
    event.preventDefault();
    this.props.sceneActions.nameScene(this.state.sceneName);
    this.setState({sceneName: null});
  }

  // Input for adding the scene name
  sceneName = () => {
    let text = "";
    if(this.state.sceneName === null){
      text = this.props.scene.name;
    } else {
      text = this.state.sceneName;
    }
    return (
      <form id="scene-name" onSubmit={this.submitName} onBlur={this.submitName}>
        <input name="name" type="text"
          placeholder="Name your scene"
          value={text}
          onChange={this.handleChange} />
      </form>
    );
  }

  loginBtn = () => {
    let btn;
    if (this.props.user !== null) {
      btn = <Menu><MenuItem primaryText="Log Out" onClick={this.logout} /></Menu>;
    } else {
      btn = <Menu><MenuItem primaryText="Log In" onClick={this.login} /></Menu>;
    }
    let photoURL = this.props.user ? this.props.user.photoURL: process.env.PUBLIC_URL + '/img/acct_circle.svg';
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