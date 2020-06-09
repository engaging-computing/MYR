import Myr from "../myr/Myr";

const myr = new Myr();

let colorRegEx = new RegExp("#([0-9]|[A-F]|[a-f]){6}");

const defaultCursor = {
    color: "red",
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    scale: {
        x: 1,
        y: 1,
        z: 1
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    },
    radius: "1",
    phiLength: 360,
    loop: true,
    duration: 1000,
    magnitude: {
        spin: 360,
        fadeOut: 0,
        general: 1
    }
};

describe("Updates to Myr's Model", () => {

    it("should set the color", () => {
        myr.setColor("red");
        expect(myr.cursor.color).toEqual("red");
    });

    it("to SetPosition", () => {
        myr.setPosition(1, 2, 3);
        expect(myr.cursor.position).toEqual({ x: 1, y: 2, z: 3 });
    });

    it("to SetScale", () => {
        myr.setScale(1, 2, 3);
        expect(myr.cursor.scale).toEqual({ x: 1, y: 2, z: 3 });
    });

    it("to SetRotation", () => {
        myr.setRotation(1, 2, 3);
        expect(myr.cursor.rotation).toEqual({ x: 1, y: 2, z: 3 });
    });

    it("to SetRadius", () => {
        myr.setRadius(10);
        expect(myr.cursor.radius).toEqual("10");
        myr.setRadius("a");
        expect(myr.cursor.radius).toEqual("10");
        myr.setRadius({});
        expect(myr.cursor.radius).toEqual("10");
    });

    it("to makes Random Color", () => {
        let color = myr.getRandomColor();
        expect(color).not.toBeUndefined();
        expect(colorRegEx.test(color)).toBeTruthy();
    });

    it("pick Random Color out of a list of colors", () => {
        let colors = ["blue", "green", "red", "hotpink", "FF00FF", "rgb(100,33,93)"];
        let color = myr.getRandomColor(colors);
        expect(color).not.toBeUndefined();
        expect(colors.includes(color)).toBeTruthy();
    });
});

