import React, { Component } from 'react';
import {
    Button,
    Grid,
    Icon,
    Tooltip
} from '@material-ui/core';

class ReferenceExampleBox extends Component {

    suggestedCourse = () => {
        const { suggestedCourse, suggestedCourseName } = this.props.referenceExample;
        return (
            this.props.referenceExample && suggestedCourseName ?
                <Button
                    variant="raised"
                    onClick={() => window.location.href = window.origin + '/course/' + suggestedCourse}
                    color="primary"
                    className="ref-ex-btn">
                    <Icon className="material-icons">school</Icon>
                    Suggested Course: {suggestedCourseName}
                </Button>
                : null
        );
    }

    render() {
        return (
            <div id="ref-ex">
                <h3>{(this.props.referenceExample && this.props.referenceExample.functionName) ? "Function: " + this.props.referenceExample.functionName : "Loading..."}</h3>
                <h6>{(this.props.referenceExample && this.props.referenceExample.type) ? "Type: " + this.props.referenceExample.type : "Loading..."}</h6>
                <p>{(this.props.referenceExample && this.props.referenceExample.info) ? this.props.referenceExample.info : "Loading..."} </p>
                <this.suggestedCourse />
            </div>
        );
    }
}


export default ReferenceExampleBox;
