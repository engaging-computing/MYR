import React from 'react';
import myrReference from '../myr/reference'
import Highlight from 'react-highlight.js'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
// import MenuItem from 'material-ui/MenuItem';


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Reference extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 'a',
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
    };
    this.tableData = myrReference();
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleChange = (value) => {
    if (value === 'x') {
      value = this.state.value;
    }
    this.setState({
      value: value,
    });
  };



  TableEx = (category) => {
    const styles = {
      general: {
        fontSize: 18,
        padding: '1%',
        whiteSpace: 'wrap'
      },
      highlight: {
        margin: '2%',
      }
    };
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
        style={styles.general}>
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
          style={styles.general}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Parameters</TableHeaderColumn>
            <TableHeaderColumn>Return Value</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          style={styles.general}>
          {this.tableData[category].map((row, index) => (
            <TableRow key={index}>
              <TableRowColumn style={styles.general}>{row.name}</TableRowColumn>
              <TableRowColumn>
                <Highlight language={'javascript'} style={styles.highlight}>
                  {row.parameters}
                </Highlight>
              </TableRowColumn>
              <TableRowColumn style={styles.general}>{row.returnValue}</TableRowColumn>
              <TableRowColumn style={styles.general}>{row.description}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
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
        margin: 2,
      },
      tabStyle: {
        margin: 30,
      }
    };
    return (
      <span style={styles.buttonSpan}>
        <RaisedButton
          label="Myr.js Reference"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open} width={'80%'}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}>
            <Tab
              icon={<FontIcon className="material-icons">change_history</FontIcon>}
              label="PRIMITIVES"
              value='a'
            >
              <div style={styles.tabStyle}>
                <h5 style={styles.headline}>Primitives</h5>
                {this.TableEx("primitives")}
              </div>
            </Tab>
            <Tab
              icon={<FontIcon className="material-icons">build</FontIcon>}
              label="TRANSFORMATIONS"
              value='b'>
              <div style={styles.tabStyle}>
                <h5 style={styles.headline}>Transformations</h5>
                {this.TableEx("transformations")}
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
                </p>
              </div>
            </Tab>
          </Tabs>
        </Drawer>
      </span>
    );
  }
}