import React from 'react';
let geometry = [
  {
    name: 'box()',
    description: <span>Renders a box using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'circle()',
    description: <span>Renders a circle using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'cone()',
    description: <span>Renders a cone using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'cylinder()',
    description: <span>Renders a cylinder using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'dodecahedron()',
    description: <span>Renders a dodecahedron using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'icosahedron()',
    description: <span>Renders a icosahedron using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'octahedron()',
    description: <span>Renders a octahedron using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  //should this be documented?
  {
    name: 'line()',
    description: <span>Renders a line using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'plane()',
    description: <span>Renders a plane using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'prism()',
    description: <span>Renders a prism using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'ring()',
    description: <span>Renders a ring using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'sphere()',
    description: <span>Renders a sphere using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'tetrahedron()',
    description: <span>Renders a tetrahedron using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'text()',
    description: <span>Renders text using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'torus()',
    description: <span>Renders a torus using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'torusknot()',
    description: <span>Renders a torusknot using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'triangle()',
    description: <span>Renders a triangle using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  {
    name: 'tube()',
    description: <span>Renders a tube using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  },
  //should this be documented?
  // {
  //   name: 'light()',
  //   description: <span>Renders a light using current internal MYR properties. Returns an <span className="string element">element id</span>.</span>
  // },

];

let transformations = [
  {
    name: <span>resetCursor()</span>,
    description: <span>Resets the properties of the cursor to their default settings.</span>
  },
  {
    name: <span>setColor(<span className="string">color</span>)</span>,
    description: <span>Changes the color of the cursor <a href='https://htmlcolorcodes.com/color-names/' target="_blank" rel="noopener noreferrer">using these color codes</a>.</span>
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
    description: <span>Sets the scale of the cursor to the given dimensions.</span>
  },
  {
    name: <span>setXScale(<span className="number">x</span>)</span>,
    description: <span>Changes the scale of the cursor in the X dimension to the given value.</span>
  },
  {
    name: <span>setYScale(<span className="number">y</span>)</span>,
    description: <span>Changes the scale of the cursor in the Y dimension to the given value.</span>
  },
  {
    name: <span>setZScale(<span className="number">z</span>)</span>,
    description: <span>Changes the scale of the cursor in the Z dimension to the given value.</span>
  },
  {
    name: <span>setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Changes the rotation of the cursor to the given angles (in degrees).</span>
  },
  {
    name: <span>pitchX(<span className="number">x</span>)</span>,
    description: <span>Changes the pitch (rotation about the x axis).</span>
  },
  {
    name: <span>yawY(<span className="number">y</span>)</span>,
    description: <span>Changes the yaw (rotation about the y axis).</span>
  },
  {
    name: <span>rollZ(<span className="number">z</span>)</span>,
    description: <span>Changes the roll (rotation about the z axis).</span>
  },
  {
    name: <span>setRadius(<span className="number">radius</span>)</span>,
    description: <span>Sets the radius of the brush to the given <span className="number">radius</span>.</span>
  },
  {
    name: <span>makeDroppable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the entity to be affected by physics, and sets the mass of the object to <span className="number">mass</span>.</span>
  },
  {
    name: <span>makeUnDroppable(<span className="string">element</span>)</span>,
    description: <span>Prevents the entity from being affected by physics.</span>
  },
  {
    name: <span>makePushable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the entity to be pushed using the cursor and with the given <span className="number">mass</span>(default = 2). Also makes the object droppable (see above).</span>
  },
  //This function doesn't quite make sense.
  {
    name: <span>makeUnPushable(<span className="string">element</span>)</span>,
    description: <span>Prevents the entity from being pushed by the cursor, or being affected by physics.</span>
  },
  //Not quite sure about the inner workings of this one yet
];

let animations = [
  {
    name: <span>spin(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Spins the element around the y axis <span className="number">magnitude</span> degrees.</span>
  },
  {
    name: <span>yoyo(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Bounces the element <span className="number">magnitude</span> units in a positive direction on the y axis.</span>
  },
  {
    name: <span>sideToSide(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Shifts the element <span className="number">magnitude</span> units in a negative direction on the x axis and back to the original coordinate.</span>
  },
  {
    name: <span>goUp(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the y axis.</span>
  },
  {
    name: <span>goDown(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the y axis.</span>
  },
  {
    name: <span>goRight(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the x axis.</span>
  },
  {
    name: <span>goLeft(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the x axis.</span>
  },
  {
    name: <span>goTowards(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a positive direction on the z axis.</span>
  },
  {
    name: <span>goAway(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Translates the element <span className="number">magnitude</span> units in a negative direction on the z axis.</span>
  },
  {
    name: <span>grow(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Scales the element by a <span className="number">magnitude</span> multiplier.</span>
  },
  {
    name: <span>shrink(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Scales the element by a 1/<span className="number">magnitude</span> multiplier.</span>
  },
  {
    name: <span>fadeOut(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Modifies transparency from 1 to <span className="number">magnitude</span> [0,1).</span>
  },
  {
    name: <span>fadeIn(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Modifies transparency from 0 to <span className="number">magnitude</span> (0,1].</span>
  },
];

let groups = [
  {
    name: <span>let <span className="group">myGroup</span> = group();</span>,
    description: <span>Creates a new empty group and stores it in the variable <span className="group">myGroup</span>.</span>
  },
  {
    name: <span><span className="group">myGroup</span>.add(<span className="string">element ID</span>)</span>,
    description: <span>Adds the element indicated by <span className="string">element ID</span> to the group <span className="group">myGroup</span>.</span>
  },
  {
    name: <span><span className="group">myGroup</span>.remove(<span className="string">element ID</span>)</span>,
    description: <span>Removes the element indicated by <span className="string">element ID</span> from the group <span className="group">myGroup</span>.</span>
  },
  {
    name: <span><span className="group">myGroup</span>.setPosition(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Sets the position of the group <span className="group">myGroup</span> to the given coordinates.</span>
  },
  {
    name: <span><span className="group">myGroup</span>.setScale(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Sets the scale of the group <span className="group">myGroup</span> to the given dimensions.</span>
  },
  {
    name: <span><span className="group">myGroup</span>.setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Changes the rotation of the group <span className="group">myGroup</span> to the given angles (in degrees).</span>
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
