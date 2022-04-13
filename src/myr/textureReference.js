import React from "react";
import {
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";

/**
 * Custom styles that inject to the cue cards
 */
const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(14),
        "& b": {
            fontWeight: "inherit",
        },
    },
}))(Tooltip);

/**
 * Return a react elements contain a cue-card for String data type
 */
export const stringText = (text) => {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">String</Typography>
                    <p>
                        In computer science a string is any finite sequence of characters
                        (i.e., letters, numerals, symbols and punctuation marks). <br />
                    </p>
                    {text === "elementID" &&
                        <p>An elementID is a special type of string returned by geometries and groups.</p>}
                </React.Fragment>
            }
        >
            <span
                className="string"
                style={{ borderBottom: "1px dotted green" }}>
                {text}
            </span>
        </HtmlTooltip>);
};

/**
 * Return a react elements contain a cue-card for Number data type
 */
export const numberText = (text) => {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">Number</Typography>
                    <p>
                        A number is any real number, or an expression that evaluates to a real number
                        (e.g., -2, 3.14, 1/3).
                    </p>
                </React.Fragment>
            }
        >
            <span
                className="number"
                style={{ borderBottom: "1px dotted blue" }}>
                {text}
            </span>
        </HtmlTooltip>);
};

/**
 * Return a react elements contain a cue-card for Boolean data type
 */
export const boolText = (text) => {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">Bool</Typography>
                    <p>
                        In computer science, the bool data type has one of two possible Boolean values: true or false.
                    </p>
                </React.Fragment>
            }
        >
            <span
                className="bool"
                style={{ borderBottom: "1px dotted red" }}>
                {text}
            </span>
        </HtmlTooltip>);
};

/**
 * Return a react elements contain a cue-card for Array data type
 */
export const arrayText = (text) => {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">Array</Typography>
                    <p>
                        In computer science, an array is a data structure that consists of a number of indexable elements.
                    </p>
                    <p>
                        This code sets the color of the cursor to blue:
                    </p>
                    <p style={{ fontFamily: "monospace" }}>
                        let colors = ["blue", "green", "red"];<br />
                        setColor(colors[0]);<br />
                        box();<br />
                    </p>
                </React.Fragment>
            }
        >
            <span
                className="array"
                style={{ borderBottom: "1px dotted black" }}>
                {text}
            </span>
        </HtmlTooltip>);
};

/**
 * Return a react elements contain a cue-card for dynamic data type
 */
export const dataText = (text) => {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">Data</Typography>
                    <p>
                        Data can be of any valid JS datatype. This includes a strings, numbers, booleans, and objects among other datatypes. <br />
                    </p>
                </React.Fragment>
            }
        >
            <span
                className="data"
                style={{ borderBottom: "1px dotted orange" }}>
                {text}
            </span>
        </HtmlTooltip>);
};

/**
 * List of texture reference
 */
const texture = [
    {
        name: "bricks",
        image: "bricks",
        creator: "“Caveman Chuck” Coker",
    }, 
    {
        name: "bark",
        image: "bark",
        creator: "Jacob Gube",
    },    
    {
        name: "checkerboard",
        image: "checkerboard",
        creator: "Indolences",
    },    
    {
        name: "chevron",
        image: "chevron",
        creator: "Melstampz",
    },
    {
        name: "cobblestone",
        image: "cobblestone",
        creator: "Tiling Tom",
    },    
    {
        name: "dirt",
        image: "dirt",
        creator: "Dfass12",
    },    
    {
        name: "duck",
        image: "duck",
        creator: "Francescominciotti",
    },    
    {
        name: "fabric",
        image: "fabric",
        creator: "Calebkimbrough",
    },    
    {
        name: "grass",
        image: "grass",
        creator: "zaphad1",
    },    
    {
        name: "lava",
        image: "lava",
        creator: "zaphad1",
    },    
    {
        name: "leaves",
        image: "leaves",
        creator: "zaphad1",
    },    
    {
        name: "marble",
        image: "marble",
        creator: "JustMeSupport",
    },    
    {
        name: "metal",
        image: "metal",
        creator: "CopperScaleDragon",
    },    
    {
        name: "paint",
        image: "paint",
        creator: "Walmarc04",
    },    
    {
        name: "rug",
        image: "rug",
        creator: "geishaboy500",
    },    
    {
        name: "sand",
        image: "sand",
        creator: "Sitges",
    },    
    {
        name: "stone",
        image: "stone",
        creator: "Webtreats",
    },    
    {
        name: "water",
        image: "water",
        creator: "Grendelkhan",
    },    
    {
        name: "wood",
        image: "wood",
        creator: "Webtreats",
    },    
];

 
const assets = {
    texture: texture,
    //model: model,
};

export default function r(asset = assets) {
    return asset;
}

