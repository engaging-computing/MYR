var geometry = [
  {
    name: 'box()',
    parameters: ["(Object) attributes =  { material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Box primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'circle()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Circle primitive',
    description: "Renders a circle using current internal Myr properties"
  },
  {
    name: 'cone()',
    parameters: ["(Object) attributes =  { bottomRadius: 4, topRadius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Cone primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'dodecahedron()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Dodecahedron primitive',
    description: "Renders a dodecahedron using current internal Myr properties"
  },
  {
    name: 'icosahedron()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Icosahedron primitive',
    description: "Renders a icosahedron using current internal Myr properties"
  },
  {
    name: 'octahedron()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Octahedron primitive',
    description: "Renders a octahedron using current internal Myr properties"
  },
  {
    name: 'prism()',
    parameters: ["(Object) attributes =  { segments: 5, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Prism primitive',
    description: "Renders a prism using current internal Myr properties. Pass a obj.segments value greater than 2."
  },
  {
    name: 'triangle()',
    parameters: ["(Object) attributes =  { material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Triangle primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'text()',
    parameters: ["(Object) attributes =  { value: 'Hello World', material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Text primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'sphere()',
    parameters: ["(Object) attributes =  { radius: 1, material: {color: 'red'}, position: '0 0 -2', scale: '1 2 3', rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Sphere primitive',
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
    returnValue: 'js object representation of the new position',
    description: "Sets a new 3D position"
  },
  {
    name: 'setScale(x,y,z)',
    parameters: [
      "(Number) x =  0;",
      "(Number) y =  1;",
      "(Number) z =  -2;",
    ],
    returnValue: 'js object representation of the new scale',
    description: "Sets a new 3D scaling factor"
  },
  {
    name: 'setRotation(x,y,z)',
    parameters: [
      "(Number) x =  0;",
      "(Number) y =  1;",
      "(Number) z =  -2;",
    ],
    returnValue: 'js object representation of the new rotation',
    description: "Sets new 3D rotation angles"
  },
  {
    name: 'setRadius(r)',
    parameters: [
      "(Number) r =  1;",
    ],
    returnValue: 'js object representation of the new radius',
    description: "Sets a new radius attribute"
  },
]

var webvr_components = [
  {
    name: 'setCursor(x,y,z)',
    parameters: [
      "(Number) x =  0;",
      "(Number) y =  1;",
      "(Number) z =  -2;",
    ],
    returnValue: 'js object representation of the new cursor',
    description: `Sets a cursor at the specified 3D position.`
  },
  {
    name: 'setCamera(x,y,z)',
    parameters: [
      "(Number) x =  0;",
      "(Number) y =  1;",
      "(Number) z =  -2;",
    ],
    returnValue: 'js object representation of the new camera',
    description: "Sets the camera to a new 3D position"
  },
  {
    name: 'setLight()',
    parameters: ["(Object) attributes =  { type: 'directional' || 'point' || 'ambient', color: 'red', position: '0 0 -2'};"],
    returnValue: 'js object representation of the Light primitive',
    description: "Renders a light using current internal Myr properties"
  },
]

const reference = {
  geometry: geometry,
  transformations: transformations,
  webvr_components: webvr_components,
}

export default function r(ref = reference) {
  return ref;
}