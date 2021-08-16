import React from "react";
import texture from "../../myr/textureReference";

import TexturePack from "../structural/Textures.js";

import {
    IconButton,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@material-ui/core";

import "../../css/TextureReferencePage.css";

export default class TextureReference extends React.Component {
    imageHelper = (image) => {
        if(image) {
            let textures = TexturePack();
            let textureTitle = [...textures.TexturePack.map(obj => obj.title)];
            let textureURL = [...textures.TexturePack.map(obj => obj.url)];
 
            let texture = textureURL[textureTitle.indexOf(image)];

            return (
                texture
            );
        } else {
            return null;
        }
    };

    exampleHelper = (example) => {
        if (example) {
            let link = "/textureReference/" + example;
            return (
                <IconButton
                    href={link}
                    className="material-icons">
                    link
                </IconButton>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <Table  >
                <TableHead >
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell className='texture'>Image</TableCell>
                        <TableCell className='creator'>Image Creator</TableCell>
                        <TableCell className='texRefExample'>Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody> {texture.map((row, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell >{row.name}</TableCell>
                            <TableCell ></TableCell>
                            <TableCell >
                                <img id="image" src={this.imageHelper(row.image)} alt="alt" height = "90" width = "90"></img>
                            </TableCell>
                            <TableCell >{row.creator}</TableCell>
                            <TableCell >{this.exampleHelper(row.example)}</TableCell>
                        </TableRow>);
                })}
                </TableBody>
            </Table>
        );
    }
}