import React from 'react';

let geometry = [
  {
    name: <span>box()</span>,
    description: <span>Renders a box using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'box'
  },
  {
    name: <span>circle()</span>,
    description: <span>Renders a circle using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'circle'
  },
  {
    name: <span>cone()</span>,
    description: <span>Renders a cone using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'cone'
  },
  {
    name: <span>cylinder()</span>,
    description: <span>Renders a cylinder using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'cylinder'
  },
  {
    name: <span>dodecahedron()</span>,
    description: <span>Renders a dodecahedron using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'dodecahedron'
  },
  {
    name: <span>icosahedron()</span>,
    description: <span>Renders a icosahedron using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'icosahedron'
  },
  {
    name: <span>octahedron()</span>,
    description: <span>Renders a octahedron using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'octahedron'
  },
  // This is out temporarily until better fleshed out
  //{
  //  name: 'line()',
  //  description: <span>Renders a line using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>
  //},
  {
    name: <span>plane()</span>,
    description: <span>Renders a plane using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'plane'
  },
  {
    name: <span>prism()</span>,
    description: <span>Renders a prism using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'prism'
  },
  {
    name: <span>ring()</span>,
    description: <span>Renders a ring using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'ring'
  },
  {
    name: <span>sphere()</span>,
    description: <span>Renders a sphere using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'sphere'
  },
  {
    name: <span>tetrahedron()</span>,
    description: <span>Renders a tetrahedron using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'tetrahedron'
  },
  {
    name: <span>text()</span>,
    description: <span>Renders text using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'text'
  },
  {
    name: <span>torus()</span>,
    description: <span>Renders a torus using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'torus'
  },
  {
    name: <span>torusknot()</span>,
    description: <span>Renders a torusknot using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'torusknot'
  },
  {
    name: <span>triangle()</span>,
    description: <span>Renders a triangle using current internal cursor properties. Returns an <span className="string element">element id</span>.</span>,
    example: 'triangle'
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
  {
    name: <span>resetCursor()</span>,
    description: <span>Resets the properties of the cursor to their default settings.</span>,
    example: 'resetCursor'
  },
  {
    name: <span>setColor(<span className="string">color</span>)</span>,
    description: <span>Changes the color of the cursor <a href='https://htmlcolorcodes.com/color-names/' target="_blank" rel="noopener noreferrer">using these color codes</a>, or HEX values. Default: 'red'</span>,
    example: 'setColor'
  },
  {
    name: <span>getRandomColor()</span>,
    description: <span>Changes the color of the cursor to a random color, and returns the color. Default: 'red'</span>,
    example: 'getRandomColor'
  },
  {
    name: <span>setPosition(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: <span>Sets the position of the cursor to the given coordinates. Default: (0,0,0)</span>,
    example: 'setPosition'
  },
  {
    name: <span>setXPos(<span className="number">x</span>)</span>,
    description: <span>Changes the position of the cursor along the X axis to the given value.</span>,
    example: 'setXPos'
  },
  {
    name: <span>setYPos(<span className="number">y</span>)</span>,
    description: <span>Changes the position of the cursor along the Y axis to the given value.</span>,
    example: 'setYPos'
  },
  {
    name: <span>setZPos(<span className="number">z</span>)</span>,
    description: <span>Changes the position of the cursor along the Z axis to the given value.</span>,
    example: 'setZPos'
  },
  {
    name: <span>setScale(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: <span>Sets the scale of the cursor to the given ratios. Default: (1,1,1)</span>,
    example: 'setScale'
  },
  {
    name: <span>setXScale(<span className="number">x</span>)</span>,
    description: <span>Changes the scale of the cursor in the X dimension to the given ratio.</span>,
    example: 'setXScale'
  },
  {
    name: <span>setYScale(<span className="number">y</span>)</span>,
    description: <span>Changes the scale of the cursor in the Y dimension to the given ratio.</span>,
    example: 'setYScale'
  },
  {
    name: <span>setZScale(<span className="number">z</span>)</span>,
    description: <span>Changes the scale of the cursor in the Z dimension to the given ratio.</span>,
    example: 'setZScale'
  },
  {
    name: <span>setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Changes the rotation of the cursor to the given angles in degrees. Default: (0,0,0)</span>,
    example: 'setRotation'
  },
  {
    name: <span>pitchX(<span className="number">x</span>)</span>,
    description: <span>Changes the pitch (rotation about the x axis) to the given angle in degrees.</span>,
    example: 'pitchX'
  },
  {
    name: <span>yawY(<span className="number">y</span>)</span>,
    description: <span>Changes the yaw (rotation about the y axis) to the given angle in degrees.</span>,
    example: 'yawY'
  },
  {
    name: <span>rollZ(<span className="number">z</span>)</span>,
    description: <span>Changes the roll (rotation about the z axis) to the given angle in degrees.</span>,
    example: 'rollZ'
  },
  {
    name: <span>setRadius(<span className="number">radius</span>)</span>,
    description: <span>Sets the radius of the cursor to the given <span className="number">radius</span>. Default: 1</span>,
    example: 'setRadius'
  },
  {
    name: <span>setPhiLength(<span className="number">phiLength</span>)</span>,
    description: <span>Sets the phi length of the cursor to the given <span className="number">phiLength</span> in degrees. This changes the fraction of the circumference shown on certain shapes to be <span className="number">phiLength</span>/360. Default: 360</span>,
    example: 'setPhiLength'
  },
  {
    name: <span>makeDroppable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be affected by physics, and sets the mass of the object to <span className="number">mass</span>.</span>,
    example: 'makeDroppable'
  },
  //{
  //  name: <span>makeUnDroppable(<span className="string">element</span>)</span>,
  //  description: <span>Prevents the <span className="string">element</span> from being affected by physics.</span>
  //},
  {
    name: <span>makePushable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be pushed using the cursor and with the given <span className="number">mass</span>(default = 2). Also makes the object droppable (see above).</span>,
    example: 'makePushable'
  },
  //This function doesn't quite make sense.
  //{
  //  name: <span>makeUnPushable(<span className="string">element</span>)</span>,
  //  description: <span>Prevents the <span className="string">element</span> from being pushed by the cursor, but allows the element to be affected by physics.</span>
  //},
  //Not quite sure about the inner workings of this one yet
  {
    name: <span>makeSubtractive(<span className="string">element</span>)</span>,
    description: <span>Makes the <span className="string">element</span> erase other shapes that it overlaps with, instead of being drawn as a new shape.</span>
  },
  {
    name: <span>makeUnSubtractive(<span className="string">element</span>)</span>,
    description: <span>Allows the <span className="string">element</span> to be drawn as a normal geometric shape.</span>
  },
];

let animations = [
  {
    name: <span>setLoop(<span className="bool">loop</span>)</span>,
    description: <span>Updates the loop attribute in the cursor. Default: true</span>,
    example: 'setLoop'
  },
  {
    name: <span>setDuration(<span className="number">duration</span>)</span>,
    description: <span>Updates the duration attribute in the cursor in milliseconds. Default: 1000</span>,
    example: 'setDuration'
  },
  {
    name: <span>setMagnitude(<span className="number">magnitude</span>)</span>,
    description: <span>Updates the magnitude attribute in the cursor, in degrees and general units. Default: 1</span>,
    example: 'setMagnitude'
  },
  {
    name: <span>spin(<span className="string">element</span>)</span>,
    description: <span>Spins the element around the y axis [magnitude] degrees.</span>,
    example: 'spin'
  },
  {
    name: <span>yoyo(<span className="string">element</span>)</span>,
    description: <span>Bounces the element [magnitude] units in a positive direction on the y axis</span>,
    example: 'yoyo'
  },
  {
    name: <span>sideToSide(<span className="string">element</span>)</span>,
    description: <span>Shifts the element [magnitude] units in a negative direction on the x axis and back to the original coordinates.</span>,
    example: 'sideToSide'
  },
  {
    name: <span>goUp(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a positive direction on the y axis.</span>,
    example: 'goUp'
  },
  {
    name: <span>goDown(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a negative direction on the y axis.</span>,
    example: 'goDown'
  },
  {
    name: <span>goRight(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a positive direction on the x axis.</span>,
    example: 'goRight'
  },
  {
    name: <span>goLeft(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a negative direction on the x axis.</span>,
    example: 'goLeft'
  },
  {
    name: <span>goTowards(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a positive direction on the z axis.</span>,
    example: 'goTowards'
  },
  {
    name: <span>goAway(<span className="string">element</span>)</span>,
    description: <span>Translates the element [magnitude] units in a negative direction on the z axis.</span>,
    example: 'goAway'
  },
  {
    name: <span>grow(<span className="string">element</span>)</span>,
    description: <span>Scales the element by a multiplier, the cursor's magnitude.</span>,
    example: 'grow'
  },
  {
    name: <span>shrink(<span className="string">element</span>)</span>,
    description: <span>Scales the element by a 1/[magnitude] multiplier.</span>,
    example: 'shrink'
  },
  {
    name: <span>fadeOut(<span className="string">element</span>)</span>,
    description: <span>Modifies transparency from 1 to the cursor's magnitude, [0,1).</span>,
    example: 'fadeOut'
  },
  {
    name: <span>fadeIn(<span className="string">element</span>)</span>,
    description: <span>Modifies transparency from 0 to the cursor's magnitude, (0,1].</span>,
    example: 'fadeIn'
  },
  {
    name: <span>colorShift(<span className="string">element</span>, <span className="string">color</span>)</span>,
    description: <span>Shifts from the the element's current color to the given color.</span>,
    example: 'colorShift'
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
    name: <span>let <span className="group">myGroup</span> = group();</span>,
    description: <span>Creates a new empty group and stores it in the variable <span className="group">myGroup</span>.</span>,
    example: 'group'
  },
  {
    name: <span><span className="group">myGroup</span>.add(<span className="string">element ID</span>)</span>,
    description: <span>Adds the element indicated by <span className="string">element ID</span> to the group <span className="group">myGroup</span>.</span>,
    example: 'g.add'
  },
  {
    name: <span><span className="group">myGroup</span>.remove(<span className="string">element ID</span>)</span>,
    description: <span>Removes the element indicated by <span className="string">element ID</span> from the group <span className="group">myGroup</span>.</span>,
    example: 'g.remove'
  },
  {
    name: <span><span className="group">myGroup</span>.setPosition(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Sets the position of the group <span className="group">myGroup</span> to the given coordinates.</span>,
    example: 'g.setPosition'
  },
  {
    name: <span><span className="group">myGroup</span>.setScale(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Sets the scale of the group <span className="group">myGroup</span> to the given dimensions.</span>,
    example: 'g.setScale'
  },
  {
    name: <span><span className="group">myGroup</span>.setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: <span>Changes the rotation of the group <span className="group">myGroup</span> to the given angles (in degrees).</span>,
    example: 'g.setRotation'
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
