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
    TextField,
    Tooltip,
    Hidden
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

const style = {
    toggleIcon: {
        margin: 2,
        color: "#fff",
    }
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
            filter: ""
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

    assetHandleOpen = () => {
        window.open(window.origin + "/asset-reference");
        this.setState({ value: "a" });
    };

    /**
     * Converts MYR name into JSX elements and adds tooltip for any function with parameters
     * Contains parser in if statement to color the group variable
     * 
     * @param {string} name 
     * @param {array} parameters 
     * @returns parsed JSX element
     */
    nameHelper = (name, parameters) => {
        if(name.includes("myGroup"))
        {
            let index = name.indexOf("myGroup");
            name = 
            (<span>
                {name.slice(0, index)}
                <span className="group">
                    {name.slice(index, index + "myGroup".length)}
                </span>
                {name.slice(index + "myGroup".length)}
            </span>);
        }
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
                    {this.tableData[category].filter(item => item.name.toLowerCase().includes(this.state.filter))
                        .map((row, index) => (
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
     * Creates array of options for the autocomplete feature for the search bar
     *   so keywords can be detectable
     * 
     * @returns {array} array of object each with label and id
     */
    AutocompleteOptions = () => {
        const options=[];
        Object.keys(this.tableData).forEach(key => 
        {
            options.push(...this.tableData[key]
                .map(ref => ({label: ref.name, id: key}))
            );
        });
        return options;
    }
    /**
     * Event Listiner: Adds keyword into local state when typed into searchbar 
     *  for filtering the options of references
     * 
     * @param {string} value 
     */
    OnFilter = (_, value) => {
        this.setState({filter: value.toLowerCase()});
    }

    /**
     * Event Listener: Switches tabs in reference bar if an option in autocomplete is 
     *  selected and not currently in that tab
     * 
     * @param {string} value 
     * @param {string} reason what the user action is
     */
    OnFilterSelect = (_, value, reason) => {
        if(reason === "select-option")
        {
            let category;
            switch(value.id)
            {
                case "geometry": category = "a";
                    break;
                case "transformations": category = "b";
                    break;
                case "animations": category = "c";
                    break;
                case "groups": category = "d";
                    break;
                case "lights": category = "e";
                    break;
                default:
            }
            this.setState({
                value: category, 
                filter: value.label.toLowerCase()
            });
        }
    }

    render() {
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
                                style={style.toggleIcon}>
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

                            <div style={{display:"flex"}}>
                                <h3 className="border-bottom" style={{ padding: 10, fontWeight: 400 }}>MYR API - Reference</h3>
                                <div style={{display:"flex", justifyContent:"flex-end", marginLeft:"auto"}}>
                                    <Autocomplete
                                        freeSolo
                                        style={{display:"flex", width:"250px"}}
                                        options={this.AutocompleteOptions()}
                                        getOptionLabel={option => option.label}
                                        onInputChange={this.OnFilter}
                                        onChange={this.OnFilterSelect}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Search..."
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                    <IconButton
                                        title="Open asset reference page &#013;(in a new tab)"
                                        color="default"
                                        style={{display:"flex"}}
                                        onClick={this.assetHandleOpen}>
                                        <Icon className="material-icons-outlined">settings_system_daydream</Icon>
                                    </IconButton>
                                    <IconButton
                                        title="Open reference page &#013;(in a new tab)"
                                        color="default"
                                        style={{display:"flex"}}
                                        onClick={this.handleOpen}>
                                        <Icon className="material-icons">menu_book</Icon>
                                    </IconButton>
                                    <IconButton
                                        color="default"
                                        style={{display:"flex"}}
                                        onClick={() => {
                                            this.props.handleReferenceToggle();
                                            this.setState({ value: "a" });
                                        }}>
                                        <Icon className="material-icons">close</Icon>
                                    </IconButton>
                                </div>
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
