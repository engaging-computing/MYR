import React from "react";
import Reference from "./Reference";

import {
    Tabs,
    Tab,
    Icon,
    Hidden,
} from "@material-ui/core";

import "../../css/ReferencePage.css";

/**
 * ReferencePage extends Reference class and overrides the render function to create as single page
 */
class ReferencePage extends Reference {
    /**
     * Render reference page
     */
    render() {
        document.title = "Reference | MYR";
        return (
            <div id="reference-page">
                <Tabs
                    id="reference-tabs"
                    variant="fullWidth"
                    value={this.state.value}
                    onChange={this.handleChange} >
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
                        icon={<Icon className="material-icons geometry">highlights</Icon>}
                        label={
                            <Hidden xsDown>
                                <div>LIGHTS</div>
                            </Hidden>
                        }
                        value='e' />
                </Tabs>
                {<div style={{ margin: 5 }}>
                    <p style={{ fontSize: "80%" }}> Key: <span className="array">array </span>
                        <span className="bool">bool </span>
                        <span className="number">number </span>
                        <span className="string">string </span>
                        <span className="group">group </span>
                        <span className="data">data</span></p>
                </div>}
                {this.state.value === "a" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("geometry")}
                    </div>}
                {this.state.value === "b" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("transformations")}
                    </div>}
                {this.state.value === "c" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("animations")}
                    </div>}
                {this.state.value === "d" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("groups")}
                    </div>}
                {this.state.value === "e" &&
                    <div style={{ marginTop: 0 }}>
                        {this.TableEx("lights")}
                    </div>}
            </div>
        );
    }
}

export default ReferencePage;