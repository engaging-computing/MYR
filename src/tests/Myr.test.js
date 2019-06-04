import Myr from '../myr/Myr';
import MyrTour from '../components/MyrTour';

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
    expect(myr.radius).toEqual("10");
    myr.setRadius('a');
    expect(myr.radius).toEqual("10");
    myr.setRadius({});
    expect(myr.radius).toEqual("10");
  });

  it(`to makes Random Color`, () => {
    let color = myr.getRandomColor();
    expect(color).not.toBeUndefined();
    expect(colorRegEx.test(color)).toBeTruthy();
  });
});

describe('Component Renders', () => {
  it(`Box`, () => {
    let id = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let box = myr.els[id];
    expect(box).toBeDefined();
    expect(box.geometry).toMatch(/box/);
    expect(box.material).toMatch(/color: blue;/);
    expect(box.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Sphere`, () => {
    myr.els = [];
    let id = myr.sphere({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let sphere = myr.els[id];
    expect(sphere).toBeDefined();
    expect(sphere.geometry).toMatch(/sphere/);
    expect(sphere.material).toMatch(/color: blue;/);
    expect(sphere.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Circle`, () => {
    myr.els = [];
    let id = myr.circle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let circle = myr.els[id];
    expect(circle).toBeDefined();
    expect(circle.geometry).toMatch(/circle/);
    expect(circle.material).toMatch(/color: blue;/);
    expect(circle.position).toEqual({ x: 1, y: 1, z: 1 });
  });


  it(`Cone`, () => {
    myr.els = [];
    let id = myr.cone({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let cone = myr.els[id];
    expect(cone).toBeDefined();
    expect(cone.geometry).toMatch(/cone/);
    expect(cone.material).toMatch(/color: blue;/);
    expect(cone.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Cylinder`, () => {
    myr.els = [];
    let id = myr.cylinder({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let cylinder = myr.els[id];
    expect(cylinder).toBeDefined();
    expect(cylinder.geometry).toMatch(/cylinder/);
    expect(cylinder.material).toMatch(/color: blue;/);
    expect(cylinder.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it(`Ring`, () => {
    myr.reset();
    let id = myr.ring();
    let ring = myr.els[id];
    expect(ring).toBeDefined();
    expect(ring.geometry).toMatch(/ring/);
    expect(ring.material).toMatch(/color: red;/);
    expect(ring.material).toMatch(/side: double;/);
    expect(ring.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it(`Plane`, () => {
    myr.reset();
    myr.els = [];
    let id = myr.plane();
    let plane = myr.els[id];
    expect(plane).toBeDefined();
    expect(plane.geometry).toMatch(/plane/);
    expect(plane.material).toMatch(/color: red;/);
    expect(plane.material).toMatch(/side: double;/);
    expect(plane.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('Tetrahedron', () => {
    myr.reset();
    let id = myr.tetrahedron();
    let tetrahedron = myr.els[id];
    expect(tetrahedron).toBeDefined();
    expect(tetrahedron.geometry).toMatch(/tetrahedron/);
    expect(tetrahedron.material).toMatch(/color: red;/);
    expect(tetrahedron.material).toMatch(/side: double;/);
    expect(tetrahedron.position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('Triangle', () => {
    myr.els = [];
    let id = myr.triangle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let triangle = myr.els[id];
    expect(triangle).toBeDefined();
    expect(triangle.geometry).toMatch(/triangle/);
    expect(triangle.material).toMatch(/color: blue;/);
    expect(triangle.position).toEqual({ x: 1, y: 1, z: 1 });
  });


  it('Text', () => {
    myr.els = [];
    myr.setPosition(0, 0, 0);
    let id = myr.text("Hello World!");
    let text = myr.els[id];
    expect(text).toBeDefined();
    expect(text.position).toEqual({ x: 0, y: 0, z: 0 });
    expect(text.value).toEqual("Hello World!");
    expect(text.text).toBeTruthy();
  });

  it('Tube', () => {
    myr.els = [];
    myr.setColor('blue');
    let id = myr.tube({ position: { x: 1, y: 1, z: 1 } });
    let tube = myr.els[id];
    expect(tube).toBeDefined();
    expect(tube.material).toMatch(/color: blue;/);
    expect(tube).toHaveProperty('tube');
  });

  it('Line', () => {
    myr.els = [];
    myr.setColor('blue');
    let id = myr.line('1 0 0, 2 0 0', { position: { x: 1, y: 1, z: 1 } });
    let line = myr.els[id];
    expect(line).toBeDefined();
    expect(line.material).toMatch(/color: blue;/);
    expect(line.path).toEqual('1 0 0, 2 0 0');
    expect(line.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('Torus', () => {
    myr.els = [];
    myr.setColor('blue');
    let id = myr.torus({ position: { x: 1, y: 1, z: 1 } });
    let torus = myr.els[id];
    expect(torus).toBeDefined();
    expect(torus.geometry).toMatch(/torus/);
    expect(torus.material).toMatch(/color: blue;/);
    expect(torus.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('torusknot', () => {
    myr.els = [];
    myr.setColor('blue');
    let id = myr.torusknot({ position: { x: 1, y: 1, z: 1 } });
    let torusknot = myr.els[id];
    expect(torusknot).toBeDefined();
    expect(torusknot.geometry).toMatch(/torus/);
    expect(torusknot.material).toMatch(/color: blue;/);
    expect(torusknot.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('polyhedron', () => {
    myr.els = [];
    let id = myr.polyhedron({
      position: { x: 1, y: 1, z: 1 },
      rotation: { x: 1, y: 1, z: 1 },
      scale: { x: 1, y: 1, z: 1 }
    });
    let polyhedron = myr.els[id];
    expect(polyhedron).toBeDefined();
    expect(polyhedron.position).toEqual({ x: 1, y: 1, z: 1 });
    expect(polyhedron.rotation).toEqual({ x: 1, y: 1, z: 1 });
    expect(polyhedron.scale).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('dodecahedron', () => {
    myr.els = [];
    let id = myr.dodecahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let dodecahedron = myr.els[id];
    expect(dodecahedron).toBeDefined();
    expect(dodecahedron.geometry).toMatch(/dodecahedron/);
    expect(dodecahedron.material).toMatch(/color: blue;/);
    expect(dodecahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('icosahedron', () => {
    myr.els = [];
    let id = myr.icosahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let icosahedron = myr.els[id];
    expect(icosahedron).toBeDefined();
    expect(icosahedron.geometry).toMatch(/icosahedron/);
    expect(icosahedron.material).toMatch(/color: blue;/);
    expect(icosahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('octahedron', () => {
    myr.els = [];
    let id = myr.octahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let octahedron = myr.els[id];
    expect(octahedron).toBeDefined();
    expect(octahedron.geometry).toMatch(/octahedron/);
    expect(octahedron.material).toMatch(/color: blue;/);
    expect(octahedron.position).toEqual({ x: 1, y: 1, z: 1 });
  });
});

describe('Component Animations', () => {
  it(`Should add the animate animation`, () => {
    myr.reset();
    let bId = myr.box();
    myr.animate(bId);
    let el = myr.getEl(bId);
    expect(el.animation).toEqual(`
      property: rotation;
      dir: alternate;
      to: 0 360 0;
      dur: 1000;
      loop: true;
    `);
    myr.animate(bId, 720, false, 2000);
    expect(el.animation).toEqual(`
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
    expect(el.animation__spin).toEqual(`
      property: rotation;
      dir: alternate;
      dur: 1000;
      loop: true;
      easing: linear;
      to: 0 360 0;
    `);
    myr.spin(bId, 720, false, 2000);
    expect(el.animation__spin).toEqual(`
      property: rotation;
      dir: alternate;
      dur: 2000;
      loop: false;
      easing: linear;
      to: 0 720 0;
    `);
  });

  it('should add the yoyo animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.yoyo(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__yoyo');
  });

  it('should add the sideToSide animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.sideToSide(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__sidetoside');
  });

  it('should add the goUp animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goUp(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__goup');
  });

  it('should add the goDown animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goDown(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__godown');
  });

  it('should add the goLeft animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goLeft(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__goleft');
  });

  it('should add the goRight animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goRight(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__goright');
  });

  it('should add the goTowards animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goTowards(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__goleft');
  });

  it('should add the goAway animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.goAway(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__goaway');
  });


  it('should add the grow animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.grow(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__grow');
  });


  it('should add the shrink animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.shrink(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__shrink');
  });

  it('should add the fadeOut animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.fadeOut(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__fadeout');
    expect(el.material).toMatch(/transparent: true;/);
  });

  it('should add the fadeIn animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.fadeIn(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__fadein');
    expect(el.material).toMatch(/transparent: true;/);
  });

  it('should add the shrink animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.shrink(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__shrink');
  });

  it('should add the shrink animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.shrink(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__shrink');
  });

  it('should add the shrink animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.shrink(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__shrink');
  });

  it('should add the shrink animiation', () => {
    myr.reset();
    let id = myr.box();
    myr.shrink(id);
    let el = myr.getEl(id);
    expect(el).toHaveProperty('animation__shrink');
  });


});

