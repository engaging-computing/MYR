import Myr from '../myr/Myr';

const myr = new Myr();

let colorRegEx = new RegExp('#([0-9]|[A-F]|[a-f]){6}');

describe(`Updates to Myr's Model`, () => {

  it(`should set the color`, () => {
    myr.setColor('red');
    expect(myr.color).toEqual('red');
  });

  it(`to SetPosition`, () => {
    myr.setPosition(1, 2, 3);
    expect(myr.position).toEqual({ x: 1, y: 2, z: 3 });
  });

  it(`to SetScale`, () => {
    myr.setScale(1, 2, 3);
    expect(myr.scale).toEqual({ x: 1, y: 2, z: 3 });
  });

  it(`to SetRotation`, () => {
    myr.setRotation(1, 2, 3);
    expect(myr.rotation).toEqual({ x: 1, y: 2, z: 3 });
  });

  it(`to SetRadius`, () => {
    myr.setRadius(10);
    expect(myr.radius).toEqual(10);
    myr.setRadius('a');
    expect(myr.radius).toEqual(10);
    myr.setRadius({});
    expect(myr.radius).toEqual(10);
  });

  it(`to makes Random Color`, () => {
    let color = myr.getRandomColor();
    expect(color).not.toBeUndefined();
    expect(colorRegEx.test(color)).toBeTruthy();
  });
});

