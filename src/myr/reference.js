var primitives = [
  {
    name: 'box()',
    parameters: ["(Object) attributes =  { material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'JSON representation of the Box primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'sphere()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'JSON representation of the Sphere primitive',
    description: "Renders a sphere using current internal Myr properties"
  },
]

var transformations = [
  {
    name: 'setPosition(x,y,z)',
    parameters: [
      "(Number) x =  0;",
      "(Number) y =  1;",
      "(Number) z =  -2;",
    ],
    returnValue: 'JSON representation of the new position',
    description: "Sets a new 3D position internally in Myr object"
  },
]

const reference = {
  primitives: primitives,
  transformations: transformations,
}

export default function r(ref = reference) {
  return ref;
}