import React, { Component } from "react";

import myrReference from "../../myr/reference";
import * as refFunctions from "../../myr/reference";
import ModelTab from "./ModelReferenceTab";
import TextureTab from "./TextureReferenceTab";

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
    Button,
    //Select,
    Hidden
} from "@material-ui/core";

import "../../css/KeyboardShortcut.css";

const exitBtnStyle = {
    position: "absolute",
    top: 0,
    right: 10,
};
const newTabStyle = {
    position: "absolute",
    top: 0,
    right: 50,
};

const assetReferenceBtn = {
    position: "absolute",
    top: 0,
    right: 50,
};

/**
 * Reference is a react component that creates drawer contains references
 */
class Reference extends Component {
    /**
     * Constructor
     *  value represents the current reference tab that's opened  
     *  assetValue represents the current asset reference tab that's opened 
     */
    constructor(props) {
        super(props);
        this.state = {
            value: "a",
            assetValue: "a",
            isResizing: false,
            lastDownX: 0,
            lastDownY: 0,
            newWidth: {},
            newHeight: {height: 0},
        };
        this.tableData = myrReference();

    }

    componentDidMount() {
        document.addEventListener("mousemove", e => this.handleMousemove(e));
        document.addEventListener("mouseup", e => this.handleMouseup(e));
        document.addEventListener("mousedown", e => this.handleMousedown(e));

        const qsa = new URLSearchParams(window.location.search);
        if (qsa.has("tab") && qsa.get("tab").toLowerCase() === "textures") {
            this.setState({ assetValue: "b" });
        }
    }

    /**
     * Handler for when user clicked the tab, it updates the state "value" with value passed in
     * 
     * @param {Event} event 
     * @param {string} value tab to be changed to. It should be an alphabet
* @param {string} assetValue tab to be changed to in asset drawer. It should be an alphabet

     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleAssetChange = (event, assetValue) => {
        this.setState({ assetValue });
    };

    /**
     * Handler for opening the reference page 
     */
    handleOpen = () => {
        window.open(window.origin + "/reference");
        this.setState({ value: "a" });
    };

    assetHandleOpen = () => {
        window.open(window.origin + "/asset-reference");
        this.setState({ assetValue: "a" });
    };

    handleMousedown = e => {
        if(this.state.newHeight === undefined) {
            this.setState({newHeight: {height: 1}});
        }
        
        if(((648-e.clientY) < (this.state.newHeight.height))) {
            this.setState({ isResizing: true});
        }
    };
      
    handleMousemove = e => {
        if (!this.state.isResizing) {
            return;
        }

        this.setState({ newWidth: { width: e.clientX} });
        this.setState({ newHeight: { height: (648 - e.clientY)} });
    };
      
