import React from "react";
import ModelTab from "./ModelReferencePage";
import TextureTab from "./TextureReferencePage";

import {
    Tabs,
    Tab,
    Icon,
    Hidden,
} from "@material-ui/core";

import "../../css/ModelReferencePage.css";

export default class AssetReference extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "a",
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div id="modelReference-page">
                <Tabs
                    id="modelReference-tabs"
                    variant="fullWidth"
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
                    <Tab
                        icon={<Icon className="material-icons texture">texture</Icon>}
                        label={
                            <Hidden xsDown>
                                <div>TEXTURE</div>
                            </Hidden>
                        }
                        value='b' />
                </Tabs>
                {this.state.value === "a" &&
                    <div style={{ marginTop: 0 }}>
                        <ModelTab />
                    </div>}
                {this.state.value === "b" &&
                <div style={{ marginTop: 0 }}>
                    <TextureTab />
                </div>}
            </div>
        );
    }
}