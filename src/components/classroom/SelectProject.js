import React, { Component } from 'react';
import Select from 'react-select';

import '../../css/Classroom.css';

class SelectProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classroom: this.props.classrooms.classroom
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classrooms.classroom !== this.state.classroom) {
            this.setState({ classroom: nextProps.classrooms.classroom });
        }
    }

    handleChange = (projectID) => {
        if (this.props.user && this.props.user.uid) {
            this.props.fetchScene(projectID, this.props.uid);
        }
        else {
            this.props.fetchScene(projectID);
        }
    }

    renderSelect = () => {
        let classroom = this.state.classroom;

        if (classroom.length !== 0) {
            const placeholder = "Select a project";

            return (
                <div>
                    <Select key={classroom} placeholder={placeholder} options={classroom} onChange={this.handleChange} />
                </div >
            );
        }
        else {
            const placeholder = "This class contains no projects";
            return (
                <div>
                    <Select key={classroom} placeholder={placeholder} isDisabled={true} />
                </div >
            );
        }
    }

    render() {
        return (
            <div id="select-project">
                <h3>{(this.props.selectedClassroom) ? "Classroom: " + this.props.selectedClassroom : "Loading classroom..."}</h3>
                <p>{(this.props.classrooms && this.props.classrooms.classroom) ? <this.renderSelect /> : "Loading..."} </p>
            </div>
        );
    }
}


export default SelectProject;