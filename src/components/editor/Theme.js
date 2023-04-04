import React from "react";
import {
    Button,
    Icon,
    Select,
    Tooltip,
} from "@material-ui/core";
import "../../css/KeyboardShortcut.css";
export default function ThemeSelector(props) {
    const handleThemeEditorUpdate = (e) => {
        props.userActions.updateTheme(e.target.value);
    };

    const themes = [
        "github", "eclipse", "xcode", "dracula", "gruvbox", "monokai"
    ];

    return (
        <div className="theme-div">
            <Tooltip title="Select Editor Theme">
                <Button className="font-button"
                    id="font-size"
                    variant="contained"
                    size="small"
                    color="white"
                >
                    <Icon className="material-icons">format_color_fill</Icon>
                    <Select
                        className="theme-select"
                        labelId="input-label"
                        defaultValue="github"
                        value={props.settings.themeColor}
                        onChange={handleThemeEditorUpdate}>
                        {themes.map(theme=>(<option value={theme}>{theme}</option>))}
                    </Select>
                </Button>
            </Tooltip>
        </div>
    );
}

