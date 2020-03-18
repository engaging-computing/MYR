import React, {Component} from "react";
import {
    Button,
    Icon,
    IconButton,
    Grid
} from "@material-ui/core";

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: true,
            mobile: window.matchMedia("(max-width: 800px)").matches
        };
    }

    closeButtonClick = () => {
        this.setState({isOpen: false});
    }

    renderButtons = () => {
        const style = {
            desktop: {
                marginTop: "8px",
                paddingLeft: "36px",
                paddingRight: "8px",
                textAlign: "left"
            },
            mobile:{
                paddingLeft: "8px",
                alignItems: "center"
            }
        };
        return (this.state.mobile ?
            <>
            <Grid item xs={2} style={style.mobile}>
                {this.props.link ? 
                    <Button variant="outlined" href={this.props.link} target="_blank">{this.props.linkButtonText || "Details"}</Button>
                    :
                    <></>                    
                }
            </Grid>
            <Grid item xs={10} style={{textAlign: "right"}}>
                <IconButton onClick={this.closeButtonClick}>
                    <Icon className="material-icons">close</Icon>
                </IconButton>
            </Grid>
            </>
            :
            <Grid item xs={2} style={style.desktop}>
                {this.props.link ?
                    <Button variant="outlined" href={this.props.link} target="_blank">{this.props.linkButtonText || "Details"}</Button>
                    :
                    <></>
                }
                <IconButton onClick={this.closeButtonClick}>
                    <Icon className="material-icons">close</Icon>
                </IconButton>
            </Grid>
        );
    }

    renderMessage = () => {
        const style = {
            title: {
                paddingLeft: "16px",
                paddingRight: "24px"
            },
            message: {
                paddingLeft: "24px",
            }
        };
        return (this.state.mobile ?
            <Grid container direction="column">
                <Grid item style={{alignSelf: "center"}}>
                    <strong>{this.props.title}</strong>
                </Grid>
                <Grid item style={{paddingLeft: "8px", paddingRight: "8px"}}>{this.props.message}</Grid>
            </Grid>
            :
            <>
            {this.props.title ? 
                <Grid item style={style.title}>
                    <strong>{this.props.title}</strong>
                </Grid>
                :
                <></>
            }
            <Grid item style={style.leftAlign}>{this.props.message}</Grid>
            </>
        );
    }

    renderDesktop = () => {
        return (
            <Grid container direction="row" alignItems="center" wrap="nowrap" style={{paddingBottom: "8px"}}>
                {this.renderMessage()}
                {this.renderButtons()}
            </Grid>
        );
    }

    renderMobile = () => {
        return (
            <>
            <Grid container direction="row" alignItems="center" wrap="nowrap" style={{paddingBottom: "8px"}}>
                {this.renderMessage()}
            </Grid>
            <Grid container direction="row">
                {this.renderButtons()}
            </Grid>
            </>
        );
    }

    render = () => {
        return (this.state.isOpen ? 
            <div style={{
                backgroundColor: this.props.backgroundColor || "yellow"
            }}>
                {this.state.mobile ? 
                    this.renderMobile()
                    :
                    this.renderDesktop()
                }
            </div>
            :
            <></>);
    }
}

export default Banner;