describe(`Other Myr functionality`, () => {
  it(`Should add a model`, () => {
    myr.reset();
    myr.assets = [];
    myr.addCModel();
    expect(myr.assets).toContainEqual({ id: "c-obj", src: "/img/c.obj" });
  });

  it(`Should drop`, () => {
    myr.reset();
    let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    myr.drop(el);
    let thisEl = myr.els[el];
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
    expect(myr.els[id]).toBeDefined();
  });

  it('should initialize Myr', () => {
    let obj = [{ name: "test" }];
    let m = new Myr(obj);
    expect(m.els.length).toEqual(1);
    expect(m.baseEls.length).toEqual(1);
  });

  // it('should reset Myr', () => {
  //   myr.reset();
  //   expect(myr.els.length).toEqual(0);
  //   let m = new Myr([{ id: "item" }])
  //   m.reset();
  //   expect(m.els.length).toEqual(1);
  // });

  it('should reset cursor', () => {
    const defaultCursor = {
      color: 'red',
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      rotation: { x: 0, y: 0, z: 0 },
      radius: "1",
      phiLength: 360,
    }
    myr.resetCursor();
    expect(myr.color).toEqual(defaultCursor.color);
    expect(myr.position).toEqual(defaultCursor.position);
    expect(myr.scale).toEqual(defaultCursor.scale);
    expect(myr.rotation).toEqual(defaultCursor.rotation);
    expect(myr.radius).toEqual(defaultCursor.radius);
    expect(myr.phiLength).toEqual(defaultCursor.phiLength);
  })

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

  it('should set phi-length', () => {
    myr.reset();
    myr.setPhiLength(45);
    expect(myr.phiLength).toBe("45");
  });

});