import React, { Component } from 'react';
import Select from 'react-select';

import '../../css/Classroom.css';

const selectStyle = {
    control: (base, state) => ({
        ...base,
        background: "#fff",
    }),
    menu: base => ({
        ...base,
    }),
    menuList: base => ({
        ...base,
    }),
    option: base => ({
        ...base,
        background: '#FFF'
    })
};

class SelectProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classroom: this.props.classroom
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classroom !== this.state.classroom) {
            this.setState({ classroom: nextProps.classroom });
            this.forceUpdate();
        }
    }

    handleChange = (projectID) => {
        if (this.props.user && this.props.user.uid) {
            console.log(projectID);
            this.props.fetchScene(projectID.value, this.props.uid);
        }
        else {
            console.log(projectID);
            this.props.fetchScene(projectID.value);
        }
    }

    renderSelect = () => {
        let classroom = this.props.classroom;

        if (this.state.classroom.length !== 0) {
            const placeholder = "Select a project";

            return (
                <div>
                    <Select key={classroom} placeholder={placeholder} options={classroom} onChange={this.handleChange} styles={selectStyle} />
                </div >
            );
        }
        else {
            const placeholder = "This class contains no projects";
            return (
                <div>
                    <Select key={this.state.classroom} placeholder={placeholder} isDisabled={true} />
                </div >
            );
        }
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