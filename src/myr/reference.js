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

let geometry = [
    {
        name: "box",
        parameters: [],
        description: <span>The box function makes a 3D quadrilateral using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "box"
    },
    {
        name: "circle",
        parameters: [],
        description: <span>The circle function makes a 2D circle using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "circle"
    },
    {
        name: "cone",
        parameters: [],
        description: <span>The cone function makes a cone using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "cone"
    },
    {
        name: "cylinder",
        parameters: [],
        description: <span>The cylinder function makes a cylinder using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "cylinder"
    },
    {
        name: "dodecahedron",
        parameters: [],
        description: <span>The dodecahedron function makes a polyhedron with twelve equilateral faces using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "dodecahedron"
    },
    {
        name: "icosahedron",
        parameters: [],
        description: <span>The icosahedron function makes a polyhedron with twenty equilateral faces using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "icosahedron"
    },
    {
        name: "octahedron",
        parameters: [],
        description: <span>The octahedron function makes a polyhedron with eight equilateral triangular faces using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "octahedron"
    },
    // This is out temporarily until better fleshed out
    //{
    //  name: 'line()',
    //  description: <span>Renders a line using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>
    //},
    {
        name: "plane",
        parameters: [],
        description: <span>The plane geometry creates a flat surface with four 90 degree angles using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "plane"
    },
    {
        name: "prism",
        parameters: [],
        description: <span>The prism function makes a round 3D shape with three edges that meet at the top and bottom using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "prism"
    },
    {
        name: "ring",
        parameters: [],
        description: <span>The ring function makes a flat ring, like a CD, using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "ring"
    },
    {
        name: "sphere",
        parameters: [],
        description: <span>The sphere function makes a sphere (e.g., ball) using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "sphere"
    },
    {
        name: "tetrahedron",
        parameters: [],
        description: <span>The tetrahedron function makes a polyhedron with four equilateral faces using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "tetrahedron"
    },
    {
        name: "text",
        parameters: [{ type: "string", name: "text" }],
        description: <span>The text function prints the given text using the current cursor attributes. If given no text, it will print "Default". This function returns an {stringText("elementID")}.</span>,
        example: "text"
    },
    {
        name: "torus",
        parameters: [],
        description: <span>The torus function makes a curved tube shape, like a donut, using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "torus"
    },
    {
        name: "torusknot",
        parameters: [],
        description: <span>The torusknot function makes a pretzel-like shape using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "torusknot"
    },
    {
        name: "triangle",
        parameters: [],
        description: <span>The triangle function makes flat 2D triangle using the current cursor attributes. This function returns an {stringText("elementID")}.</span>,
        example: "triangle"
    },
    //{
    //  name: <span>tube()</span>,
    //  description: <span>Renders a tube using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    //  example: 'tube'
    //},
    //should this be documented?
    // {
    //   name: 'light()',
    //   description: <span>Renders a light using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
    // },

];

