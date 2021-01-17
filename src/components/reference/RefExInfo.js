import React, { Component } from "react";
import {
    Button,
    Icon
} from "@material-ui/core";

class ReferenceExampleBox extends Component {

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

    renderParams = (functionParams) => {
        let returnString = "(";
        for (let i = 0; i < functionParams.length; i++) {
            returnString += functionParams[i];
            if (i !== functionParams.length - 1) { returnString += ", "; }
        }
        return returnString += ")";
        // return returnString;
    }

    renderTitle = () => {
        const { functionName, functionParams } = this.props.referenceExample;
        return (
            <h3>{(this.props.referenceExample && functionName) ?
                ("Function: " + functionName + this.renderParams(functionParams))
                : "Loading..."}
            </h3>
        );
    }

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
