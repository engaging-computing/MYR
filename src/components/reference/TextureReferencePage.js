import React from "react";
import myrReference from "../../myr/textureReference";

import TexturePack from "../structural/Textures.js";

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

import "../../css/TextureReferencePage.css";

export default class TextureReference extends React.Component {

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
    }

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

    TableEx = (category) => {

        return (
            <Table  >
                <TableHead >
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                        <TableCell className='texture'>Image</TableCell>
                        <TableCell className='texRefExample'>Example</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  >
                    {this.tableData[category].map((row, index) => (
                        <TableRow key={index}>
                            <TableCell >{row.name}</TableCell>
                            <TableCell ></TableCell>
                            <TableCell >
                                <img id="image" src={this.imageHelper(row.image)} alt="alt" height = "90" width = "90"></img>
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
            <div id="textureReference-page">
                <Tabs
                    id="textureReference-tabs"
                    fullWidth={true}
                    value={this.state.value}
                    onChange={this.handleChange} >
                    <Tab
                        icon={<Icon className="material-icons texture">texture</Icon>}
                        label={
                            <Hidden xsDown>
                                <div>TEXTURE</div>
                            </Hidden>
                        }
                        value='a' />
                </Tabs>
                {this.state.value === "a" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("texture")}
                    </div>}
            </div>
        );
    }
}