import React, {Component} from "react";
import {
    Button,
    Icon,
    IconButton
} from "@material-ui/core";

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: true
        };
    }
    renderButtons = () => {
        const style = {
            leftSpacingDiv: {
                flex: 1,
                marginLeft: "auto",
                marginRight: 0,
                textAlign: "right"
            },
            button: {
                color: this.props.fontColor || "black",
                height: "40px",
                paddingLeft: "15px",
                paddingRight: "15px"
            }
        };

        return (
            <div style={style.leftSpacingDiv}>
                {this.props.link ? 
                    <Button style={style.button} variant="outlined" href={this.props.link} target="_blank">
                        {this.props.linkButtonText ? this.props.linkButtonText : "More Details"}
                    </Button>
                    :
                <></>
                } 
                <IconButton
                    color="default"
                    style={style.button}
                    onClick={() => {
                        this.setState({isOpen: false});
                    }}>
                    <Icon className="material-icons">close</Icon>
                </IconButton>
            </div>
        );
    }
    renderMessage = () => {
        const style = {
            leftSpacingDiv: {
                position: "flex",
                justifyContent: "center",
                textAlign: "center",
                flex: 1
            }
        };

        return (this.props.title ?
            <div style={style.leftSpacingDiv}>
                <strong>{this.props.title}</strong>
                {this.props.message}
            </div>
            :
            <div style={style.leftSpacingDiv}>{this.props.message}</div>
        );
    }

    render = () => {
        const style = {
            div:{
                backgroundColor: this.props.color || "yellow",
                color: this.props.fontColor || "black",
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center"
            },
            spacer: {
                display: "flex",
                flex: 1,
                marginRight: "auto",
                visibility: "hidden"
            }
        };

        return (this.state.isOpen ? 
            <div style={style.div}>
                <div style={style.spacer}></div>
                {this.renderMessage()}
                {this.renderButtons()}
            </div>
            :
            <></>);
    }
}

export default Banner;