    handleMouseup = () => {
        this.setState({ isResizing: false });
    };

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
            <Table>
                <TableHead id="refTableHead">
                    <TableRow>
                        <TableCell style={{padding: 6}}>Name</TableCell>
                        <TableCell style={{padding: 6}}>Description</TableCell>
                        <TableCell className='refExample' style={{padding: 4}}>Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  >
                    {this.tableData[category].map((row, index) => (
                        <TableRow key={index}>
                            <TableCell style={{padding: 6}}>{this.nameHelper(row.name, row.parameters)}</TableCell>
                            <TableCell style={{padding: 6}}>{row.description}</TableCell>
                            <TableCell style={{padding: 6}}>{this.exampleHelper(row.example)}</TableCell>
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
        const isDisabled = this.props.layoutType === layoutTypes.REFERENCE;   

        let tempHeight = this.state.newHeight; 
        let tempWidth = this.state.newWidth;     

        return (
            <div className="font">
                {!isDisabled ?
                    <React.Fragment>
                        <Tooltip title="Reference" placement="bottom-start">
                            <Button
                                id="reference-button"
                                variant="contained"
                                size="small"
                                style={{marginRight: 2}}
                                color="primary"
                                onClick={() => {
                                    this.props.handleReferenceToggle();
                                    this.setState({ newHeight: {height: 518}});
                                }}>
                                <Icon className="material-icons">help</Icon>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Assets" placement="bottom-start">
                            <Button
                                id="asset-button"
                                variant="contained"
                                size="small"
                                color="secondary"
                                onClick= {() => {
                                    this.props.handleAssetReferenceToggle();
                                    this.setState({ newHeight: {height: 518}});
                                }}>
                                <Icon className="material-icons">photo</Icon>
                            </Button>
                        </Tooltip>
                        <div className="referenceDrawer-slider">
                            <Drawer
                                PaperProps={{ 
                                    style:  tempHeight, tempWidth       //tempwidth not working
                                }}
                                anchor="bottom"
                                id="reference-drawer"
                                variant="persistent"
                                className={!this.props.referenceOpen ? "d-none" : ""}
                                open={this.props.referenceOpen}>
                                <div>
                                    <h3 id="reference-drawer-header" className="border-bottom" style={{ padding: 2, margin: 0, fontWeight: 400 }}>MYR API - Reference</h3>
                                    <IconButton
                                        color="default"
                                        style={exitBtnStyle}
                                        onClick={() => {
                                            this.props.handleReferenceToggle();
                                            this.setState({ newHeight: 80});
                                            this.setState({ newWidth: 81});
                                            this.setState({ value: "a" });
                                        }}>
                                        <Icon className="material-icons">close</Icon>
                                    </IconButton>
                                    <IconButton
                                        title="Open reference page &#013;(in a new tab)"
                                        color="default"
                                        style={newTabStyle}
                                        onClick={this.handleOpen}>
                                        <Icon className="material-icons">menu_book</Icon>
                                    </IconButton>
                                </div>
                                <div>
                                    <Tabs
                                        id="reference-"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        variant="scrollable">
                                        <Tab
                                            icon={<Icon className="material-icons geometry" style={{ fontSize: 20 }}>category</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>GEOMETRY</div>
                                                </Hidden>
                                            }
                                            value='a' />
                                        <Tab
                                            icon={<Icon className="material-icons color-change" style={{ fontSize: 20 }}>bubble_chart</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>TRANSFORMATIONS</div>
                                                </Hidden>
                                            }
                                            value='b' />
                                        <Tab
                                            icon={<Icon className="material-icons animation-ref" style={{ fontSize: 20 }}>zoom_out_map</Icon>} //swap_horiz control_camera category
                                            label={
                                                <Hidden xsDown>
                                                    <div>ANIMATIONS</div>
                                                </Hidden>
                                            }
                                            value='c' />
                                        <Tab
                                            icon={<Icon className="material-icons geometry" style={{ fontSize: 20 }}>widgets</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>GROUPS</div>
                                                </Hidden>
                                            }
                                            value='d' />
                                        <Tab
                                            icon={<Icon className="material-icons geometry" style={{ fontSize: 20 }}>highlight</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>LIGHT</div>
                                                </Hidden>
                                            }
                                            value='e' />
                                    </Tabs>
                                </div>
                                {<div style={{ margin: 0, overflow: "hidden", minHeight: "1em", paddingBottom: "10px"}}>
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
                        </div>

                        <div className="textureReferenceDrawer-slider">
                            <Drawer
                                PaperProps={{ 
                                    style:  tempHeight, tempWidth       //tempwidth not working
                                }}
                                anchor="bottom"
                                id="textureReference-drawer"
                                variant="persistent"
                                className={!this.props.assetReferenceOpen ? "d-none" : ""}
                                open={this.props.assetReferenceOpen}>
                                <div>
                                    <h3 className="border-bottom" style={{ padding: 2, fontWeight: 400 }}>MYR API - Asset Reference</h3>
                                    <IconButton
                                        color="default"
                                        style={exitBtnStyle}
                                        onClick={() => {
                                            this.props.handleAssetReferenceToggle();
                                            this.setState({ newHeight: 80});
                                            this.setState({ newWidth: 81});
                                            this.setState({ assetValue: "a" });
                                        }}>
                                        <Icon className="material-icons">close</Icon>
                                    </IconButton>
                                    <IconButton
                                        title="Open asset reference page &#013;(in a new tab)"
                                        color="default"
                                        style={assetReferenceBtn}
                                        onClick={this.assetHandleOpen}>
                                        <Icon className="material-icons-outlined">menu_book</Icon>
                                    </IconButton>
                                </div>
                                <div>
                                    <Tabs
                                        id="assetReference-tabs"
                                        onChange={this.handleAssetChange} 
                                        value={this.state.assetValue}
                                        variant="scrollable">
                                        <Tab
                                            icon={<Icon className="material-icons model"  style={{ fontSize: 20 }}>model</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>MODEL</div>
                                                </Hidden>
                                            }
                                            value='a' />
                                        <Tab
                                            icon={<Icon className="material-icons texture"  style={{ fontSize: 20 }}>texture</Icon>}
                                            label={
                                                <Hidden xsDown>
                                                    <div>TEXTURE</div>
                                                </Hidden>
                                            }
                                            value='b' />
                                    </Tabs>
                                    {this.state.assetValue === "a" &&
                                        <div style={{ marginTop: 0 }}>
                                            <ModelTab />
                                        </div>}
                                    {this.state.assetValue === "b" &&
                                        <div style={{ marginTop: 0 }}>
                                            <TextureTab />
                                        </div>}
                                </div>
                            </Drawer>
                        </div>
                        
                    </React.Fragment> : null}
            </div>
        );
    }
}

export default Reference;