import React, { Component } from 'react';
import { auth, provider } from '../firebase.js'
import { Popover, Menu, MenuItem } from 'material-ui';
import Avatar from 'material-ui/Avatar';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      account: null,
      open: false,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((account) => {
      if (account) {
        this.setState({ account });
        this.props.actions.login(account)
      }
    });
    this.setState({ anchorEl: document.getElementById("user") });
  }

  componentDidUpdate() {

  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({ account: null });
    });
  }

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const account = result.account;
      this.setState({ account });
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
    event.preventDefault();
    this.props.actions.nameScene(event.target.value)
  }

  // Input for adding the scene name
  sceneName = () => {
    let name = this.props.scene.name
    return (
      <form id="scene-name" onSubmit={this.handleChange}>
        <input name="name" type="text" 
          placeholder="Name your scene"
          value={name !== "untitled" ? name : ""}
          onChange={this.handleChange} />
      </form>
    )
  }

  render() {
    let loginBtn = null
    if (this.state.account == null) {
      loginBtn =
        <div id="user">
          <Avatar src={process.env.PUBLIC_URL + '/img/acct_circle.svg'}
            onClick={this.handleClick}
            label="Login" />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}>
            <Menu>
              <MenuItem primaryText="Log In" onClick={this.login} />
            </Menu>
          </Popover>
          <p id='welcome-name' >Login to Save Your Progress</p>
        </div>
    } else {
      loginBtn =
        <div id="user">
          <Avatar
            id="login"
            src={this.state.account.photoURL}
            onClick={this.handleClick}
            label="Logout" />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Log Out" onClick={this.logout} />
            </Menu>
          </Popover>
        </div>
    }
    return (
      <header className="App-header">
        <h1>MYR</h1>
        <this.sceneName />
        {loginBtn}
      </header>
    );
  }
}

export default Header