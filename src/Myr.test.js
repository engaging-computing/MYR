import Myr from './myr/Myr';

const myr = new Myr();

let re = new RegExp('#([0-9]|[A-F]|[a-f]){6}');

describe(`Updates to Myr's Model`, () => {
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
  });

  it(`to SetCamera`, () => {
    myr.setCamera(1, 2, 3);
    expect(myr.camera).toBeTruthy();
    expect(myr.camera.position).toEqual({ x: 1, y: 2, z: 3 });
  });

  it(`to etCursor`, () => {
    delete myr.camera;
    myr.setCursor(3, 4, 3);
    expect(myr.camera.cursor).toBeTruthy();
    expect(myr.camera.position).toEqual({ x: 3, y: 4, z: 3 });
  });

  it(`to makes Random Color`, () => {
    let color = myr.getRandomColor();
    expect(color).not.toBeUndefined();
    expect(re.test(color)).toBeTruthy();
  });

  // This doesn't seem implemented yet 
  // it(`Enviroment`, () => {
  //   delete myr.environment
  //   myr.environment({})
  // })
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
    myr.text({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let text = myr.els[0];
    expect(text).toBeDefined();
    expect(text.material).toEqual("color: blue;");
    expect(text.position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('polyhedron', () => {
    myr.els = [];
    myr.polyhedron({
      material: "color: blue;",
      position: { x: 1, y: 1, z: 1 },
      rotation: { x: 1, y: 1, z: 1 }
    });
    let polyhedron = myr.els[0];
    expect(polyhedron).toBeDefined();
    expect(polyhedron.geometry.primitive).toEqual("cylinder");
    expect(polyhedron.material).toEqual("color: blue;");
    expect(polyhedron.position).toEqual({ x: 1, y: 1, z: 1 });
    expect(polyhedron.rotation).toEqual({ x: 1, y: 1, z: 1 });
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

describe(`Other Myr functionality`, () => {
  it(`Should add a model`, () => {
    myr.assets = [];
    myr.addCModel();
    expect(myr.assets).toContainEqual({ id: "c-obj", src: "/img/c.obj" });
  });

  it(`Should animate`, () => {
    myr.setRotation(1,1,1);
    myr.setScale(2,2,2);
    let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    let animation = myr.animate(el);
    expect(animation.geometry).toMatchObject({primitive: "animation"});
    expect(animation.rotation).toEqual({ x: 1, y: 1, z: 1 });
    expect(animation.scale).toEqual({ x: 2, y: 2, z: 2 });
  });

  it(`Should drop` , () => {
    let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    myr.drop(el);
    expect(el).toHaveProperty('dynamic-body');
  });

  it(`Should push`, () => {
    let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
    el.id = "";
    expect(myr.push(el)).toBeUndefined();
  });

  it(`Should return a light`, () => {
    let light = myr.light();
    expect(light).toBeTruthy();
    expect(light.color).toMatch(re);
    // expect(light).
  });

  it('should initialize Myr', () => {
    let obj = [{name: "test"}];
    myr.init(obj);
    expect(myr.els[0].name).toEqual("test");
  });

  it('should reset Myr', () => {
    let obj = [{name: "test"}];
    myr.init();
    myr.sphere();
    myr.sphere();
    myr.reset();
    expect(myr.els.length).toEqual(0);
    myr.init(obj);
    expect(myr.els.length).toEqual(1);
  });
  
});