describe('Component Renders', () => {
  it(`Box`, () => {
    myr.els = [];
    myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let box = myr.els[0];
    expect(box).toBeDefined();
    expect(box.material).toEqual("color: blue;");
    expect(box.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Sphere`, () => {
    myr.els = [];
    myr.sphere({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let sphere = myr.els[0];
    expect(sphere).toBeDefined();
    expect(sphere.material).toEqual("color: blue;");
    expect(sphere.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Circle`, () => {
    myr.els = [];
    myr.circle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let circle = myr.els[0];
    expect(circle).toBeDefined();
    expect(circle.material).toEqual("color: blue;");
    expect(circle.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  
  it(`Cone`, () => {
    myr.els = [];
    myr.cone({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let cone = myr.els[0];
    expect(cone).toBeDefined();
    expect(cone.material).toEqual("color: blue;");
    expect(cone.position).toEqual({ x: 1, y: 1, z: 1 });
  });
  
  it(`Cylinder`, () => {
    myr.els = [];
    myr.cylinder({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let cylinder = myr.els[0];
    expect(cylinder).toBeDefined();
    expect(cylinder.geometry).toEqual("primitive: cylinder;");
    expect(cylinder.material).toEqual("color: blue;");
    expect(cylinder.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Ring`, () => {
    myr.reset();
    myr.ring();
    let ring = myr.els[0];
    expect(ring).toBeDefined();
    expect(ring.geometry).toEqual("primitive: ring; radiusInner: 0.5; radiusOuter: 1;");
    expect(ring.material).toEqual("color: red; side: double;");
    expect(ring.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it(`Plane`, () => {
    myr.reset();
    myr.els = [];
    myr.plane();
    let plane = myr.els[0];
    expect(plane).toBeDefined();
    expect(plane.geometry).toEqual("primitive: plane; height: 1; width: 1;");
    expect(plane.material).toEqual("color: red; side: double;");
    expect(plane.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('Tetrahedron', () => {
    myr.reset();
    myr.tetrahedron();
    let tetrahedron = myr.els[0];
    expect(tetrahedron).toBeDefined();
    expect(tetrahedron.material).toEqual("color: red; side: double;");
    expect(tetrahedron.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('Triangle', () => {
    myr.els = [];
    myr.triangle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let triangle = myr.els[0];
    expect(triangle).toBeDefined();
    expect(triangle.material).toEqual("color: blue;");
    expect(triangle.position).toEqual({ x: 1, y: 1, z: 1 });
  });


  it('Text', () => {
    myr.els = [];
    myr.setPosition(0, 0, 0);
    myr.text("Hello World!");
    let text = myr.els[0];
    expect(text).toBeDefined();
    expect(text.position).toEqual({ x: 0, y: 0, z: 0 });
    expect(text.value).toEqual("Hello World!");
    expect(text.text).toBeTruthy();
  });

  it('polyhedron', () => {
    myr.els = [];
    myr.polyhedron({
      position: { x: 1, y: 1, z: 1 },
      rotation: { x: 1, y: 1, z: 1 },
      scale: { x: 1, y: 1, z: 1 }
    });
    let polyhedron = myr.els[0];
    expect(polyhedron).toBeDefined();
    expect(polyhedron.position).toEqual({ x: 1, y: 1, z: 1 });
    expect(polyhedron.rotation).toEqual({ x: 1, y: 1, z: 1 });
    expect(polyhedron.scale).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('dodecahedron', () => {
    myr.els = [];
    myr.dodecahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let dodecahedron = myr.els[0];
    expect(dodecahedron).toBeDefined();
    expect(dodecahedron.material).toEqual("color: blue;");
    expect(dodecahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('icosahedron', () => {
    myr.els = [];
    myr.icosahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let icosahedron = myr.els[0];
    expect(icosahedron).toBeDefined();
    expect(icosahedron.material).toEqual("color: blue;");
    expect(icosahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('octahedron', () => {
    myr.els = [];
    myr.octahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let octahedron = myr.els[0];
    expect(octahedron).toBeDefined();
    expect(octahedron.material).toEqual("color: blue;");
    expect(octahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });
});

describe('Component Animations', () => {
  it(`Should add the animate animation`, () => {
    myr.reset();
    let bId = myr.box();
    myr.animate(bId);
    let el = myr.getEl(bId);
    expect( el.animation).toEqual(`
      property: rotation;
      dir: alternate;
      to: 0 360 0;
      dur: 1000;
      loop: true;
    `);
    myr.animate(bId, 720, false, 2000);
    expect( el.animation).toEqual(`
      property: rotation;
      dir: alternate;
      to: 0 720 0;
      dur: 2000;
      loop: false;
    `);
  });

  it(`Should add the spin animation`, () => {
    myr.reset();
    let bId = myr.box();
    myr.spin(bId);
    let el = myr.getEl(bId);
    expect( el.animation__spin).toEqual(`
      property: rotation;
      dir: alternate;
      dur: 1000;
      loop: true;
      easing: linear;
      to: 0 360 0;
    `);
    myr.spin(bId, 720, false, 2000);
    expect( el.animation__spin).toEqual(`
      property: rotation;
      dir: alternate;
      dur: 2000;
      loop: false;
      easing: linear;
      to: 0 720 0;
    `);
  });


});

describe(`Other Myr functionality`, () => {
  it(`Should add a model`, () => {
    myr.reset()
    myr.assets = [];
    myr.addCModel();
    expect(myr.assets).toContainEqual({ id: "c-obj", src: "/img/c.obj" });
  });

  it(`Should drop`, () => {
    myr.reset();
    let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    myr.drop(el);
    let thisEl = myr.els[0];
    expect(thisEl).toHaveProperty('dynamic-body');
  });

  it(`Should return a light`, () => {
    myr.reset();
    let light = myr.light();
    expect(light).toBeTruthy();
    expect(light.color).toMatch(colorRegEx);

  });

  it('should get the right element', () => {
    myr.reset();
    let id = myr.box();
    expect(myr.getEl(id)).toBeDefined();
    expect(myr.getEl(id).geometry).toEqual("primitive: box;");
  });

  it('should get the right index', () => {
    myr.reset();
    let id = myr.box();
    expect(myr.getIndex(id)).toBeDefined();
    expect(myr.getIndex(id)).toEqual(0);
  });

  it('should initialize Myr', () => {
    myr.reset();
    let obj = [{ name: "test" }];
    myr.init(obj);
    expect(myr.els[0].name).toEqual("test");
  });

  it('should reset Myr', () => {
    let m = new Myr();
    let obj = [{ name: "test" }];
    m.init();
    m.sphere();
    m.sphere();
    expect(m.els.length).toEqual(2);

    m.reset();
    expect(m.els.length).toEqual(0);

    m.init(obj);
    expect(m.els.length).toEqual(1);
    expect(m.genNewId()).toEqual('a1');
  });

  it('should set the position in Myr', () => {
    myr.reset();
    myr.setPosition(1);
    expect(myr.position).toEqual({ x: 1, y: 1, z: 0 });
    myr.setPosition(1, 2);
    expect(myr.position).toEqual({ x: 1, y: 2, z: 0 });
    myr.setPosition(1, 2, 3);
    expect(myr.position).toEqual({ x: 1, y: 2, z: 3 });
    myr.setPosition(-1, -2, -3);
    expect(myr.position).toEqual({ x: -1, y: -2, z: -3 });

    // Should reject these values
    myr.setPosition('a', -2, -3);
    expect(myr.position).toEqual({ x: -1, y: -2, z: -3 });
    myr.setPosition({}, -2, -3);
    expect(myr.position).toEqual({ x: -1, y: -2, z: -3 });
    myr.setPosition([], -2, -3);
    expect(myr.position).toEqual({ x: -1, y: -2, z: -3 });
  });

  it('should set the X-position in Myr', () => {
    myr.reset();
    myr.setXPos(5);
    expect(myr.position.x).toEqual(5);
    myr.setXPos(-5);
    expect(myr.position.x).toEqual(-5);

    // Check for stable model with bad values
    myr.setXPos({});
    expect(myr.position.x).toEqual(-5);
    myr.setXPos('a');
    expect(myr.position.x).toEqual(-5);
    myr.setXPos(() => { });
    expect(myr.position.x).toEqual(-5);
    expect(myr.position).toEqual({ x: -5, y: 0, z: 0 });
  });

  it('should set the Y-position in Myr', () => {
    myr.reset();
    myr.setYPos(5);
    expect(myr.position.y).toEqual(5);
    myr.setYPos(-5);
    expect(myr.position.y).toEqual(-5);

    // Check for stable model with bad values
    myr.setYPos({});
    expect(myr.position.y).toEqual(-5);
    myr.setYPos('a');
    expect(myr.position.y).toEqual(-5);
    myr.setYPos(() => { });
    expect(myr.position.y).toEqual(-5);
    expect(myr.position).toEqual({ x: 0, y: -5, z: 0 });

  });

  it('should set the Z-position in Myr', () => {
    myr.reset();
    myr.setZPos(5);
    expect(myr.position.z).toEqual(5);
    myr.setZPos(-5);
    expect(myr.position.z).toEqual(-5);

    // Check for stable model with bad values
    myr.setZPos({});
    expect(myr.position.z).toEqual(-5);
    myr.setZPos('a');
    expect(myr.position.z).toEqual(-5);
    myr.setZPos(() => { });
    expect(myr.position.z).toEqual(-5);
    expect(myr.position).toEqual({ x: 0, y: 0, z: -5 });
  });

  it('should set the scale in Myr', () => {
    myr.reset();
    myr.setScale(4);
    expect(myr.scale).toEqual({ x: 4, y: 1, z: 1 });
    myr.setScale(4, 5);
    expect(myr.scale).toEqual({ x: 4, y: 5, z: 1 });
    myr.setScale(1, 2, 3);
    expect(myr.scale).toEqual({ x: 1, y: 2, z: 3 });
    myr.setScale(-1, -2, -3);
    expect(myr.scale).toEqual({ x: -1, y: -2, z: -3 });

    // Should reject these values
    myr.setScale('a', -2, -3);
    expect(myr.scale).toEqual({ x: -1, y: -2, z: -3 });
    myr.setScale({}, -2, -3);
    expect(myr.scale).toEqual({ x: -1, y: -2, z: -3 });
    myr.setScale([], -2, -3);
    expect(myr.scale).toEqual({ x: -1, y: -2, z: -3 });
  });

  it('should set the X-scale in Myr', () => {
    myr.reset();
    myr.setXScale(5);
    expect(myr.scale.x).toEqual(5);
    myr.setXScale(-5);
    expect(myr.scale.x).toEqual(-5);

    // Check for stable model with bad values
    myr.setXScale({});
    expect(myr.scale.x).toEqual(-5);
    myr.setXScale('a');
    expect(myr.scale.x).toEqual(-5);
    myr.setXScale(() => { });
    expect(myr.scale.x).toEqual(-5);
    expect(myr.scale).toEqual({ x: -5, y: 1, z: 1 });
  });

  it('should set the Y-scale in Myr', () => {
    myr.reset();
    myr.setYScale(5);
    expect(myr.scale.y).toEqual(5);
    myr.setYScale(-5);
    expect(myr.scale.y).toEqual(-5);

    // Check for stable model with bad values
    myr.setYScale({});
    expect(myr.scale.y).toEqual(-5);
    myr.setYScale('a');
    expect(myr.scale.y).toEqual(-5);
    myr.setYScale(() => { });
    expect(myr.scale.y).toEqual(-5);
    expect(myr.scale).toEqual({ x: 1, y: -5, z: 1 });
  });

  it('should set the Z-scale in Myr', () => {
    myr.reset();
    myr.setZScale(5);
    expect(myr.scale.z).toEqual(5);
    myr.setZScale(-5);
    expect(myr.scale.z).toEqual(-5);

    // Check for stable model with bad values
    myr.setZScale({});
    expect(myr.scale.z).toEqual(-5);
    myr.setZScale('a');
    expect(myr.scale.z).toEqual(-5);
    myr.setZScale(() => { });
    expect(myr.scale.z).toEqual(-5);
    expect(myr.scale).toEqual({ x: 1, y: 1, z: -5 });
  });

  it('should set the rotation in Myr', () => {
    myr.reset();
    myr.setRotation(1);
    expect(myr.rotation).toEqual({ x: 1, y: 0, z: 0 });
    myr.setRotation(1, 2);
    expect(myr.rotation).toEqual({ x: 1, y: 2, z: 0 });
    myr.setRotation(1, 2, 3);
    expect(myr.rotation).toEqual({ x: 1, y: 2, z: 3 });
    myr.setRotation(-1, -2, -3);
    expect(myr.rotation).toEqual({ x: -1, y: -2, z: -3 });

    // Should reject these values
    myr.setRotation('a', -2, -3);
    expect(myr.rotation).toEqual({ x: -1, y: -2, z: -3 });
    myr.setRotation({}, -2, -3);
    expect(myr.rotation).toEqual({ x: -1, y: -2, z: -3 });
    myr.setRotation([], -2, -3);
    expect(myr.rotation).toEqual({ x: -1, y: -2, z: -3 });
  });

  it('should set the Pitch/X-rotation in Myr', () => {
    myr.reset();
    myr.pitchX(5);
    expect(myr.rotation.x).toEqual(5);
    myr.pitchX(-5);
    expect(myr.rotation.x).toEqual(-5);

    // Check for stable model with bad values
    myr.pitchX({});
    expect(myr.rotation.x).toEqual(-5);
    myr.pitchX('a');
    expect(myr.rotation.x).toEqual(-5);
    myr.pitchX(() => { });
    expect(myr.rotation.x).toEqual(-5);
    expect(myr.rotation).toEqual({ x: -5, y: 0, z: 0 });
  });

  it('should set the Yaw/Y-rotation in Myr', () => {
    myr.reset();
    myr.yawY(5);
    expect(myr.rotation.y).toEqual(5);
    myr.yawY(-5);
    expect(myr.rotation.y).toEqual(-5);

    // Check for stable model with bad values
    myr.yawY({});
    expect(myr.rotation.y).toEqual(-5);
    myr.yawY('a');
    expect(myr.rotation.y).toEqual(-5);
    myr.yawY(() => { });
    expect(myr.rotation.y).toEqual(-5);
    expect(myr.rotation).toEqual({ x: 0, y: -5, z: 0 });
  });

  it('should set the Roll/Z-rotation in Myr', () => {
    myr.reset();
    myr.rollZ(5);
    expect(myr.rotation.z).toEqual(5);
    myr.rollZ(-5);
    expect(myr.rotation.z).toEqual(-5);

    // Check for stable model with bad values
    myr.rollZ({});
    expect(myr.rotation.z).toEqual(-5);
    myr.rollZ('a');
    expect(myr.rotation.z).toEqual(-5);
    myr.rollZ(() => { });
    expect(myr.rotation.z).toEqual(-5);
    expect(myr.rotation).toEqual({ x: 0, y: 0, z: -5 });
  });

});