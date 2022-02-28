import React, { Component } from "react";
import Tour from "reactour";
import { Button } from "@material-ui/core";
import * as layoutTypes from "../../../constants/LayoutTypes";
import { TourSteps } from "../../../myr/tour";

/**
 * MyrTour components shows the guide of MYR
 */
class MyrTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewOnlyOnOpen: this.props.viewOnly
        };
    }

    /**
     * Handle tour closed
     */
    closeTour = () => {
        if (this.state.viewOnlyOnOpen) {
            this.props.changeView();
        }
        this.props.handleTourToggle();
    }

    /**
     * Create tour
     */
    render() {
        let isDisabled = this.props.layoutType === layoutTypes.REFERENCE;
        return (
            <React.Fragment>
                {!isDisabled ?
                    <React.Fragment>
                        <Tour
                            steps={formatSteps(TourSteps)}
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

/**
 * Wrap each line of string with div
 */
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

/**
 * Formats all the strings of tours into an elements
 */
const formatSteps = (steps) => {
    return steps.map( (step) => {
        step.content = formatLineBreaks(step.content);
        return step;
    });
};

export default MyrTour;
