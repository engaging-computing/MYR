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

        let widthMediaQuery = window.matchMedia("(max-width: 1130px)");
        this.state = {
            isOpen: true,
            mobile: widthMediaQuery.matches
        };
        
        widthMediaQuery.addListener((ev) => {
            this.setState({mobile: ev.matches});
        });
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
                textAlign: "right"
            },
            mobile:{
                paddingLeft: "8px",
                alignItems: "center"
            }
        };

        let linkButton = ( <></> );
        if(this.props.link){
            linkButton = (
                <Button variant="outlined" href={this.props.link} target="_blank">
                    {this.props.linkButtonText || "Details"}
                </Button>
            );
        } 
        
        const closeButton = (
            <IconButton onClick={this.closeButtonClick}>
                <Icon className="material-icons">close</Icon>
            </IconButton>
        );

        return (this.state.mobile ?
            <>
                <Grid item xs={2} style={this.state.mobile ? style.mobile : style.desktop}>
                    {linkButton}
                </Grid>
                <Grid item xs={10} style={{textAlign: "right"}}>
                    {closeButton}
                </Grid>
            </>
            :
            <Grid item xs={2} style={style.desktop}>
                {linkButton}
                {closeButton}
            </Grid>
        );
    }

    renderMessage = () => {
        const style = {
            title: {
                desktop:{
                    paddingLeft: "16px"
                },
                mobile: {
                    alignSelf: "center"
                }
            },
            message: {
                mobile: {
                    paddingLeft: "8px", 
                    paddingRight: "8px"
                },
                desktop: {
                    paddingLeft: "24px",
                    textAlign: "left"
                }
            }
        };

        let title = ( <></> );
        
        if(this.props.title){
            title = (
                <Grid item style={this.state.mobile ? style.title.mobile : style.title.desktop}>
                    <strong>{this.props.title}</strong>
                </Grid>
            );
        }

        return (this.state.mobile ?
            <Grid container direction="column">
                {title}
                <Grid item style={style.message.mobile} xs={12}>{this.props.message}</Grid>
            </Grid>
            :
            <>
                {title}
                <Grid item style={style.message.desktop} xs={10}>{this.props.message}</Grid>
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