let transformations = [
<<<<<<< HEAD
    {
        name: "resetCursor",
        parameters: [],
        description: <span>The resetCursor function resets the properties of the cursor to their defaults. This includes cursor attributes pertaining to Transformations and Animations.</span>,
        example: "resetCursor"
    },
    {
        name: "setColor",
        parameters: [{ type: "string", name: "color" }],
        description: <span>The setColor function changes the color of the cursor. For general colors, <a href='https://htmlcolorcodes.com/color-names/' target="_blank" rel="noopener noreferrer">HTML color codes</a> can be used (e.g., "blue", "deeppink"), and for specific colors HEX colors can be used (e.g., "#00ffff"). The default cursor state is "red".</span>,
        example: "setColor"
    },
    {
        name: "getRandomColor",
        parameters: [{ type: "array", name: "colors" }],
        description: <span>The getRandomColor function returns a random color and changes the color of the cursor. If passed an array, getRandomColor will choose randomly from the given colors.</span>,
        example: "getRandomColor"
    },
    {
        name: "setPosition",
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The setPosition function changes the position of the cursor along all axes.  The default positions are x:0, y:0, z:0.</span>,
        example: "setPosition"
    },
    {
        name: "setXPos",
        parameters: [{ type: "number", name: "x" }],
        description: <span>The setXPos function changes the x component of the position in the cursor. The default x position is 0.</span>,
        example: "setXPos"
    },
    {
        name: "setYPos",
        parameters: [{ type: "number", name: "y" }],
        description: <span>The setYPos function changes the y component of the position in the cursor. To view negative coordinates, try turning off the floor in the scene settings. The default y position is 0.</span>,
        example: "setYPos"
    },
    {
        name: "setZPos",
        parameters: [{ type: "number", name: "z" }],
        description: <span>The setZPos function changes the z component of the position in the cursor. The default z position is 0.</span>,
        example: "setZPos"
    },
    {
        name: "increasePosition",
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The increasePosition function increases the position of the cursor, or decreases the position using negative values. This function returns the position of the cursor after it is modified. </span>,
    },
    {
        name: "increaseXPos",
        parameters: [{ type: "number", name: "x" }],
        description: <span>The increaseXPos function increases the x position of the cursor, or decreases the position using negative values. This function returns the x position after it is modified. The defualt increases the position by 1.</span>,
    },
    {
        name: "increaseYPos",
        parameters: [{ type: "number", name: "y" }],
        description: <span>The increaseYPos function increases the y position of the cursor, or decreases the position using negative values. This function returns the y position after it is modified. The defualt increases the position by 1.</span>,
    },
    {
        name: "increaseZPos",
        parameters: [{ type: "number", name: "z" }],
        description: <span>The increaseZPos function increases the z position of the cursor, or decreases the position using negative values. This function returns the z position after it is modified. The defualt increases the position by 1.</span>,
    },
    {
        name: "setScale",
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The setScale function changes the scale cursor component to the given ratios. Values greater than 1 make the object larger, and values between 0 and 1 make the object smaller. The default values are x:1, y:1, z:1.</span>,
        example: "setScale"
    },
    {
        name: "setXScale",
        parameters: [{ type: "number", name: "x" }],
        description: <span>The setXScale function changes the x component of the scale in the cursor. Values greater than 1 make the object larger, and values between 0 and 1 make the object smaller. The default x scale is 1.</span>,
        example: "setXScale"
    },
    {
        name: "setYScale",
        parameters: [{ type: "number", name: "y" }],
        description: <span>The setYScale function changes the y component of the scale in the cursor. Values greater than 1 make the object larger, and values between 0 and 1 make the object smaller. The default y scale is 1.</span>,
        example: "setYScale"
    },
    {
        name: "setZScale",
        parameters: [{ type: "number", name: "z" }],
        description: <span>The setZScale function changes the z component of the scale in the cursor. Values greater than 1 make the object larger, and values between 0 and 1 make the object smaller. The default z scale is 1.</span>,
        example: "setZScale"
    },
    {
        name: "setRotation",
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The setRotation function changes the rotation in degrees around the x, y, and z axes. The default values are x:0, y:0, z:0.</span>,
        example: "setRotation"
    },
    {
        name: "pitchX",
        parameters: [{ type: "number", name: "x" }],
        description: <span>The pitchX function changes the rotation in degrees around the x axis. The default value is 0.</span>,
        example: "pitchX"
    },
    {
        name: "yawY",
        parameters: [{ type: "number", name: "y" }],
        description: <span>The yawY function changes the rotation in degrees around the y axis. The default value is 0.</span>,
        example: "yawY"
    },
    {
        name: "rollZ",
        parameters: [{ type: "number", name: "z" }],
        description: <span>The rollZ function changes the rotation in degrees around the z axis. The default value is 0.</span>,
        example: "rollZ"
    },
    {
        name: "setRadius",
        parameters: [{ type: "number", name: "radius" }],
        description: <span>The setRadius function changes the radius of certain shapes. The shapes are: circle, cone, cylinder, dodecahedron, and torus. The default value is 1.</span>,
        example: "setRadius"
    },
    {
        name: "setPhiLength",
        parameters: [{ type: "number", name: "phiLength" }],
        description: <span>The setPhiLength function sets the phi length of the cursor in degrees. This changes the number of degrees shown of certain shapes. Interesting shapes can be achieved with values greater than 360. The default phi length is 360.</span>,
        example: "setPhiLength"
    },
    {
        name: "makeDroppable",
        parameters: [{ type: "string", name: "elementID" }, { type: "number", name: "mass" }],
        description: <span>The makeDroppable function allows the element to be affected by physics and sets the element's mass.</span>,
        example: "makeDroppable"
    },
    {
        name: "makeUnDroppable",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The makeUnDroppable function prevents the given element from being affected by physics.</span>
    },
    {
        name: "makePushable",
        parameters: [{ type: "string", name: "elementID" }, { type: "number", name: "mass" }],
        description: <span>The makePushable function allows the object to be affected by physics and be pushed by clicking with the cursor.</span>,
        example: "makePushable"
    },
    {
        name: "makeUnPushable",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The makeUnPushable function prevents the given element from being affected by physics or being pushed by the cursor.</span>
    },
    //Not quite sure about the inner workings of this one yet
=======
  {
    name: <span>resetCursor()</span>,
    description: <span>Resets the properties of the cursor to their default settings.</span>
  },
  {
    name: <span>setColor(<span className="string">color</span>)</span>,
    description: <span>Changes the color of the cursor <a href='https://htmlcolorcodes.com/color-names/' target="_blank" rel="noopener noreferrer">using these color codes</a>, or HEX values.</span>
  },
  {
    name: <span>setPosition(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: <span>Sets the position of the cursor to the given coordinates.</span>
  },
  {
    name: <span>setXPos(<span className="number">x</span>)</span>,
    description: <span>Changes the position of the cursor along the X axis to the given value.</span>
  },
  {
    name: <span>setYPos(<span className="number">y</span>)</span>,
    description: <span>Changes the position of the cursor along the Y axis to the given value.</span>
  },
  {
    name: <span>setZPos(<span className="number">z</span>)</span>,
    description: <span>Changes the position of the cursor along the Z axis to the given value.</span>
  },
  {
    name: <span>setScale(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: <span>Sets the scale of the cursor to the given ratios.</span>
  },
  {
    name: <span>setXScale(<span className="number">x</span>)</span>,
    description: <span>Changes the scale of the cursor in the X dimension to the given ratio.</span>
  },
  {
    name: <span>setYScale(<span className="number">y</span>)</span>,
    description: <span>Changes the scale of the cursor in the Y dimension to the given ratio.</span>
  },
  {
    name: <span>setZScale(<span className="number">z</span>)</span>,
    description: <span>Changes the scale of the cursor in the Z dimension to the given ratio.</span>
  },
  {
    name: <span>setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Changes the rotation of the cursor to the given angles in degrees.</span>
  },
  {
    name: <span>pitchX(<span className="number">x</span>)</span>,
    description: <span>Changes the pitch (rotation about the x axis) to the given angle in degrees.</span>
  },
  {
    name: <span>yawY(<span className="number">y</span>)</span>,
    description: <span>Changes the yaw (rotation about the y axis) to the given angle in degrees.</span>
  },
  {
    name: <span>rollZ(<span className="number">z</span>)</span>,
    description: <span>Changes the roll (rotation about the z axis) to the given angle in degrees.</span>
  },
  {
    name: <span>setRadius(<span className="number">radius</span>)</span>,
    description: <span>Sets the radius of the cursor to the given <span className="number">radius</span>.</span>
  },
  {
    name: <span>setPhiLength(<span className="number">phiLength</span>)</span>,
    description: <span>Sets the phi length of the cursor to the given <span className="number">phiLength</span> in degrees. This changes the fraction of the circumference shown on certain shapes to be <span className="number">phiLength</span>/360.</span>
  },
  {
    name: <span>makeDroppable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be affected by physics, and sets the mass of the object to <span className="number">mass</span>.</span>
  },
  {
    name: <span>makeUnDroppable(<span className="string">element</span>)</span>,
    description: <span>Prevents the <span className="string">element</span> from being affected by physics.</span>
  },
  {
    name: <span>makePushable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be pushed using the cursor and with the given <span className="number">mass</span>(default = 2). Also makes the object droppable (see above).</span>
  },
  //This function doesn't quite make sense.
  {
    name: <span>makeUnPushable(<span className="string">element</span>)</span>,
    description: <span>Prevents the <span className="string">element</span> from being pushed by the cursor, or being affected by physics.</span>
  },
  //Not quite sure about the inner workings of this one yet
  {
    name: <span>makeSubtractive(<span className="string">element</span>)</span>,
    description: <span>Makes the <span className="string">element</span> erase from other shapes instead of being drawn as a new shape.</span>
  },
  {
    name: <span>makeUnSubtractive(<span className="string">element</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be drawn as a normal geometric shape.</span>
  },
>>>>>>> added documentation for makeSubtractive/makeUnSubtractive in reference section
];

let animations = [
    {
        name: "setLoop",
        parameters: [{ type: "bool", name: "loop" }],
        description: <span>The setLoop function sets the loop attribute in the cursor, turning infinite looping on and off. The default value is true.</span>,
        example: "setLoop"
    },
    {
        name: "setDuration",
        parameters: [{ type: "number", name: "duration" }],
        description: <span>The setDuration function sets the duration attribute of the cursor in milliseconds. The default value is 1000.</span>,
        example: "setDuration"
    },
    {
        name: "setMagnitude",
        parameters: [{ type: "number", name: "magnitude" }],
        description: <span>The setMagnitude function sets the magnitude attribute of the cursor in units or degrees. The default value is 1.</span>,
        example: "setMagnitude"
    },
    {
        name: "spin",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The spin function spins the given element around the y axis in degrees.</span>,
        example: "spin"
    },
    {
        name: "yoyo",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The yoyo function bounces the given element a number of units.</span>,
        example: "yoyo"
    },
    {
        name: "sideToSide",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The sideToSide function shifts the element a number of units in the negative direction on the x axis.</span>,
        example: "sideToSide"
    },
    {
        name: "goUp",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goUp function shifts the element "up", or a certain number of units in a positive direction on the y axis.</span>,
        example: "goUp"
    },
    {
        name: "goDown",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goDown function shifts the element "down", or a certain number of units in a negative direction on the y axis.</span>,
        example: "goDown"
    },
    {
        name: "goRight",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goRight function shifts the element "right", or a certain number of units in a positive direction on the x axis.</span>,
        example: "goRight"
    },
    {
        name: "goLeft",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goLeft function shifts the element "left", or a certain number of units in a negative direction on the x axis.</span>,
        example: "goLeft"
    },
    {
        name: "goTowards",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goTowards function shifts the element "towards" the default camera view, or a certain number of units in a positive direction on the z axis.</span>,
        example: "goTowards"
    },
    {
        name: "goAway",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The goAway function shifts the element "away" from the default camera view, or a certain number of units in a negative direction on the z axis.</span>,
        example: "goAway"
    },
    {
        name: "grow",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The grow function scales the element by a [magnitude] multiplier in the x, y, z components.</span>,
        example: "grow"
    },
    {
        name: "shrink",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The shrink function scales the element down by the inverse of the magnitude in the x, y, z components.</span>,
        example: "shrink"
    },
    {
        name: "fadeOut",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The fadeOut function shifts from transparency:1 (opaque) to transparency:magnitude. Magnitude should be between 0 and 1 inclusive.</span>,
        example: "fadeOut"
    },
    {
        name: "fadeIn",
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The fadeIn function shifts from transparency:0 (invisible) to transparency:magnitude. Magnitude should be between 0 (exclusive) and 1 (inclusive).</span>,
        example: "fadeIn"
    },
    {
        name: "colorShift",
        parameters: [{ type: "string", name: "elementID" }, { type: "string", name: "color" }],
        description: <span>The colorShift function shifts the element from its original color to the given color. All colors valid for setColor are applicable.</span>,
        example: "colorShift"
    },

    // {
    //   name: <span>spin(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Spins the element around the y axis <span className="number">magnitude</span> degrees.</span>
    // },
    // {
    //   name: <span>yoyo(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Bounces the element <span className="number">magnitude</span> units in a positive direction on the y axis for <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>sideToSide(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Shifts the element <span className="number">magnitude</span> units in a negative direction on the x axis and back to the original coordinate over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goUp(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the y axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goDown(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the y axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goRight(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the x axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goLeft(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the x axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goTowards(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the z axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>goAway(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the z axis over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>grow(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Scales the element by a <span className="number">magnitude</span> multiplier over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>shrink(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Scales the element by a 1/<span className="number">magnitude</span> multiplier over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>fadeOut(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Modifies transparency from 1 to <span className="number">magnitude</span> [0,1) over <span className="number">duration</span> milliseconds.</span>
    // },
    // {
    //   name: <span>fadeIn(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    //   description: <span>Modifies transparency from 0 to <span className="number">magnitude</span> (0,1] over <span className="number">duration</span> milliseconds.</span>
    // },
];

let groups = [
    {
        name: <span>let <span className="group">myGroup</span> = group</span>,
        parameters: [],
        description: <span>The group function creates an entity that can store other elements. This function does not draw anything.</span>,
        example: "group"
    },
    {
        name: <span><span className="group">myGroup</span>.add</span>,
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The myGroup.add function adds an element to the group.</span>,
        example: "g.add"
    },
    {
        name: <span><span className="group">myGroup</span>.remove</span>,
        parameters: [{ type: "string", name: "elementID" }],
        description: <span>The myGroup.remove function removes the given element from the group. The object will print with the cursor properties that it was made with, but will no longer be affected by modifications to the group.</span>,
        example: "g.remove"
    },
    {
        name: <span><span className="group">myGroup</span>.setPosition</span>,
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The myGroup.setPosition sets the position of the center of the group.</span>,
        example: "g.setPosition"
    },
    {
        name: <span><span className="group">myGroup</span>.setScale</span>,
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The myGroup.setScale function sets the scale of the group. Values greater than 1 make the entity larger, values between 0 and 1 will make the entity smaller.</span>,
        example: "g.setScale"
    },
    {
        name: <span><span className="group">myGroup</span>.setRotation</span>,
        parameters: [{ type: "number", name: "x" }, { type: "number", name: "y" }, { type: "number", name: "z" }],
        description: <span>The myGroup.setRotation function sets the rotation of the group.</span>,
        example: "g.setRotation"
    },

];

const reference = {
    geometry: geometry,
    transformations: transformations,
    animations: animations,
    groups: groups,
};

export default function r(ref = reference) {
    return ref;
}
