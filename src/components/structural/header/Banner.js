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
        return (this.state.isOpen ? 
            <div background={this.props.color || "yellow"}>
                {this.props.message}
                <Button onClick={() => {
                    this.setState({isOpen: false});
                }}>Dismiss</Button>
            </div>
            :
            <div></div>);
    }
}

export default Banner;