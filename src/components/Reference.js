import React from 'react';
import myrReference from '../myr/reference';

import {
  Tabs,
  Tab,
  IconButton,
  Drawer,
  Icon,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tooltip
} from '@material-ui/core';

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
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  >
          {this.tableData[category].map((row, index) => (
            <TableRow key={index}>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  render() {
    const style = {
      margin: 2,
      padding: 0,
      color: '#fff',
    };
    return (
      <React.Fragment>
        <Tooltip title="Reference" placement="bottom-start">
          <IconButton
            id="ref-btn"
            className="header-btn d-none d-sm-block"
            aria-haspopup="true"
            onClick={() => this.setState({ open: true })}
            style={style}>
            <Icon style={{ color: '#fff' }} className="material-icons">help</Icon>
          </IconButton>
        </Tooltip>
        <Drawer
          anchor="left"
          id="reference-drawer"
          variant="persistent"
          className={!this.state.open ? 'd-none' : ""}
          open={this.state.open}>
          <Tabs
            id="reference-tabs"
            fullWidth={true}
            value={this.state.value}
            onChange={this.handleChange} >
            <Tab
              icon={<Icon className="material-icons geometry">category</Icon>}
              label="Geometry"
              value='a'>
            </Tab>
            <Tab
              icon={<Icon className="material-icons color-change">bubble_chart</Icon>}
              label="TRANSFORMATIONS"
              value='b' />
            <Tab
              icon={<Icon className="material-icons animation-ref">zoom_out_map</Icon>} //swap_horiz control_camera category
              label="ANIMATIONS"
              value='c' />
            <Tab
              icon={<Icon className="material-icons">close</Icon>}
              label="CLOSE"
              value='x'
              onClick={this.handleToggle} />
          </Tabs>

          {<div style={{ margin: 5, overflow: 'hidden' }}>
            <p style={{ fontSize: "80%" }}> Key: <span className="array">array </span>
              <span className="bool">bool </span>
              <span className="number">number </span>
              <span className="string">string </span></p>
          </div>}
          {this.state.value === 'a' &&
            <div style={{ marginTop: 0, overflow: 'scroll' }}>
              {this.TableEx("geometry")}
            </div>}
          {this.state.value === 'b' &&
            <div style={{ marginTop: 0, overflow: 'scroll' }}>
              {this.TableEx("transformations")}
            </div>}
          {this.state.value === 'c' &&
            <div style={{ marginTop: 0, overflow: 'scroll' }}>
              {this.TableEx("animations")}
            </div>}
        </Drawer>
      </React.Fragment>
    );
  }
}
