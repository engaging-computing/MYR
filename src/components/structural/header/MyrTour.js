import React, { Component } from "react";
import Tour from "reactour";
import { Button } from "@material-ui/core";
import * as layoutTypes from "../../../constants/LayoutTypes";

class MyrTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOnlyOnOpen: this.props.viewOnly
        };
    }

    closeTour = () => {
        if (this.state.viewOnlyOnOpen) {
            this.props.changeView();
        }
        this.props.handleTourToggle();
    }

    render() {
        let isDisabled = this.props.layoutType === layoutTypes.REFERENCE;
        return (
            <React.Fragment>
                {!isDisabled ?
                    <React.Fragment>
                        <Tour
                            steps={formatSteps(steps)}
                            maskClassName="mask"
                            isOpen={this.props.tourOpen}
                            onAfterOpen={() => {
                                this.setState({ viewOnlyOnOpen: this.props.viewOnly });
                                if (this.props.viewOnly) {
                                    this.props.changeView();
                                }
                            }}
                            onRequestClose={this.closeTour} />
                        <Button
                            style={{ color: "#fff", fontSize: "66%" }}
                            size="small"
                            className="d-none d-md-block"
                            onClick={() => {
                                this.props.handleTourToggle();
                                if (this.props.referenceOpen) {
                                    this.props.handleReferenceToggle();
                                }
                            }}>
                            Take the Tour
                        </ Button>
                    </React.Fragment>
                    : null
                }
            </React.Fragment>
        );
    }
}

const formatLineBreaks = (string) => {
    if (typeof string !== "string") {
        return string;
    }
    else {
        return (
            <div>
                {
                    string.split("\n").map( (i, key) => {
                        return <div key={key}>{i}</div>;
                    })
                }
            </div>
        );
    }
};

const formatSteps = (steps) => {
    return steps.map( (step) => {
        step.content = formatLineBreaks(step.content);
        return step;
    });
};

const steps = [
    {
        selector: "#ace-editor",
        content: "This is the editor. You can create 3D scenes using JavaScript " +
            "and a special set of instructions or functions to MYR.\nThe editor can be " +
            "toggled on and off by opening the settings menu in the top right and " +
            "clicking the \"View Editor\" switch."
    },
    {
        selector: "#play-btn",
        content: "The Play button will render the scene."
    },
    {
        selector: "#stop-btn",
        content: "The Stop button will stop the scene. \nUse this to save battery."
    },
    {
        selector: "#scene",
        content: "The View is where you can see your work. " +
            "You can navigate the scene with the following controls: \n" +
            "W: Forward \n" +
            "A: Left\n" +
            "S: Backward\n" +
            "D: Right\n" +
            "Space: Fly Upwards\n" +
            "Shift: Fly Downwards\n" +
            "To view the scene in VR, click the goggles!"
    },
    {
        selector: "#new-btn",
        content: "Create a new scene from scratch. Be sure to save first!",
    },
    {
        selector: "#save-btn",
        content: "Save your work.",
    },
    {
        selector: "#open-btn",
        content: "See previous work and view examples.",
    },
    {
        selector: "#ref-btn",
        content: "Use the Reference to see all MYR has to offer.",
    },
    {
        selector: "#configure-scene",
        content: "Modify and share your scene including setting the background color, enabling the grid, and enabling flying.",
    },
    {
        selector: "#select-course",
        content: "View the list of available courses to get you started on using MYR.",
    },
    {
        selector: "#user",
        content: "You can log in with a Google account in order to save your scenes.",
    },
];

export default MyrTour;
