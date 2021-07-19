import React, { Component } from "react";
import myrReference from "../../myr/reference";
import * as refFunctions from "../../myr/reference";

import * as layoutTypes from "../../constants/LayoutTypes";

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
    Tooltip,
    Hidden
} from "@material-ui/core";

const exitBtnStyle = {
    //paddingbottom: 100,
    position: "absolute",
    top: 0,
    right: 10,
};
const newTabStyle = {
    position: "fixed",
    top: 0,
    right: 50,
};

/**
 * Reference is a react component that creates drawer contains references
 */
class Reference extends Component {
    /**
     * Constructor
     *  value represents the current tab that's opened  
     */
    constructor(props) {
        super(props);
        this.state = {
            value: "a",
        };
        this.tableData = myrReference();
    }

    /**
     * Handler for when user clicked the tab, it updates the state "value" with value passed in
     * 
     * @param {Event} event 
     * @param {string} value tab to be changed to. It should be an alphabet
     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    /**
     * Handler for opening the reference page 
     */
    handleOpen = () => {
        window.open(window.origin + "/reference");
        this.setState({ value: "a" });
    };

    /**
     * Conver the name and parameters of API to following format to be use in first column of table
     *      format: name(...parameters);
     * 
     * @param {string} name name of API to create
     * @param {array} parameters array of object that each contains type and name of the parameter
     * @returns {HTMLElement} create a DOM element with name of APIs and Parameters
     */
    nameHelper = (name, parameters) => {
        return (
            <span>{name}({(parameters.map((element, i, params) => {
                let comma = i < params.length - 1 ? ", " : "";
                switch (element.type) {
                    case "number":
                        return <span>{refFunctions.numberText(element.name)}{comma}</span>;
                    case "string":
                        return <span>{refFunctions.stringText(element.name)}{comma}</span>;
                    case "bool":
                        return <span>{refFunctions.boolText(element.name)}{comma}</span>;
                    case "array":
                        return <span>{refFunctions.arrayText(element.name)}{comma}</span>;
                    case "data":
                        return <span>{refFunctions.dataText(element.name)}{comma}</span>;
                    default:
                        return null;
                }
            }))});</span>
        );
    };

    /**
     * Create a button that will link to the example scene
     * @param {string} example name of the API
     * @returns {HTMLElement} IconButton with link to the example scene
     */
    exampleHelper = (example) => {
        if (example) {
            let link = "/reference/" + example;
            return (
                <IconButton
                    href={link}
                    target="_blank"
                    className="material-icons">
                    link
                </IconButton>
            );
        } else {
            return null;
        }
    };

    /**
     * Create a table of references by retrieve array of references from tableData by category
     * 
     * @param {string} category name of the category
     * @returns {Table} DOM elements of table with references with passed category 
     */
    TableEx = (category) => {
        return (
            <Table  >
                <TableHead >
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell className='refExample'>Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  >
                    {this.tableData[category].map((row, index) => (
                        <TableRow key={index}>
                            <TableCell >{this.nameHelper(row.name, row.parameters)}</TableCell>
                            <TableCell >{row.description}</TableCell>
                            <TableCell >{this.exampleHelper(row.example)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    /**
     * Reneter Button that will open Drawer of reference with different categories 
     */
    render() {
        const style = {
            margin: 2,
            color: "#fff",
        };
        const isDisabled = this.props.layoutType === layoutTypes.REFERENCE;
        return (
            <div>
                {!isDisabled ?
                    <React.Fragment>
                        <Tooltip title="Reference" placement="bottom-start">
                            <IconButton
                                id="ref-btn"
                                className="header-btn d-none d-md-block"
                                aria-haspopup="true"
                                onClick={this.props.handleReferenceToggle}
                                style={style}>
                                <Icon style={{ color: "#fff" }} className="material-icons">help</Icon>
                            </IconButton>
                        </Tooltip>
                        <Drawer
                            style={{ position: "relative", zIndex: 100 }}
                            anchor="right"
                            id="reference-drawer"
                            variant="persistent"
                            className={!this.props.referenceOpen ? "d-none" : ""}
                            open={this.props.referenceOpen}>

                            <div>
                                <h3 className="border-bottom" style={{ padding: 10, fontWeight: 400 }}>MYR API - Reference</h3>
                                <IconButton
                                    color="default"
                                    style={exitBtnStyle}
                                    onClick={() => {
                                        this.props.handleReferenceToggle();
                                        this.setState({ value: "a" });
                                    }}>
                                    <Icon className="material-icons">close</Icon>
                                </IconButton>
                                <IconButton
                                    color="default"
                                    style={newTabStyle}
                                    onClick={this.handleOpen}>
                                    <Icon className="material-icons">open_in_new</Icon>
                                </IconButton>
                            </div>
                            <div>
                                <Tabs
                                    id="reference-tabs"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    variant="fullWidth">
                                    <Tab
                                        icon={<Icon className="material-icons geometry">category</Icon>}
                                        label={
                                            <Hidden xsDown>
                                                <div>GEOMETRY</div>
                                            </Hidden>
                                        }
                                        value='a' />
                                    <Tab
                                        icon={<Icon className="material-icons color-change">bubble_chart</Icon>}
                                        label={
                                            <Hidden xsDown>
                                                <div>TRANSFORMATIONS</div>
                                            </Hidden>
                                        }
                                        value='b' />
                                    <Tab
                                        icon={<Icon className="material-icons animation-ref">zoom_out_map</Icon>} //swap_horiz control_camera category
                                        label={
                                            <Hidden xsDown>
                                                <div>ANIMATIONS</div>
                                            </Hidden>
                                        }
                                        value='c' />
                                    <Tab
                                        icon={<Icon className="material-icons geometry">widgets</Icon>}
                                        label={
                                            <Hidden xsDown>
                                                <div>GROUPS</div>
                                            </Hidden>
                                        }
                                        value='d' />
                                    <Tab
                                        icon={<Icon className="material-icons geometry">highlight</Icon>}
                                        label={
                                            <Hidden xsDown>
                                                <div>LIGHT</div>
                                            </Hidden>
                                        }
                                        value='e' />
                                </Tabs>
                            </div>
                            {<div style={{ margin: 7, overflow: "hidden", minHeight: "2em" }}>
                                <p style={{ fontSize: "80%" }}> Key: <span className="array">array </span>
                                    <span className="bool">bool </span>
                                    <span className="number">number </span>
                                    <span className="string">string </span>
                                    <span className="group">group </span>
                                    <span className="data">data</span></p>
                            </div>}
                            {this.state.value === "a" &&
                                <div style={{ marginTop: 0, overflow: "scroll" }}>
                                    {this.TableEx("geometry")}
                                </div>}
                            {this.state.value === "b" &&
                                <div style={{ marginTop: 0, overflow: "scroll" }}>
                                    {this.TableEx("transformations")}
                                </div>}
                            {this.state.value === "c" &&
                                <div style={{ marginTop: 0, overflow: "scroll" }}>
                                    {this.TableEx("animations")}
                                </div>}
                            {this.state.value === "d" &&
                                <div style={{ marginTop: 0, overflow: "scroll" }}>
                                    {this.TableEx("groups")}
                                </div>}
                            {this.state.value === "e" &&
                                <div style={{ marginTop: 0, overflow: "scroll" }}>
                                    {this.TableEx("lights")}
                                </div>}
                        </Drawer>
                    </React.Fragment> : null}
            </div>
        );
    }
}

export default Reference;