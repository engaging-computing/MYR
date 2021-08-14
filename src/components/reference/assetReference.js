import React from "react";
import ModelTab from "./ModelReferencePage";

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
                        <ModelTab />
                    </div>}
                {this.state.value === "b" &&
                <div style={{ marginTop: 0 }}>
                    {this.TableEx("model")} 
                    {/* Replace with texture tab/class */}
                </div>}
            </div>
        );
    }
}