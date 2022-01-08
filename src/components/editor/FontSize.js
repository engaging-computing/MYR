import React from "react";
import {
    Select,
    Button,
    Tooltip,
    Icon
} from "@material-ui/core";
import "../../css/KeyboardShortcut.css";
class FontSize extends React.Component {
    
    handleFontSizeUpdate = (e) => {
        this.props.userActions.updateFontSize(e.target.value);
    }

    render(){
        return(
            <div className="font">
                <Tooltip title="Font Size">
                    <Button className="font-button"
                        variant="contained"
                        size="small"
                        color="secondary">
                        <Icon className="material-icons">format_size</Icon>
                        <Select className="select"
                            labelId="input-label"
                            defaultValue = {12}
                            value = {this.props.settings.fontSize}
                            onChange = {this.handleFontSizeUpdate}>
                            <option value={12}>12</option>
                            <option value={18}>18</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={28}>28</option>
                            <option value={35}>35</option>
                            <option value={50}>50</option>
                        </Select> 
                    </Button>
                </Tooltip>
            </div> 
        );
    }
}
export default FontSize;

