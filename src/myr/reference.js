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

];
let transformations = [
  {
    name: <span>setColor(<span className="string">color</span>)</span>,
    description: <span>Changes the color <a href='https://htmlcolorcodes.com/color-names/' target="_blank" rel="noopener noreferrer">using these color codes</a>.</span>
  },
  {
    name: <span>setPosition(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: "Sets a new 3D position."
  },
  {
    name: <span>setXPos(<span className="number">x</span>)</span>,
    description: <span>Sets a new <span className="number">x</span> position.</span>
  },
  {
    name: <span>setYPos(<span className="number">y</span>)</span>,
    description: <span>Sets a new <span className="number">y</span> position.</span>
  },
  {
    name: <span>setZPos(<span className="number">z</span>)</span>,
    description: <span>Sets a new <span className="number">z</span> position.</span>
  },
  {
    name: <span>setScale(<span className="number">x</span>,<span className="number">y</span>,<span className="number">z</span>)</span>,
    description: "Sets a new 3D scaling factor."
  },
  {
    name: <span>setXScale(<span className="number">x</span>)</span>,
    description: <span>Sets a new <span className="number">x</span> scaling factor.</span>
  },
  {
    name: <span>setYScale(<span className="number">y</span>)</span>,
    description: <span>Sets a new <span className="number">y</span> scaling factor.</span>
  },
  {
    name: <span>setZScale(<span className="number">z</span>)</span>,
    description: <span>Sets a new <span className="number">z</span> scaling factor.</span>
  },
  {
    name: <span>setRotation(<span className="number">x</span>, <span className="number">y</span>, <span className="number">z</span>)</span>,
    description: "Sets new 3D rotation angles."
  },
  {
    name: <span>pitchX(<span className="number">x</span>)</span>,
    description: <span>Sets a new <span className="number">x</span> rotation angle.</span>
  },
  {
    name: <span>yawY(<span className="number">y</span>)</span>,
    description: <span>Sets a new <span className="number">y</span> rotation angle.</span>
  },
  {
    name: <span>rollZ(<span className="number">z</span>)</span>,
    description: <span>Sets a new <span className="number">z</span> rotation angle.</span>
  },
  {
    name: <span>setRadius(<span className="number">radius</span>)</span>,
    description: <span>Sets a new <span className="number">radius</span> attribute.</span>
  },
  {
    name: <span>makeDroppable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Makes entity droppable with <span className="number">mass</span>.</span>
  },
  {
    name: <span>makePushable(<span className="string">element</span>, <span className="number">mass</span>)</span>,
    description: <span>Entity can be pushed using the cursor and with the given <span className="number">mass</span>(default = 2). Will make droppable also.</span>
  },
  {
    name: <span>resetCursor()</span>,
    description: <span>Resets the cursor to the default state.</span>
  },
];
let animations = [
  {
    name: <span>spin(<span className="string">element</span>, <span className="number">magnitude</span>, <span className="bool">loop</span>, <span className="number">duration</span>)</span>,
    description: <span>Spins the element on the y axis <span className="number">magnitude</span> degrees.</span>
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

const reference = {
  geometry: geometry,
  transformations: transformations,
  animations: animations,
};

export default function r(ref = reference) {
  return ref;
}
