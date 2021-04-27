import React from "react";
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

import "../../css/ModelReferencePage.css";

export default class ModelReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "a",
        };
        this.tableData = myrReference();
    }

    handleToggle = () => this.setState({ open: !this.state.open, value: "a" });

    handleChange = (event, value) => {
        this.setState({ value });
    };

    imageHelper = (model) => {
        if(model) {
            let models = ModelPack().ModelPack;

            if(models.has(model)) {
                let gltf = models.get(model);
                console.log(gltf.image);
                return gltf.image;
            }
            return null;
        }
        return null;
    };

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

    render() {
        return (
            <div id="modelReference-page">
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