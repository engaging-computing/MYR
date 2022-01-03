import React from "react";
import {
    Tooltip,
    NativeSelect
} from "@material-ui/core";
import "../../css/FontSize.css";

/*onst options = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 }
];
*/
class FontSize extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };
    }

    shortcutHelper = (data) => {
        let shortcuts = [];
        data.shortcut.forEach((key,i)=>{
            shortcuts.push(<kbd>{key}</kbd>);
            if(i < data.shortcut.length-1){
                shortcuts.push(" + ");
            }
        });
        return (<p>{shortcuts} {data.description}</p>);
    };

    handleClick = (event) =>{
        this.setState({
            open: true,
            anchorEl: event.target});
    };

    handleClose = () => {
        this.setState({
            open: false,
            anchorEl: null});
    };

    handleFontSizeUpdate = (e, newFont) => {
        this.setState({ fontSize: newFont });
        
        this.props.userActions.updateFontSize(newFont);
    }

    render(){
        return(
            <div>
                <Tooltip title="Font Size">
                    <NativeSelect
                        defaultValue = {12}
                        value = {this.state.fontSize}
                        id="native-select"
                        onChangeCommitted = {this.handleFontSizeUpdate}>
                        <option value={12}>12</option>
                        <option value={20}>20</option>
                        <option value={28}>28</option>
                        <option value={35}>35</option>
                        <option value={100}>100</option>
                    </NativeSelect> 
                </Tooltip>
            </div>
        );
    }
}
export default FontSize;

