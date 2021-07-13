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
 * Open texture reference page
 */
const handleTextureOpen = () => {
    window.open(window.origin + "/textureReference");
};

/**
 * Open model reference page
 */
const handleModelOpen = () => {
    window.open(window.origin + "/modelReference");
};

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
 * List of geometry reference
 */
const geometry = [
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
    {
        name: "gltfModel",
        parameters: [{ type: "string" }],
        description: <span>The gltfModel function loads a glTF model using the current cursor attributes. This function returns an {stringText("elementID")}. Models can be loaded either by using the name of one of <button id="models" onClick = {handleModelOpen} style = {{backgroundColor:"white", color:"#47a0ff", padding:0, border:"none"}}>these models</button> or by inserting a valid url (e.g. "duck" or "https://learnmyr.org/models/duck.glb"). Depending on the policy of the website they’re from, model URLs may not be usable, which will result in no model appearing.</span>,
        example: "model"
    },
    // This is out temporarily until better fleshed out
    //{
    //  name: 'line()',
    //  description: <span>Renders a line using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>
    //},
    // {
    //     name: <span>tube()</span>,
    //     parameters:[],
    //     description: <span>Renders a tube using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    //     example: "tube"
    // },
];

/**
 * List of transformation reference
 */
const transformations = [
    {
        name: "resetCursor",
        parameters: [],
        description: <span>The resetCursor function resets the properties of the cursor to their defaults. This includes cursor attributes pertaining to Transformations and Animations.</span>,
        example: "resetCursor"
    },
    {
        name: "resetTransformationCursor",
        parameters: [],
        description: <span>The resetTransformationCursor function resets the transformation properties of the cursor to their defaults.</span>,
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
        name: "getColor",
        parameters: [],
        description: <span>returns the current color of the cursor. The color can be changed by the setColor() or getRandomColor() functions </span>,
    },
    {
        name: "setTexture",
        parameters: [{type: "string", name: "texture"}, {type: "number", name: "widthRepeat"}, {type: "number", name: "heightRepeat"}],
        description: <span>The setTexture function changes the texture of the cursor. The texture's normal color is displayed when setTextureColoring() is false, otherwise the texture will be affected by the current color. Textures can be applied either by using the name of one of <button id="textures" onClick = {handleTextureOpen} style = {{backgroundColor:"white", color:"#47a0ff", padding:0, border:"none"}}>these textures</button> or by inserting a valid url (e.g. "bricks" or "https://learnmyr.org/img/MYR-Logo.png"). WidthRepeat and heightRepeat will change how many times the texture is displayed on the object in each direction. If widthRepeat and heightRepeat are not declared they will be set to default settings. Depending on the policy of the website they’re from, image URLs may not be usable, which will result in a blank Texture and Color. An empty setTexture() or setTexture("") statement will remove the current texture.</span>,
        example: "setTexture"
    },
    {
        name: "setTextureColoring",
        parameters: [{type: "bool", name:"boolean"}],
        description: <span>The setTextureColoring function sets the textureColoring attribute in the cursor, turning whether colors are applied to objects with textures on and off. The default value is false.</span>,
        example: "setTextureColoring"
    },
    {
        name: "getTexture",
        parameters: [],
        description: <span>returns the current texture of the cursor. The texture can be changed by the setTexture() function.</span>,
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
        name: "setTransparency",
        parameters: [{type: "number", name: "transparency"}],
        description: <span>The setTransparency function changes the opacity of the element. The range of transparency is from 0% (solid) to 100% (invisible). The default is 0%.</span>,
        example: "setTransparency"
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
        name: "getXPos",
        parameters: [],
        description: <span>returns the current x coordinate of the cursor. The x coordinate can be changed in the setPosition, setXPos, increacePosition, or increaceXPos functions.</span>
    },
    {
        name: "getYPos",
        parameters: [],
        description: <span>returns the current y coordinate of the cursor. The y coordinate can be changed in the setPosition, setYPos, increacePosition, or increaceYPos functions.</span>
    },
    {
        name: "getZPos",
        parameters: [],
        description: <span>returns the current z coordinate of the cursor. The z coordinate can be changed in the setPosition, setZPos, increacePosition, or increaceZPos functions.</span>
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
        name: "getXScale",
        parameters: [],
        description: <span>returns the current x scale component of the cursor. The x scale component can be changed by the setScale and setXScale functions.</span>
    },
    {
        name: "getYScale",
        parameters: [],
        description: <span>returns the current y scale component of the cursor. The y scale component can be changed by the setScale and setYScale functions.</span>
    },
    {
        name: "getZScale",
        parameters: [],
        description: <span>returns the current z scale component of the cursor. The z scale component can be changed by the setScale and setZScale functions.</span>
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
        name: "getXRotation",
        parameters: [],
        description: <span>returns the current x rotation component of the cursor. The x rotation component can be changed by the setPosition or pitchX functions.</span>
    },
    {
        name: "getYRotation",
        parameters: [],
        description: <span>returns the current y rotation component of the cursor. The y rotation component can be changed by the setPosition or yawY functions.</span>
    },
    {
        name: "getZRotation",
        parameters: [],
        description: <span>returns the current z rotation component of the cursor. The z rotation component can be changed by the setPosition or rollZ functions.</span>
    },
    {
        name: "setRadius",
        parameters: [{ type: "number", name: "radius" }],
        description: <span>The setRadius function changes the radius of certain shapes. The shapes are: circle, cone, cylinder, dodecahedron, and torus. The default value is 1.</span>,
        example: "setRadius"
    },
    {
        name: "getRadius",
        parameters: [],
        description: <span>Returns the current radius of the cursor. The radius can be changed by the setRadius function.</span>
    },
    {
        name: "setPhiLength",
        parameters: [{ type: "number", name: "phiLength" }],
        description: <span>The setPhiLength function sets the phi length of the cursor in degrees. This changes the number of degrees shown of certain shapes. Interesting shapes can be achieved with values greater than 360. The default phi length is 360.</span>,
        example: "setPhiLength"
    },
    {
        name: "getPhiLength",
        parameters: [],
        description: <span>returns the current phi Length of the cursor. The phi Length can be changed by the setPhiLength function.</span>
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
    {
        name: "setCursorAttribute",
        parameters: [{ type: "string", name: "key" }, { type: "data", name: "value" }],
        description: <span>The setCursorAttribute function allows the user to set a custom attribute and add it to the cursor.</span>
    },
    {
        name: "getCursorAttribute",
        parameters: [{ type: "string", name: "key" }],
        description: <span>The getCursorAttribute function allows the user to get a cursor attributes set by the setCursorAttribute function or by any other cursor setter.</span>
    }
];

/**
 * List of animation reference
 */
const animations = [
    {
        name: "setLoop",
        parameters: [{ type: "bool", name: "loop" }],
        description: <span>The setLoop function sets the loop attribute in the cursor, turning infinite looping on and off. The default value is true.</span>,
        example: "setLoop"
    },
    {
        name: "getLoop",
        parameters: [],
        description: <span>Returns whether the loop attribute has been set to true or false. The default value is true but can be changed by the setLoop function.</span>
    },
    {
        name: "setDuration",
        parameters: [{ type: "number", name: "duration" }],
        description: <span>The setDuration function sets the duration attribute of the cursor in milliseconds. The default value is 1000.</span>,
        example: "setDuration"
    },
    {
        name: "getDuration",
        parameters: [],
        description: <span>The getDuration function returns the current duration attribute of the cursor. The duration can be changed by the setDuration function.</span>
    },
    {
        name: "setMagnitude",
        parameters: [{ type: "number", name: "magnitude" }],
        description: <span>The setMagnitude function sets the magnitude attribute of the cursor in units or degrees. The default value is 1.</span>,
        example: "setMagnitude"
    },
    {
        name: "getMagnitude",
        parameters: [],
        description: <span>The getMagnitude function returns the current magnitude attribute of the cursor. The magnitude can be changed by the setMagnitude function.</span>
    },
    {
        name: "resetAnimationCursor",
        parameters: [],
        description: <span>The resetAnimationCursor function resets the properties of the cursor that contains animation properties to their defaults.</span>,
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
    }
];

/**
 * List of light reference
 */
const lights = [
    {
        name: "resetLightCursor",
        parameters: [],
        description: <span>The resetLightCursor function resets the properties of the cursor that contains light properties to their defaults.</span>
    },
    {
        name: "ambientLight",
        parameters: [],
        description: <span>The ambientLight function makes a light that casts a light in every direction in the scene using the current cursor attributes. This function returns an {stringText("elementID")}.</span>
    },
    {
        name: "directionalLight",
        parameters: [],
        description: <span>The directionalLight function makes a light that casts an infinite, parallel light in a specific direction. This function returns an {stringText("elementID")}.</span>
    },
    {
        name: "spotLight",
        parameters: [],
        description: <span>The spotLight function makes a light that is emitted from a single point in one direction. This function returns an {stringText("elementID")}.</span>
    },
    {
        name: "pointLight",
        parameters: [],
        description: <span>The spotLight function makes a light that is emitted from a single point in all directions. This function returns an {stringText("elementID")}.</span>
    },
    {
        name: "hemisphereLight",
        parameters: [{type:"string",name:"secondColor"}],
        description: <span>The hemisphereLight function makes a light that has 2 colors on opposite sides, creating 2 distinct lighting colors. This function returns an {stringText("elementID")}.</span>
    },
    {
        name: "setIntensity",
        parameters: [{type:"number",name:"intensity"}],
        description: <span>The setIntensity function changes the intensity/strength of the light casting the scene. The default value is 1.0.</span>
    },
    {
        name: "setBeamAngle",
        parameters: [{type:"number",name:"degree"}],
        description: <span>The setBeamAngle function changes the maximum extent of a spotlight from its direction in degrees. The default value is 60.</span>
    },
    {
        name: "setDecay",
        parameters: [{type:"number",name:"decay"}],
        description: <span>The setDecay function changes the rate that light dims as it travels. The default value is 1.0.</span>
    },
    {
        name: "setDistance",
        parameters: [{type:"number",name:"distance"}],
        description: <span>The setDistance function sets the distance where the light’s intensity becomes 0. If the distance is 0, then the light does not decay with distance. The default value is 0.0.</span>
    },
    {
        name: "setDiffusion",
        parameters: [{type:"number",name:"diffusion"}],
        description: <span>The setDiffusion function sets the magnitude of diffusion on the edges of a spotlight . The default value is 0.0.</span>
    },
    {
        name: "setLightTarget",
        parameters: [{type:"number",name:"x"},{type:"number",name:"y"},{type:"number",name:"z"}],
        description: <span>The setLightTarget function sets the point where the light should be pointed to. The default values are x:0, y:0, z:0.</span>
    }
];

/**
 * List of group reference
 */
const groups = [
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

/**
 * Combine lists of refence to single object
 */
const reference = {
    geometry: geometry,
    transformations: transformations,
    animations: animations,
    groups: groups,
    lights:lights,
};

export default function r(ref = reference) {
    return ref;
}
