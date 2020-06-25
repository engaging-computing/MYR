import React, { Component } from "react";
import Select from "react-select";

import {
    Button,
    ButtonBase,
    Icon,
    Modal,
    TextField
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import "../../css/Collection.css";

// FUNC to position modal in the middle of the screen
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        maxWidth: "90%"
    };
}

// CSS for modal
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

const btnStyle = {
    base: {
        marginTop: 20,
        justifyContent: "left",
        width: "100%"
    },
    on: {
        color: "#3f51b5",
    },
    off: {
        color: "#333",
    },
    save: {
        padding: 5,
        margin: 5,
        color: "#333",
        width: "100%"
    },
    cancel: {
        padding: 5,
        margin: 5,
        color: "red",
        width: "100%"
    }
};

class CollectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addOpen: false,
            openOpen: false,
            deleteOpen: false,
            newcollectionID: ""
        };
    }

    handleChange = (selectedCollection) => {
        window.location.assign(window.origin + "/collection/" + selectedCollection.value);
    }

    handleDelete = (selectedCollection) => {
        let needsToRedirect = (this.props.openCollection === selectedCollection.label);
        this.props.collectionActions.deleteCollection(selectedCollection.value, selectedCollection.label, this.props.user.uid);
        this.handleCloseAll();
        if(needsToRedirect){
            window.location.assign("/");
        }
        this.props.deleteCallback(selectedCollection.label);
    }

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleAddClassToggle = () => {
        this.setState({ addOpen: !this.state.addOpen });
    }

    handleOpenClassToggle = () => {
        this.setState({ openOpen: !this.state.openOpen });
    }

    handleDeleteClassToggle = () => {
        this.setState({ deleteOpen: !this.state.deleteOpen });
    }

    handleCloseAll = () => {
        this.setState({ addOpen: false, openOpen: false, deleteOpen: false });
        this.props.handleCollectionClose();
    }

    selectCollection = () => {
        const userCollections = this.props.collections.collections;
        let optionItems = [];
        const placeholder = "Select a collection";

        userCollections.map((collection) =>
            optionItems.push({
                value: collection.collectionID,
                label: collection.collectionID
            })
        );

        return (
            <div>
                <h5>Select a collection to open.</h5>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleChange} />
            </div>
        );
    }

    deleteCollection = () => {
        const userCollections = this.props.collections.collections;
        let optionItems = [];
        const placeholder = "Select a collection";

        userCollections.map((collection) =>
            optionItems.push({
                value: collection._id,
                label: collection.collectionID
            })
        );

        return (
            <div>
                <h5>Select a collection to delete.</h5>
                <Select placeholder={placeholder} options={optionItems} onChange={this.handleDelete} />
            </div>
        );
    }

    handleSubmit = () => {
        if (!this.props.user) {
            window.alert("You must be signed in to create a collection.");
            this.handleAddClassToggle();
        }
        else {
            let name = this.state.newcollectionID.toLowerCase();
    
            fetch("/apiv1/collections", {
                method: "POST", 
                body: JSON.stringify({collectID: name}),
                headers:{"Content-Type": "application/json", "x-access-token": this.props.user.uid}
            }).then((resp) => {

                switch(resp.status) {
                    case 201://Success
                        this.props.collectionActions.asyncCollections(this.props.user.uid);
                        window.alert("Collection added!");
                        this.handleCloseAll();
                        break;
                    case 409:
                        window.alert("Error: A collection already exists with that collection name.");
                        break;
                    default:
                        window.alert(`Error creating collection: ${resp.statusText}`);
                        break;
                }
            });
        }
    }

    addClass = () => (
        <div>
            <h5>Please enter a new collection name.</h5>
            <TextField
                id="standard-name"
                type="text"
                onChange={this.handleTextChange("newcollectionID")}
            />
            <Button
                color="primary"
                onClick={() => {
                    this.handleSubmit();
                }} >
                Submit
            </Button>
        </div>
    );

    // Render all of the elements
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.open}
                    onClose={this.props.handleCollectionToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={this.props.handleCollectionToggle} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <div className="row d-flex">
                            <div className="col-12 border-bottom">Collection Options</div>
                            <div className="col-6">
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleOpenClassToggle(); }} >
                                    <Icon className="material-icons collection-icon">storage</Icon>
                                    Open a Collection
                                </ButtonBase>
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleDeleteClassToggle(); }} >
                                    <Icon className="material-icons collection-icon">delete</Icon>
                                    Delete a Collection
                                </ButtonBase>
                            </div>
                            <div className="col-6">
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleAddClassToggle(); }} >
                                    <Icon className="material-icons collection-icon">add_circle</Icon>
                                    Create a Collection
                                </ButtonBase>
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => window.open(window.origin + "/about/collections")} >
                                    <Icon className="material-icons collection-icon">info</Icon>
                                    About Collections
                                </ButtonBase>
                            </div>
                        </div>
                    </div>
                </Modal >
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.addOpen}
                    onClose={this.handleAddClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleAddClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.addClass />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openOpen}
                    onClose={this.handleOpenClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleOpenClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.selectCollection />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteOpen}
                    onClose={this.handleDeleteClassToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleDeleteClassToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.deleteCollection />
                    </div>
                </Modal>
            </div >
        );
    }
}

const Collection = withStyles(modelStyles)(CollectionModal);

export default Collection;
