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
        background: "#FFF",
        color: state.isSelected ? "#4169E1" : "#222"
    }),
    container: base => ({
        ...base,
        zIndex: "999"
    })
};

class SelectProject extends PureComponent {
    handleChange = (projectID) => {
        if (this.props.user && this.props.user.uid) {
            this.props.editorActions.fetchScene(projectID.value, this.props.uid);
        }
        else {
            this.props.editorActions.fetchScene(projectID.value);
        }
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
