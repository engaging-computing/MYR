import React, { Component } from "react";
import {
    Button,
    Icon
} from "@material-ui/core";

/**
 * Reference Example Box is react component for displaying information about
 * API in reference example scene
 */
class ReferenceExampleBox extends Component {
    /**
     * Check the redux state to see if example has suggested course
     *  and create elements according to it
     * @returns {Button} Button with name of suggested course on it
     */
    suggestedCourse = () => {
        const { suggestedCourse, suggestedCourseName } = this.props.referenceExample;
        return (
            this.props.referenceExample && suggestedCourseName ?
                <Button
                    variant="contained"
                    onClick={() => window.location.assign(`${window.origin}/course/${suggestedCourse}`) }
                    color="primary"
                    className="ref-ex-btn">
                    <Icon className="material-icons">school</Icon>
                    <div id="suggested-course">
                        Suggested Course: {suggestedCourseName}
                    </div>
                </Button>
                : null
        );
    }

    /**
     * Returns parentheses that includes parameters for the example
     * 
     * @param {array} functionParams array of paremeter names
     * @returns {string} list of 
     */
    renderParams = (functionParams) => {
        let returnString = "(";
        for (let i = 0; i < functionParams.length; i++) {
            returnString += functionParams[i];
            if (i !== functionParams.length - 1) { returnString += ", "; }
        }
        return returnString += ")";
        // return returnString;
    }

    /**
     * Create header element with function name and parameters
     * @returns {HTMLElement} h3 tag with "Function: name(parameters)"
     */
    renderTitle = () => {
        const { functionName, functionParams } = this.props.referenceExample;
        return (
            <h3>{(this.props.referenceExample && functionName) ?
                ("Function: " + functionName + this.renderParams(functionParams))
                : "Loading..."}
            </h3>
        );
    }

    /**
     * Render title and description of example scene
     */
    render() {
        return (
            <div id="ref-ex">
                <this.renderTitle />
                <h6>{(this.props.referenceExample && this.props.referenceExample.type) ? "Type: " + this.props.referenceExample.type : "Loading..."}</h6>
                <p>{(this.props.referenceExample && this.props.referenceExample.info) ? this.props.referenceExample.info : "Loading..."} </p>
                <this.suggestedCourse />
            </div>
        );
    }
}

export default ReferenceExampleBox;
