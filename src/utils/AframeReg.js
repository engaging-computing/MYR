import AFRAME from "aframe";
import * as THREE from "three";

AFRAME.registerComponent("force-pushable", {
    schema: {
        force: { default: 10 }
    },
    init: function () {
        this.pStart = new THREE.Vector3();
        this.sourceEl = this.el.sceneEl.querySelector("#rig");
        this.el.addEventListener("click", this.forcePush.bind(this));
    },
    forcePush: function () {
        let force,
            el = this.el,
            pStart = this.pStart.copy(this.sourceEl.getAttribute("position"));

        // Compute direction of force, normalize, then scale.
        force = el.body.position.vsub(pStart);
        force.normalize();
        force.scale(this.data.force, force);

        el.body.applyImpulse(force, el.body.position);
    }
});

//this set aframe entity to different layer (0-31)
//all the regular MYR entities will goes to layer 0
//And other, such as grid, light indicator will goes to layer 1 so it won't take effect of user created light
AFRAME.registerComponent("layer",{
    schema:{
        type:{
            type:"string",
            default: "mesh"
        },
        layer:{
            type:"number",
            default: 0
        },
    },
    init: function(){
        this.el.getObject3D(this.data.type).layers.set(this.data.layer);
    }
});


//this display different layer in scene at same time
AFRAME.registerComponent("scenelayer",{
    schema:{
        default:""
    },
    init: function(){
        this.renderer = this.el.renderer;
        this.camera = this.el.camera;
        this.scene = this.el.sceneEl.object3D;
    },
    tick: function(){
        this.renderer.autoClear = true;
        this.camera.layers.set(0);
        this.renderer.render(this.scene, this.camera);

        this.renderer.autoClear = false;
        this.camera.layers.set(1);
        this.renderer.render(this.scene, this.camera);
    }
});


AFRAME.registerComponent("shadowcustomsetting", {
    schema:{
        default:""
    },
    init: function () {
        this.el.addEventListener("loaded", () => {
            let obj = this.el.getObject3D("mesh");
            obj.material.shadowSide = THREE.FrontSide;
        });
    },
}); 


AFRAME.registerComponent("outline",{
    schema:{
        default:""
    },
    init: function(){
        let mesh = this.el.getObject3D("mesh");
        let invertColor = ~mesh.material.color.getHex();
        
        mesh.material.color.set(invertColor);
        mesh.material.side = THREE.BackSide;
        mesh.scale.multiplyScalar(1.5);
    }
});
