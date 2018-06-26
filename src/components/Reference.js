import React from 'react';
import myrReference from '../myr/reference';
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import { github } from 'react-syntax-highlighter/styles/hljs';

import {
  Tabs,
  Tab,
  Button,
  Drawer,
  Icon,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';

registerLanguage('javascript', js);

export default class Reference extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 'a',
    };
    this.tableData = myrReference();
  }

  handleToggle = () => this.setState({ open: !this.state.open, value: 'a' });

  handleChange = (event, value) => {
    this.setState({ value });
  };

  TableEx = (category) => {

    return (
      <Table  >
        <TableHead >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Parameters</TableCell>
            <TableCell>Return Value</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {this.tableData[category].map((row, index) => (
            <TableRow key={index}>
              <TableCell >{row.name}</TableCell>
              <TableCell  >
                <SyntaxHighlighter language='javascript' style={github}>{row.parameters}</SyntaxHighlighter>
              </TableCell>
              <TableCell >{row.returnValue}</TableCell>
              <TableCell >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  render() {

    return (
      <React.Fragment>
        <Button
          variant="raised"
          color="primary"
          fullWidth
          className="sidebar-btn"
          onClick={() => this.setState({ open: true })}>
          <Icon className="material-icons">description</Icon> Reference
        </Button>
        <Drawer
          id="reference-drawer"
          variant="persistent"
          open={this.state.open}>
          <Tabs
            id="reference-tabs"
            value={this.state.value}
            onChange={this.handleChange} >
            <Tab
              icon={<Icon className="material-icons">change_history</Icon>}
              label="Geometry"
              value='a'>
            </Tab>
            <Tab
              icon={<Icon className="material-icons">build</Icon>}
              label="TRANSFORMATIONS"
              value='b' />
            <Tab
              icon={<Icon className="material-icons">settings</Icon>}
              label="WEBVR COMPONENTS"
              value='c' />
            <Tab
              icon={<Icon className="material-icons">close</Icon>}
              label="CLOSE"
              value='x'
              onClick={this.handleToggle} />
          </Tabs>
          {this.state.value === 'a' &&
            <div style={{ marginTop: 25, overflow: 'scroll' }}>
              <h5 >Geometry</h5>
              {this.TableEx("geometry")}
            </div>}
          {this.state.value === 'b' &&
            <div style={{ marginTop: 25, overflow: 'scroll' }}>
              <h5 >Transformations</h5>
              {this.TableEx("transformations")}
            </div>}
          {this.state.value === 'c' &&
            <div style={{ marginTop: 25, overflow: 'scroll' }}>
              <h5 >WebVR Components</h5>
              {this.TableEx("webvr_components")}
            </div>}
        </Drawer>
      </React.Fragment>
    );
  }
}