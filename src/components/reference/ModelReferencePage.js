import React from "react";
import {model} from "../../myr/modelReference";


import ModelPack from "../structural/Models.js";

import {
    IconButton,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from "@material-ui/core";

import "../../css/ModelReferencePage.css";

export default class ModelReference extends React.Component {

    handleToggle = () => this.setState({ open: !this.state.open, value: "a" });

    handleChange = (event, value) => {
        this.setState({ value });
    };

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



    render() {
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
                <TableBody  > {model.map((row, index) => {
                    console.log(row)                    
                    (<TableRow key={index}>
                        <TableCell >{row.name}</TableCell>
                        <TableCell ></TableCell>
                        <TableCell >
                            <img id="image" src={this.imageHelper(row.model)} alt="alt" height = "90" width = "90"></img>
                        </TableCell>
                        <TableCell >{this.exampleHelper(row.example)}</TableCell>
                    </TableRow>)
                })
                }
                </TableBody>
            </Table>
        );
    }
}