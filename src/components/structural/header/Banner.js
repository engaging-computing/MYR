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
            isOpen: true
        };
    }

    closeButtonClick = () => {
        this.setState({isOpen: false});
    }

    renderButtons = () => {
        return (
            <Grid container direction="row" xs={2} alignItems="center" style={{textAlign: "right"}}>
                {this.props.link ?
                    <Grid item xs>
                        <Button variant="outlined" href={this.props.link} target="_blank">{this.props.linkButtonText || "Details"}</Button>
                        <IconButton onClick={this.closeButtonClick}>
                            <Icon className="material-icons">close</Icon>
                        </IconButton>
                    </Grid>
                    :
                    <Grid item xs>
                        <IconButton onClick={this.closeButtonClick}>
                            <Icon className="material-icons">close</Icon>
                        </IconButton>
                    </Grid>
                }
            </Grid>
        );
    }

    renderMessage = () => {
        const style = {
            centerAlign: {
                marginLeft: "auto",
                marginRight: "auto",
                paddingRight: "10px"
            }
        };

        return (
            <Grid container direction="column" xs={11}>
                {this.props.title ? 
                    <Grid item style={style.centerAlign}>
                        <strong>{this.props.title}</strong>
                    </Grid>
                    :
                    <></>
                }
                <Grid item style={style.centerAlign}>{this.props.message}</Grid>
            </Grid>
        );
    }

    render = () => {
        return (this.state.isOpen ? 
            <div style={{
                backgroundColor: this.props.backgroundColor || "yellow"
            }}>
                <Grid container direction="row" alignItems="center" wrap="nowrap">
                    {this.renderMessage()}
                    {this.renderButtons()}
                </Grid>
            </div>
            :
            <></>);
    }
}

export default Banner;