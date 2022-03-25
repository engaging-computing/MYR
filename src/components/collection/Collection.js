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

/**
 * FUNC to position modal in the middle of the screen
 */
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

/**
 * CSS for modal
 * 
 * @param {*} theme Will use default theme if not provided
 */
const modelStyles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing(60),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(1),
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

/**
 * React Component for Create Collection Modal to Navigate different options for collection
 */
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

    /**
     * Move to selected collection page when selected
     * @param {object} selectedCollection passed the data of selected collection
     */
    handleChange = (selectedCollection) => {
        window.location.assign(window.origin + "/collection/" + selectedCollection.value);
    }

    /**
     * Handle when user deleted the selected collection
     * @param {object} selectedCollection passed the data of selected collection
     */
    handleDelete = (selectedCollection) => {
        let needsToRedirect = (this.props.openCollection === selectedCollection.label);
        this.props.collectionActions.deleteCollection(selectedCollection.value, selectedCollection.label, this.props.user.uid);
        this.handleCloseAll();
        if(needsToRedirect){
            window.location.assign("/");
        }
        this.props.deleteCallback(selectedCollection.label);
    }

    /**
     * Update the state with the collection name user enter in the field
     * @param {string} name name of the state to be change
     * @param {object} event  Event interface when the onChnage event was dispatched
     */
    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    /**
     * Toggle the addOpen state, whether to open "add collection" option
     */
    handleAddCollectionToggle = () => {
        this.setState({ addOpen: !this.state.addOpen });
    }

    /**
     * Toggle the openOpen state, whether to open "open collection" option
     */
    handleOpenCollectionToggle = () => {
        this.setState({ openOpen: !this.state.openOpen });
    }

    /**
     * Toggle the deleteOpen state, whether to open "delete collection" option
     */
    handleDeleteCollectionToggle = () => {
        this.setState({ deleteOpen: !this.state.deleteOpen });
    }

    /**
     * Close the collection modal and all options
     */
    handleCloseAll = () => {
        this.setState({ addOpen: false, openOpen: false, deleteOpen: false });
        this.props.handleCollectionClose();
    }

    /**
     * Returns DOM element for modal to select collections
     */
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

    /**
     * Returns DOM element for modal to delete collections
     */
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

    /**
     * Add new collection to the backend if possible
     */
    handleSubmit = () => {
        if (!this.props.user) {
            window.alert("You must be signed in to create a collection.");
            this.handleAddCollectionToggle();
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

    /**
     * Returns DOM element for modal to add collections
     */
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

    /**
     * Render all of the elements
     */
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
                                    onClick={() => { this.handleOpenCollectionToggle(); }} >
                                    <Icon className="material-icons collection-icon">storage</Icon>
                                    Open a Collection
                                </ButtonBase>
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleDeleteCollectionToggle(); }} >
                                    <Icon className="material-icons collection-icon">delete</Icon>
                                    Delete a Collection
                                </ButtonBase>
                            </div>
                            <div className="col-6">
                                <ButtonBase
                                    style={btnStyle.base}
                                    onClick={() => { this.handleAddCollectionToggle(); }} >
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
                    onClose={this.handleAddCollectionToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleAddCollectionToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.addClass />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openOpen}
                    onClose={this.handleOpenCollectionToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleOpenCollectionToggle()} >
                            <Icon className="material-icons">clear</Icon>
                        </ButtonBase >
                        <this.selectCollection />
                    </div>
                </Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.deleteOpen}
                    onClose={this.handleDeleteCollectionToggle} >
                    <div style={getModalStyle()} className={classes.paper}>
                        <ButtonBase
                            style={{ position: "absolute", right: 15, top: 15 }}
                            onClick={() => this.handleDeleteCollectionToggle()} >
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
