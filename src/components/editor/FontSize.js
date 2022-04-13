import React from "react";
import {
    Select,
    Button,
    Tooltip,
    createTheme,
    ThemeProvider,
    Icon
} from "@material-ui/core";

import "../../css/KeyboardShortcut.css";


const fontTheme = createTheme({
    palette: {
        primary: {
            main: "#9c27b0",
        },
        secondary: {
            main: "#9c27b0",
        }
    },
});

const options=[12, 14, 18, 24, 30, 36, 48];
class FontSize extends React.Component {
    
    handleFontSizeUpdate = (e) => {
        this.props.userActions.updateFontSize(e.target.value);
    }

    render(){
        return(
            <div className="font">
                <ThemeProvider theme={fontTheme}>
                    <Tooltip title="Font Size">
                        <Button className="font-button"
                            variant="contained"
                            size="small"
                            color="primary">
                            <Icon className="material-icons">format_size</Icon>
                            <Select className="select"
                                labelId="input-label"
                                defaultValue = {12}
                                value = {this.props.settings.fontSize}
                                onChange = {this.handleFontSizeUpdate}>
                                {options.map(size=>(<option value={size}>{size}</option>))}
                            </Select> 
                        </Button>
                    </Tooltip>
                </ThemeProvider>
            </div> 
        );
    }
}
export default FontSize;

