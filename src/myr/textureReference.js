import React from "react";
import {
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        maxWidth: 300,
        fontSize: theme.typography.pxToRem(14),
        "& b": {
            fontWeight: "inherit",
        },
    },
}))(Tooltip);

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

let texture = [
    {
        name: "bricks",
        image: "bricks",
        creator: "“Caveman Chuck” Coker",
        example: "bricks",
    }, 
    {
        name: "bark",
        image: "bark",
        creator: "Jacob Gube",
        example: "bark",
    },    
    {
        name: "checkerboard",
        image: "checkerboard",
        creator: "Indolences",
        example: "checkerboard",
    },    
    {
        name: "chevron",
        image: "chevron",
        creator: "Melstampz",
        example: "chevron",
    },
    {
        name: "cobblestone",
        image: "cobblestone",
        creator: "Tiling Tom",
        example: "cobblestone",
    },    
    {
        name: "dirt",
        image: "dirt",
        creator: "Dfass12",
        example: "dirt",
    },    
    {
        name: "duck",
        image: "duck",
        creator: "Francescominciotti",
        example: "duck",
    },    
    {
        name: "fabric",
        image: "fabric",
        creator: "Calebkimbrough",
        example: "fabric",
    },    
    {
        name: "grass",
        image: "grass",
        creator: "zaphad1",
        example: "grass",
    },    
    {
        name: "lava",
        image: "lava",
        creator: "zaphad1",
        example: "lava",
    },    
    {
        name: "leaves",
        image: "leaves",
        creator: "zaphad1",
        example: "leaves",
    },    
    {
        name: "marble",
        image: "marble",
        creator: "JustMeSupport",
        example: "marble",
    },    
    {
        name: "metal",
        image: "metal",
        creator: "CopperScaleDragon",
        example: "metal",
    },    
    {
        name: "paint",
        image: "paint",
        creator: "Walmarc04",
        example: "paint",
    },    
    {
        name: "rug",
        image: "rug",
        creator: "geishaboy500",
        example: "rug",
    },    
    {
        name: "sand",
        image: "sand",
        creator: "Sitges",
        example: "sand",
    },    
    {
        name: "stone",
        image: "stone",
        creator: "Webtreats",
        example: "stone",
    },    
    {
        name: "water",
        image: "water",
        creator: "Grendelkhan",
        example: "water",
    },    
    {
        name: "wood",
        image: "wood",
        creator: "Webtreats",
        example: "wood",
    },    
    
];
 

const textureReference = {
    texture: texture,
};

export default function r(ref = textureReference) {
    return ref;
}