describe("Component Renders", () => {
    it("Box", () => {
        let id = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let box = myr.els[id];
        expect(box).toBeDefined();
        expect(box.geometry).toMatch(/box/);
        expect(box.material).toMatch(/color: blue;/);
        expect(box.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("Sphere", () => {
        myr.els = [];
        let id = myr.sphere({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let sphere = myr.els[id];
        expect(sphere).toBeDefined();
        expect(sphere.geometry).toMatch(/sphere/);
        expect(sphere.material).toMatch(/color: blue;/);
        expect(sphere.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("Circle", () => {
        myr.els = [];
        let id = myr.circle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let circle = myr.els[id];
        expect(circle).toBeDefined();
        expect(circle.geometry).toMatch(/circle/);
        expect(circle.material).toMatch(/color: blue;/);
        expect(circle.position).toEqual({ x: 1, y: 1, z: 1 });
    });


    it("Cone", () => {
        myr.els = [];
        let id = myr.cone({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let cone = myr.els[id];
        expect(cone).toBeDefined();
        expect(cone.geometry).toMatch(/cone/);
        expect(cone.material).toMatch(/color: blue;/);
        expect(cone.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("Cylinder", () => {
        myr.els = [];
        let id = myr.cylinder({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let cylinder = myr.els[id];
        expect(cylinder).toBeDefined();
        expect(cylinder.geometry).toMatch(/cylinder/);
        expect(cylinder.material).toMatch(/color: blue;/);
        expect(cylinder.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("Ring", () => {
        myr.reset();
        let id = myr.ring();
        let ring = myr.els[id];
        expect(ring).toBeDefined();
        expect(ring.geometry).toMatch(/ring/);
        expect(ring.material).toMatch(/color: red;/);
        expect(ring.material).toMatch(/side: double;/);
        expect(ring.position).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("Plane", () => {
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

    it("Tetrahedron", () => {
        myr.reset();
        let id = myr.tetrahedron();
        let tetrahedron = myr.els[id];
        expect(tetrahedron).toBeDefined();
        expect(tetrahedron.geometry).toMatch(/tetrahedron/);
        expect(tetrahedron.material).toMatch(/color: red;/);
        expect(tetrahedron.material).toMatch(/side: double;/);
        expect(tetrahedron.position).toEqual({ x: 0, y: 0, z: 0 });
    });

    it("Triangle", () => {
        myr.els = [];
        let id = myr.triangle({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let triangle = myr.els[id];
        expect(triangle).toBeDefined();
        expect(triangle.geometry).toMatch(/triangle/);
        expect(triangle.material).toMatch(/color: blue;/);
        expect(triangle.position).toEqual({ x: 1, y: 1, z: 1 });
    });


    it("Text", () => {
        myr.els = [];
        myr.setPosition(0, 0, 0);
        let id = myr.text("Hello World!");
        let text = myr.els[id];
        expect(text).toBeDefined();
        expect(text.position).toEqual({ x: 0, y: 0, z: 0 });
        expect(text.value).toEqual("Hello World!");
        expect(text.text).toBeTruthy();

        //passing no argument should give default value
        myr.els = [];
        myr.setPosition(0, 0, 0);
        id = myr.text();
        text = myr.els[id];
        expect(text).toBeDefined();
        expect(text.position).toEqual({ x: 0, y: 0, z: 0 });
        expect(text.value).toEqual("Default");
        expect(text.text).toBeTruthy();


        //should reject the value and give default value
        myr.els = [];
        myr.setPosition(0, 0, 0);
        id = myr.text(1);
        text = myr.els[id];
        expect(text).toBeDefined();
        expect(text.position).toEqual({ x: 0, y: 0, z: 0 });
        expect(text.value).toEqual("Default");
        expect(text.text).toBeTruthy();
    });

    it("Tube", () => {
        myr.els = [];
        myr.setColor("blue");
        let id = myr.tube({ position: { x: 1, y: 1, z: 1 } });
        let tube = myr.els[id];
        expect(tube).toBeDefined();
        expect(tube.material).toMatch(/color: blue;/);
        expect(tube).toHaveProperty("tube");
    });

    it("Line", () => {
        myr.els = [];
        myr.setColor("blue");
        let id = myr.line("1 0 0, 2 0 0", { position: { x: 1, y: 1, z: 1 } });
        let line = myr.els[id];
        expect(line).toBeDefined();
        expect(line.material).toMatch(/color: blue;/);
        expect(line.path).toEqual("1 0 0, 2 0 0");
        expect(line.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("Torus", () => {
        myr.els = [];
        myr.setColor("blue");
        let id = myr.torus({ position: { x: 1, y: 1, z: 1 } });
        let torus = myr.els[id];
        expect(torus).toBeDefined();
        expect(torus.geometry).toMatch(/torus/);
        expect(torus.material).toMatch(/color: blue;/);
        expect(torus.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("torusknot", () => {
        myr.els = [];
        myr.setColor("blue");
        let id = myr.torusknot({ position: { x: 1, y: 1, z: 1 } });
        let torusknot = myr.els[id];
        expect(torusknot).toBeDefined();
        expect(torusknot.geometry).toMatch(/torus/);
        expect(torusknot.material).toMatch(/color: blue;/);
        expect(torusknot.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("polyhedron", () => {
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

    it("dodecahedron", () => {
        myr.els = [];
        let id = myr.dodecahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let dodecahedron = myr.els[id];
        expect(dodecahedron).toBeDefined();
        expect(dodecahedron.geometry).toMatch(/dodecahedron/);
        expect(dodecahedron.material).toMatch(/color: blue;/);
        expect(dodecahedron.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("icosahedron", () => {
        myr.els = [];
        let id = myr.icosahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let icosahedron = myr.els[id];
        expect(icosahedron).toBeDefined();
        expect(icosahedron.geometry).toMatch(/icosahedron/);
        expect(icosahedron.material).toMatch(/color: blue;/);
        expect(icosahedron.position).toEqual({ x: 1, y: 1, z: 1 });
    });

    it("octahedron", () => {
        myr.els = [];
        let id = myr.octahedron({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        let octahedron = myr.els[id];
        expect(octahedron).toBeDefined();
        expect(octahedron.geometry).toMatch(/octahedron/);
        expect(octahedron.material).toMatch(/color: blue;/);
        expect(octahedron.position).toEqual({ x: 1, y: 1, z: 1 });
    });
});

describe("Component Animations", () => {
    it("Should add the animate animation", () => {
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

    it("Should add the spin animation", () => {
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

    it("should add the yoyo animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.yoyo(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__yoyo");
    });

    it("should add the sideToSide animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.sideToSide(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__sidetoside");
    });

    it("should add the goUp animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goUp(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__goup");
    });

    it("should add the goDown animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goDown(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__godown");
    });

    it("should add the goLeft animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goLeft(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__goleft");
    });

    it("should add the goRight animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goRight(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__goright");
    });

    it("should add the goTowards animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goTowards(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__goleft");
    });

    it("should add the goAway animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.goAway(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__goaway");
    });


    it("should add the grow animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.grow(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__grow");
    });


    it("should add the shrink animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.shrink(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__shrink");
    });

    it("should add the fadeOut animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.fadeOut(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__fadeout");
        expect(el.material).toMatch(/transparent: true;/);
    });

    it("should add the fadeIn animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.fadeIn(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__fadein");
        expect(el.material).toMatch(/transparent: true;/);
    });

    it("should add the shrink animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.shrink(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__shrink");
    });

    it("should add the shrink animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.shrink(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__shrink");
    });

    it("should add the shrink animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.shrink(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__shrink");
    });

    it("should add the shrink animiation", () => {
        myr.reset();
        let id = myr.box();
        myr.shrink(id);
        let el = myr.getEl(id);
        expect(el).toHaveProperty("animation__shrink");
    });


});

describe("Other Myr functionality", () => {
    it("Should add a model", () => {
        myr.reset();
        myr.assets = [];
        myr.addCModel();
        expect(myr.assets).toContainEqual({ id: "c-obj", src: "/img/c.obj" });
    });

    it("Should drop", () => {
        myr.reset();
        let el = myr.box({ material: "color: blue;", position: { x: 1, y: 1, z: 1 } });
        myr.drop(el);
        let thisEl = myr.els[el];
        expect(thisEl).toHaveProperty("dynamic-body");
    });

    it("Should return a light", () => {
        myr.reset();
        let light = myr.light();
        expect(light).toBeTruthy();
        expect(light.color).toMatch(colorRegEx);

    });

    it("should get the right element", () => {
        myr.reset();
        let id = myr.box();
        expect(myr.getEl(id)).toBeDefined();
        expect(myr.getEl(id).geometry).toEqual("primitive: box;");
    });

    it("should get the right index", () => {
        myr.reset();
        let id = myr.box();
        expect(myr.els[id]).toBeDefined();
    });

    it("should initialize Myr", () => {
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

    it("should reset cursor", () => {
        myr.resetCursor();
        expect(myr.cursor).toEqual(defaultCursor);
    });

    it("should set the position in Myr", () => {
        myr.reset();
        myr.setPosition(1);
        expect(myr.cursor.position).toEqual({ x: 1, y: 1, z: 0 });
        myr.setPosition(1, 2);
        expect(myr.cursor.position).toEqual({ x: 1, y: 2, z: 0 });
        myr.setPosition(1, 2, 3);
        expect(myr.cursor.position).toEqual({ x: 1, y: 2, z: 3 });
        myr.setPosition(-1, -2, -3);
        expect(myr.cursor.position).toEqual({ x: -1, y: -2, z: -3 });

        // Should reject these values
        myr.setPosition("a", -2, -3);
        expect(myr.cursor.position).toEqual({ x: -1, y: -2, z: -3 });
        myr.setPosition({}, -2, -3);
        expect(myr.cursor.position).toEqual({ x: -1, y: -2, z: -3 });
        myr.setPosition([], -2, -3);
        expect(myr.cursor.position).toEqual({ x: -1, y: -2, z: -3 });
    });

    it("should set the X-position in Myr", () => {
        myr.reset();
        myr.setXPos(5);
        expect(myr.cursor.position.x).toEqual(5);
        myr.setXPos(-5);
        expect(myr.cursor.position.x).toEqual(-5);

        // Check for stable model with bad values
        myr.setXPos({});
        expect(myr.cursor.position.x).toEqual(-5);
        myr.setXPos("a");
        expect(myr.cursor.position.x).toEqual(-5);
        myr.setXPos(() => { });
        expect(myr.cursor.position.x).toEqual(-5);
        expect(myr.cursor.position).toEqual({ x: -5, y: 0, z: 0 });
    });

    it("should set the Y-position in Myr", () => {
        myr.reset();
        myr.setYPos(5);
        expect(myr.cursor.position.y).toEqual(5);
        myr.setYPos(-5);
        expect(myr.cursor.position.y).toEqual(-5);

        // Check for stable model with bad values
        myr.setYPos({});
        expect(myr.cursor.position.y).toEqual(-5);
        myr.setYPos("a");
        expect(myr.cursor.position.y).toEqual(-5);
        myr.setYPos(() => { });
        expect(myr.cursor.position.y).toEqual(-5);
        expect(myr.cursor.position).toEqual({ x: 0, y: -5, z: 0 });

    });

    it("should set the Z-position in Myr", () => {
        myr.reset();
        myr.setZPos(5);
        expect(myr.cursor.position.z).toEqual(5);
        myr.setZPos(-5);
        expect(myr.cursor.position.z).toEqual(-5);

        // Check for stable model with bad values
        myr.setZPos({});
        expect(myr.cursor.position.z).toEqual(-5);
        myr.setZPos("a");
        expect(myr.cursor.position.z).toEqual(-5);
        myr.setZPos(() => { });
        expect(myr.cursor.position.z).toEqual(-5);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: -5 });
    });

    it("shoud increase the position relative to cursor position in MYR", () => {
        myr.reset();
        myr.increasePosition(1);
        expect(myr.cursor.position).toEqual({ x: 1, y: 0, z: 0 });
        myr.increasePosition(1, 1);
        expect(myr.cursor.position).toEqual({ x: 2, y: 1, z: 0 });
        myr.increasePosition(1, 1, 1);
        expect(myr.cursor.position).toEqual({ x: 3, y: 2, z: 1 });
        myr.increasePosition(-3, -2, -1);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });

        // Check for stable model with bad values
        myr.increasePosition("a", 2, 3);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });
        myr.increasePosition({}, 2, 3);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });
        myr.increasePosition([], 2, 3);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });

    });

    it("should increase the X-position relative to the cursor position", () => {
        myr.reset();
        myr.increaseXPos(5);
        expect(myr.cursor.position.x).toEqual(5);
        myr.increaseXPos();
        expect(myr.cursor.position.x).toEqual(6);
        myr.increaseXPos(-6);
        expect(myr.cursor.position.x).toEqual(0);

        //check for stable model with bad values
        myr.increaseXPos("a");
        expect(myr.cursor.position.x).toEqual(0);
        myr.increaseXPos({});
        expect(myr.cursor.position.x).toEqual(0);
        myr.increaseXPos([]);
        expect(myr.cursor.position.x).toEqual(0);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });

    });

    it("should increase the Y-position relative to the cursor position", () => {
        myr.reset();
        myr.increaseYPos(5);
        expect(myr.cursor.position.y).toEqual(5);
        myr.increaseYPos();
        expect(myr.cursor.position.y).toEqual(6);
        myr.increaseYPos(-6);
        expect(myr.cursor.position.y).toEqual(0);

        //check for stable model with bad values
        myr.increaseYPos("a");
        expect(myr.cursor.position.y).toEqual(0);
        myr.increaseYPos({});
        expect(myr.cursor.position.y).toEqual(0);
        myr.increaseYPos([]);
        expect(myr.cursor.position.y).toEqual(0);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });

    });

    it("should increase the Z-position relative to the cursor position", () => {
        myr.reset();
        myr.increaseZPos(5);
        expect(myr.cursor.position.z).toEqual(5);
        myr.increaseZPos();
        expect(myr.cursor.position.z).toEqual(6);
        myr.increaseZPos(-6);
        expect(myr.cursor.position.z).toEqual(0);

        //check for stable model with bad values
        myr.increaseZPos("a");
        expect(myr.cursor.position.z).toEqual(0);
        myr.increaseZPos({});
        expect(myr.cursor.position.z).toEqual(0);
        myr.increaseZPos([]);
        expect(myr.cursor.position.z).toEqual(0);
        expect(myr.cursor.position).toEqual({ x: 0, y: 0, z: 0 });

    });

    it("should set the scale in Myr", () => {
        myr.reset();
        myr.setScale(4);
        expect(myr.cursor.scale).toEqual({ x: 4, y: 1, z: 1 });
        myr.setScale(4, 5);
        expect(myr.cursor.scale).toEqual({ x: 4, y: 5, z: 1 });
        myr.setScale(1, 2, 3);
        expect(myr.cursor.scale).toEqual({ x: 1, y: 2, z: 3 });
        myr.setScale(-1, -2, -3);
        expect(myr.cursor.scale).toEqual({ x: -1, y: -2, z: -3 });

        // Should reject these values
        myr.setScale("a", -2, -3);
        expect(myr.cursor.scale).toEqual({ x: -1, y: -2, z: -3 });
        myr.setScale({}, -2, -3);
        expect(myr.cursor.scale).toEqual({ x: -1, y: -2, z: -3 });
        myr.setScale([], -2, -3);
        expect(myr.cursor.scale).toEqual({ x: -1, y: -2, z: -3 });
    });

    it("should set the X-scale in Myr", () => {
        myr.reset();
        myr.setXScale(5);
        expect(myr.cursor.scale.x).toEqual(5);
        myr.setXScale(-5);
        expect(myr.cursor.scale.x).toEqual(-5);

        // Check for stable model with bad values
        myr.setXScale({});
        expect(myr.cursor.scale.x).toEqual(-5);
        myr.setXScale("a");
        expect(myr.cursor.scale.x).toEqual(-5);
        myr.setXScale(() => { });
        expect(myr.cursor.scale.x).toEqual(-5);
        expect(myr.cursor.scale).toEqual({ x: -5, y: 1, z: 1 });
    });

    it("should set the Y-scale in Myr", () => {
        myr.reset();
        myr.setYScale(5);
        expect(myr.cursor.scale.y).toEqual(5);
        myr.setYScale(-5);
        expect(myr.cursor.scale.y).toEqual(-5);

        // Check for stable model with bad values
        myr.setYScale({});
        expect(myr.cursor.scale.y).toEqual(-5);
        myr.setYScale("a");
        expect(myr.cursor.scale.y).toEqual(-5);
        myr.setYScale(() => { });
        expect(myr.cursor.scale.y).toEqual(-5);
        expect(myr.cursor.scale).toEqual({ x: 1, y: -5, z: 1 });
    });

    it("should set the Z-scale in Myr", () => {
        myr.reset();
        myr.setZScale(5);
        expect(myr.cursor.scale.z).toEqual(5);
        myr.setZScale(-5);
        expect(myr.cursor.scale.z).toEqual(-5);

        // Check for stable model with bad values
        myr.setZScale({});
        expect(myr.cursor.scale.z).toEqual(-5);
        myr.setZScale("a");
        expect(myr.cursor.scale.z).toEqual(-5);
        myr.setZScale(() => { });
        expect(myr.cursor.scale.z).toEqual(-5);
        expect(myr.cursor.scale).toEqual({ x: 1, y: 1, z: -5 });
    });

    it("should set the rotation in Myr", () => {
        myr.reset();
        myr.setRotation(1);
        expect(myr.cursor.rotation).toEqual({ x: 1, y: 0, z: 0 });
        myr.setRotation(1, 2);
        expect(myr.cursor.rotation).toEqual({ x: 1, y: 2, z: 0 });
        myr.setRotation(1, 2, 3);
        expect(myr.cursor.rotation).toEqual({ x: 1, y: 2, z: 3 });
        myr.setRotation(-1, -2, -3);
        expect(myr.cursor.rotation).toEqual({ x: -1, y: -2, z: -3 });

        // Should reject these values
        myr.setRotation("a", -2, -3);
        expect(myr.cursor.rotation).toEqual({ x: -1, y: -2, z: -3 });
        myr.setRotation({}, -2, -3);
        expect(myr.cursor.rotation).toEqual({ x: -1, y: -2, z: -3 });
        myr.setRotation([], -2, -3);
        expect(myr.cursor.rotation).toEqual({ x: -1, y: -2, z: -3 });
    });

    it("should set the Pitch/X-rotation in Myr", () => {
        myr.reset();
        myr.pitchX(5);
        expect(myr.cursor.rotation.x).toEqual(5);
        myr.pitchX(-5);
        expect(myr.cursor.rotation.x).toEqual(-5);

        // Check for stable model with bad values
        myr.pitchX({});
        expect(myr.cursor.rotation.x).toEqual(-5);
        myr.pitchX("a");
        expect(myr.cursor.rotation.x).toEqual(-5);
        myr.pitchX(() => { });
        expect(myr.cursor.rotation.x).toEqual(-5);
        expect(myr.cursor.rotation).toEqual({ x: -5, y: 0, z: 0 });
    });

    it("should set the Yaw/Y-rotation in Myr", () => {
        myr.reset();
        myr.yawY(5);
        expect(myr.cursor.rotation.y).toEqual(5);
        myr.yawY(-5);
        expect(myr.cursor.rotation.y).toEqual(-5);

        // Check for stable model with bad values
        myr.yawY({});
        expect(myr.cursor.rotation.y).toEqual(-5);
        myr.yawY("a");
        expect(myr.cursor.rotation.y).toEqual(-5);
        myr.yawY(() => { });
        expect(myr.cursor.rotation.y).toEqual(-5);
        expect(myr.cursor.rotation).toEqual({ x: 0, y: -5, z: 0 });
    });

    it("should set the Roll/Z-rotation in Myr", () => {
        myr.reset();
        myr.rollZ(5);
        expect(myr.cursor.rotation.z).toEqual(5);
        myr.rollZ(-5);
        expect(myr.cursor.rotation.z).toEqual(-5);

        // Check for stable model with bad values
        myr.rollZ({});
        expect(myr.cursor.rotation.z).toEqual(-5);
        myr.rollZ("a");
        expect(myr.cursor.rotation.z).toEqual(-5);
        myr.rollZ(() => { });
        expect(myr.cursor.rotation.z).toEqual(-5);
        expect(myr.cursor.rotation).toEqual({ x: 0, y: 0, z: -5 });
    });

    it("should set phi-length", () => {
        myr.reset();
        myr.setPhiLength(45);
        expect(myr.cursor.phiLength).toBe("45");
    });

    it("should set custom cursor attributes", () => {
        myr.reset();
        myr.setCursorAttribute("size", "large");
        let response = myr.getCursorAttribute("size");
        expect(response).toBe("large");
        response = myr.getCursorAttribute("");
        expect(response).toBe(undefined);
        myr.setCursorAttribute(7, 8);
        response = myr.getCursorAttribute(7);
        expect(response).toBe(undefined);
        myr.setCursorAttribute("position", { x: 1, y: 2, z: 3 });
        expect(myr.cursor).toEqual({ ...defaultCursor, ...{ "position": { x: 1, y: 2, z: 3 }, "size": "large" } });
        myr.setCursorAttribute("test", 8);
        response = myr.getCursorAttribute("test");
        expect(response).toBe(8);
        myr.setCursorAttribute("test", { "test1": 1, "test2": 3 });
        response = myr.getCursorAttribute("test");
        expect(response).toEqual({ "test1": 1, "test2": 3 });
    });

    it("Should accept hex colors entered for setColor function", () => {
        myr.setColor("#ff0000");
        expect(myr.cursor.color).toEqual("#ff0000");
        myr.setColor("#FF0000");
        expect(myr.cursor.color).toEqual("#ff0000");
        myr.setColor("#0000fF");
        expect(myr.cursor.color).toEqual("#0000ff");
        myr.setColor("#008000");
        expect(myr.cursor.color).toEqual("#008000");
    });

    // This is will test different variations of color
    it("Should accept any caps or lowercase letters", () => {
        myr.setColor("Blue");
        expect(myr.cursor.color).toEqual("blue");
        myr.setColor("pURPle");
        expect(myr.cursor.color).toEqual("purple");
        myr.setColor("OrAnGe");
        expect(myr.cursor.color).toEqual("orange");
        myr.setColor("Red");
        expect(myr.cursor.color).toEqual("red");
        myr.setColor("rED");
        expect(myr.cursor.color).toEqual("red");
        myr.setColor("ReD");
        expect(myr.cursor.color).toEqual("red");
    });

});
