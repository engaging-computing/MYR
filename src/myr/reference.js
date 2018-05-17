var geometry = [
  {
    name: 'box()',
    parameters: ["(Object) attributes = {\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Box primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'circle()',
    parameters: ["(Object) attributes = {\n radius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Circle primitive',
    description: "Renders a circle using current internal Myr properties"
  },
  {
    name: 'cone()',
    parameters: ["(Object) attributes = {\n bottomRadius: 4,\n topRadius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Cone primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'dodecahedron()',
    parameters: ["(Object) attributes = {\n radius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Dodecahedron primitive',
    description: "Renders a dodecahedron using current internal Myr properties"
  },
  {
    name: 'icosahedron()',
    parameters: ["(Object) attributes =  {\n radius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Icosahedron primitive',
    description: "Renders a icosahedron using current internal Myr properties"
  },
  {
    name: 'octahedron()',
    parameters: ["(Object) attributes =  {\n radius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Octahedron primitive',
    description: "Renders a octahedron using current internal Myr properties"
  },
  {
    name: 'prism()',
    parameters: ["(Object) attributes =  {\n segments: 5,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Prism primitive',
    description: "Renders a prism using current internal Myr properties. Pass a obj.segments value greater than 2."
  },
  {
    name: 'triangle()',
    parameters: ["(Object) attributes =  {\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Triangle primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'text()',
    parameters: ["(Object) attributes =  {\n value: 'Hello World',\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Text primitive',
    description: "Renders a box using current internal Myr properties"
  },
  {
    name: 'sphere()',
    parameters: ["(Object) attributes =  {\n radius: 1,\n material: {color: 'red'},\n position: '0 0 -2',\n scale: '1 2 3',\n rotation: '0 45 90' };"],
    returnValue: 'js object representation of the Sphere primitive',
    description: "Renders a sphere using current internal Myr properties"
  },
];

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
];

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
    parameters: ["(Object) attributes =\n { type: 'directional' || 'point' || 'ambient',\n color: 'red',\n position: '0 0 -2'};"],
    returnValue: 'js object representation of the Light primitive',
    description: "Renders a light using current internal Myr properties"
  },
];

const reference = {
  geometry: geometry,
  transformations: transformations,
  webvr_components: webvr_components,
};

export default function r(ref = reference) {
  return ref;
}