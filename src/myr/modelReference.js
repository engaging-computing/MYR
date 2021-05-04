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

let model = [
    {
        name: "sword",
        model: "sword",
        example: "sword",
    }, 
    {
        name: "fish",
        model: "fish",
        example: "fish",
    },    
    {
        name: "milkTruck",
        model: "milkTruck",
        example: "milkTruck",
    },    
    {
        name: "fox",
        model: "fox",
        example: "fox",
    },
    {
        name: "lantern",
        model: "lantern",
        example: "lantern",
    },
    {
        name: "fabricChair",
        model: "fabricChair",
        example: "fabricChair",
    },
    {
        name: "duck",
        model: "duck",
        example: "duck",
    },
];
 

const modelReference = {
    model: model,
};

export default function r(ref = modelReference) {
    return ref;
}
