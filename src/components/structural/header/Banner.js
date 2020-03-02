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
                backgroundColor: this.props.color,
                width: "100%",
                textAlign: "center"
            },
            p: {
                display: "inline"
            },
            button: {
                float: "right",
                padddingBottom: "2px"
            }
        };

        return (this.state.isOpen ? 
            <div style={style.div}>
                <p style={style.p}>{this.props.message}</p>
                <Button style={style.button} onClick={() => {
                    this.setState({isOpen: false});
                }}>Dismiss</Button>
            </div>
            :
            <div></div>);
    }
}

export default Banner;