import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
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
      height: '300px',
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

  tableData = [
    {
      name: 'John Smith',
      status: 'Employed',
    },
    {
      name: 'Randal White',
      status: 'Unemployed',
    },
    {
      name: 'Stephanie Sanders',
      status: 'Employed',
    },
  ];

  TableEx = () => (
    <Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      selectable={this.state.selectable}
      multiSelectable={this.state.multiSelectable}>
      <TableHeader
        displaySelectAll={this.state.showCheckboxes}
        adjustForCheckbox={this.state.showCheckboxes}
        enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displaySelectAll={this.state.showCheckboxes}
        adjustForCheckbox={this.state.showCheckboxes}
        displayRowCheckbox={this.state.showCheckboxes}
        enableSelectAll={this.state.enableSelectAll}>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>2</TableRowColumn>
          <TableRowColumn>Randal White</TableRowColumn>
          <TableRowColumn>Unemployed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>3</TableRowColumn>
          <TableRowColumn>Stephanie Sanders</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>4</TableRowColumn>
          <TableRowColumn>Steve Brown</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>5</TableRowColumn>
          <TableRowColumn>Christopher Nolan</TableRowColumn>
          <TableRowColumn>Unemployed</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  );

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
        margin: 20,
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
                <h2 style={styles.headline}>Tab One</h2>
                {this.TableEx()}
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