import React, {Component} from "react";
import Button from "@material-ui/core/Button";

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: true
        };
    }
    render = () => {
        const style = {
            div:{
                backgroundColor: this.props.color || "yellow",
                color: this.props.fontColor || "black",
                width: "100%",
                height: "40px",
                textAlign: "center",
                lineHeight: "35px"
            },
            span: {
                display: "inline-block",
                verticalAlign: "middle",
                lineHeight: "normal"
            },
            button: {
                color: this.props.fontColor || "black",
                float: "right",
                height: "20px"
            }
        };

        return (this.state.isOpen ? 
            <div style={style.div}>
                <span style={style.span}>{this.props.message}</span>
                <Button style={style.button} onClick={() => {
                    this.setState({isOpen: false});
                }}>Dismiss</Button>
            </div>
            :
            <div></div>);
    }
}

export default Banner;