import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

export default class Reference extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 'a',
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleChange = (value) => {
    if (value == 'x') {
      value = this.state.value;
    }
    this.setState({
      value: value,
    });
  };

  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      buttonSpan: {
        margin: 5,
      }
    };
    return (
      <span style={styles.buttonSpan}>
        <RaisedButton
          label="Myr.js Reference"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab 
              icon={<FontIcon className="material-icons">change_history</FontIcon>}
              label="PRIMITIVES"
              value='a'>
              <div>
                <h2 style={styles.headline}>Tab One</h2>
                <p>
                  This is an example tab.
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
              </div>
            </Tab>
            <Tab 
              icon={<FontIcon className="material-icons">build</FontIcon>}
              label="HELPERS"
              value='b'>
              <div>
                <h2 style={styles.headline}>Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
            <Tab 
              icon={<FontIcon className="material-icons">close</FontIcon>}
              label="CLOSE"
              value='x'
              onActive={this.handleToggle}>
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
        </Drawer>
      </span>
    );
  }
}