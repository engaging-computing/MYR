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

    renderMessage = () => {
        const style = {
            leftSpacingDiv: {
                marginLeft: "auto"
            },
            messageDiv: {
                marginLeft: "5px"
            }
        };

        return (this.props.title ?
            <>
            <div style={style.leftSpacingDiv}>
                <strong>{this.props.title + ":"}</strong>
            </div>
            <div style={style.messageDiv}>{this.props.message}</div>
            </>
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
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            leftSpacingDiv: {
                marginLeft: "auto"
            },
            button: {
                color: this.props.fontColor || "black"
            }
        };

        return (this.state.isOpen ? 
            <div style={style.div}>
                {this.renderMessage()}
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
   
            </div>
            :
            <></>);
    }
}

export default Banner;