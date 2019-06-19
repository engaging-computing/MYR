import React, { Component } from "react";
import Select from "react-select";

import "../../css/Classroom.css";

const selectStyle = {
    control: base => ({
        ...base,
        background: "#fff",
    }),
    menu: base => ({
        ...base,
    }),
    menuList: base => ({
        ...base,
    }),
    option: (base, state) => ({
        ...base,
        background: "#FFF",
        color: state.isSelected ? "#4169E1" : "#222"
    }),
    container: base => ({
        ...base,
        zIndex: "999"
    })
};

class SelectProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true
        };
    }

    componentDidMount() {
        if (this.props.classroom && this.props.classroom.length !== 0) {
            this.setState({ isDisabled: false });
        }
        else {
            this.setState({ isDisabled: true });
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.classroom && nextProps.classroom.length !== 0) {
            this.setState({ isDisabled: false });
        }
        else {
            this.setState({ isDisabled: true });
        }
    }

    handleChange = (projectID) => {
        if (this.props.user && this.props.user.uid) {
            this.props.editorActions.fetchScene(projectID.value, this.props.uid);
        }
        else {
            this.props.editorActions.fetchScene(projectID.value);
        }
    }

    renderSelect = () => {
        let classroom = this.props.classroom;
        const placeholder = "Select a project";

        return (
            <div>
                <Select
                    key={classroom}
                    placeholder={placeholder}
                    options={classroom}
                    onChange={this.handleChange}
                    styles={selectStyle}
                    isDisabled={this.state.isDisabled} />
            </div >
        );
    }

    render() {
        return (
            <div id="select-project">
                <h3>{(this.props.selectedClassroom) ? "Classroom: " + this.props.selectedClassroom : "Loading classroom..."}</h3>
                <p>{this.props.classroom ? <this.renderSelect /> : "Loading..."} </p>
            </div>
        );
    }
}


export default SelectProject;