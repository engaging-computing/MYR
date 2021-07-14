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

/**
 * React component for selecting list of projects from collection
 */
class SelectProject extends PureComponent {

    /**
     * Fetch the selected scene when the project is selected from the collection
     * @param {Event} projectID ID of the project to be fetch
     */
    handleChange = (projectID) => {
        // show warning if there's unsaved change
        if(this.hasEditorChanged()){
            if(!window.confirm("Are you sure you want to continue?\nYou will lose any unsaved work!")){
                return;
            }
        }

        if (this.props.user && this.props.user.uid) {
            this.props.editorActions.fetchScene(projectID.value, this.props.uid);
        } else {
            this.props.editorActions.fetchScene(projectID.value);
        }
    }

    /**
     * Returns wheter the text in the editor match with the savedText
     * @returns {boolean} true if savedText is different from text in editor, false otherwise.
     */
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

    /**
     * @returns Returns DOM Elements of drop down list of projects
     */
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

    /**
     * @returns Render DOM elements of drop down list of collection
     */
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