import React, { Component } from "react";
import myrReference from "../../myr/modelReference";

import ModelPack from "../structural/Models.js";

import {
    Tabs,
    Tab,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Hidden,
} from "@material-ui/core";

import "../../css/ReferencePage.css";

/**
 * ModelReferencePage is react component for creating Model Reference Page
 */
export default class ModelReferencePage extends Component {
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
     * Helper function for getting the name of the image to retrieve from backend
     * 
     * @param {*} model 
     * @returns 
     */
    imageHelper = (model) => {
        if(model) {
            let models = ModelPack().ModelPack;

            if(models.has(model)) {
                let gltf = models.get(model);
                return gltf.image;
            }
            return null;
        }
        return null;
    };

    /**
     * Create a button that will link to the example scene
     * 
     * @param {string} example name of the API
     * @returns {HTMLElement} IconButton with link to the example scene
     */
    exampleHelper = (example) => {
        if(example) {
            let link = "/modelReference/" + example;
            return (
                <IconButton
                    href={link}
                    className="material-icons">
                    link
                </IconButton>
            );
        }
        return null;
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
                        <TableCell></TableCell>
                        <TableCell className='model'>Image</TableCell>
                        <TableCell className='modRefExample'>Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  >
                    {this.tableData[category].map((row, index) => (
                        <TableRow key={index}>
                            <TableCell >{row.name}</TableCell>
                            <TableCell ></TableCell>
                            <TableCell >
                                <img id="image" src={this.imageHelper(row.model)} alt="alt" height = "90" width = "90"></img>
                            </TableCell>
                            <TableCell >{this.exampleHelper(row.example)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    };

    /**
     * Render reference page for model
     */
    render() {
        return (
            <div id="reference-page">
                <Tabs
                    id="modelReference-tabs"
                    fullWidth={true}
                    value={this.state.value}
                    onChange={this.handleChange} >
                    <Tab
                        icon={<Icon className="material-icons model">model</Icon>}
                        label={
                            <Hidden xsDown>
                                <div>MODEL</div>
                            </Hidden>
                        }
                        value='a' />
                </Tabs>
                {this.state.value === "a" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("model")}
                    </div>}
            </div>
        );
    }
}