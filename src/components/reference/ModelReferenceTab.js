import React from "react";
import model from "../../myr/modelReference";

import ModelPack from "../structural/Models.js";

import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
} from "@material-ui/core";

import "../../css/ReferencePage.css";

export default class ModelReference extends React.Component {
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

    render() {
        return (
            <Table  >
                <TableHead >
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell className='model'>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody> {model.map((row, index) => {               
                    return (
                        <TableRow key={index}>
                            <TableCell >{row.name}</TableCell>
                            <TableCell ></TableCell>
                            <TableCell >
                                <img id="image" src={this.imageHelper(row.model)} alt="alt" height = "90" width = "90"></img>
                            </TableCell>
                        </TableRow>);
                })}
                </TableBody>
            </Table>
        );
    }
}