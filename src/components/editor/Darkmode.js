import React from "react";
import {
    Button,
    Select,
    Tooltip,
} from "@material-ui/core";
import "../../css/KeyboardShortcut.css";
export default function DarkModeSelector(userActions, settings) {
    
    // handleFontSizeUpdate = (e) => {
    //     this.props.userActions.updateFontSize(e.target.value);
    //     this.props.refreshText();
    // }

    // const [currentTheme, setCurrentTheme] = useState();
    const themes = [
        "github", "eclipse", "xcode", "dracula", "gruvbox", "monokai"
    ];

    function handleChange(e) {
        userActions.updateFontSize(e.target.value);
    }

    return (
        <div className="theme-div">
            <Tooltip title="Select Editor Theme">
                <Button className="font-button"
                    id="font-size"
                    variant="contained"
                    size="small"
                    color="white"
                >
                    <Select
                        className="theme-select"
                        labelId="input-label"
                        defaultValue="github"
                        value={settings.themeColor}
                        onChange={handleChange}>
                        {themes.map(theme=>(<option value={theme}>{theme}</option>))}
                    </Select>
                </Button>
            </Tooltip>
        </div>
    );
}

