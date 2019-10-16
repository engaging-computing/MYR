import React, { PureComponent } from "react";
import Select from "react-select";

import "../../css/Collection.css";

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
        background: state.isFocused ? "#F7F7F7" : "#FFF",
        color: state.isSelected ? "#4169E1" : "#222"
    }),
    container: base => ({
        ...base,
        zIndex: "999"
    }),

};

class SelectProject extends PureComponent {
    handleChange = (projectID) => {
        //show warning if there's unsaved change
        if(this.hasEditorChanged()){
            if((window.confirm("Are you sure you want to continue?\nYou will lose any unsaved work!"))){
                if (this.props.user && this.props.user.uid) {
                    this.props.editorActions.fetchScene(projectID.value, this.props.uid);
                } else {
                    this.props.editorActions.fetchScene(projectID.value);
                }
            }
            return;
        }

        if (this.props.user && this.props.user.uid) {
            this.props.editorActions.fetchScene(projectID.value, this.props.uid);
        } else {
            this.props.editorActions.fetchScene(projectID.value);
        }
    }

    hasEditorChanged = () => {
        let text;
        try {
            let editor = window.ace.edit("ace-editor");
            text = editor.getSession().getValue();

        } catch (err) {
            console.error(err);
        }
        if (this.props.savedText === text) {
            return false;
        }
        return true;
    }

    renderSelect = () => {
        let collection = this.props.collection;
        const placeholder = "Select a project";

        return (
            <div>
                <Select
                    key={collection}
                    placeholder={placeholder}
                    options={collection}
                    onChange={this.handleChange}
                    styles={selectStyle} />
            </div >
        );
    }

    render() {
        return (
            <div id="select-project">
                <h3>{(this.props.selectedCollection) ? "Collection: " + this.props.selectedCollection : "Loading collection..."}</h3>
                <p>{this.props.collection ? <this.renderSelect /> : "Loading..."} </p>
            </div>
        );
    }
}

export default SelectProject;