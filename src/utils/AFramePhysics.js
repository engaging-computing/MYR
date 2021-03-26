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

//This set aframe entity to different layer (range from 0-31)
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
        let obj = this.el.getObject3D(this.data.type);
        if(this.data.type === "group"){
            obj.children.forEach((child)=>{
                child.layers.set(this.data.layer);
            });
        } else {
            obj.layers.set(this.data.layer);
        }
    }
});   

//Attached to the a-scene. Display aframe entities in different layer in scene every frame
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
        this.camera.layers.set(1);
        this.renderer.render(this.scene, this.camera);

        this.renderer.autoClear = false;
        this.camera.layers.set(0);
        this.renderer.render(this.scene, this.camera);
    }
});

//This sets the side where the shadow should be rendered
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

//This change necessary properties to entity to create a outline to light indicator
AFRAME.registerComponent("outline",{
    schema:{
        default:""
    },
    init: function(){
        let mesh = this.el.getObject3D("mesh");
        let invertColor = ~mesh.material.color.getHex();
        
        mesh.material.color.set(invertColor);
        mesh.material.side = THREE.BackSide;
    }
});

//This calculate and sets the rotation of the entity based on 2 points
AFRAME.registerComponent("indicatorrotation",{
    schema:{
        position:{
            type: "vec3",
            default:{x:0,y:0,z:0}
        },
        target:{
            type:"vec3",
            default:{x:0,y:0,z:0}
        },
    },
    init: function(){
        let group =  this.el.getObject3D("group");
        group.rotation.copy(this.FindRotationOf2Pts(this.data.position,this.data.target));
    },
    FindRotationOf2Pts: function(vec,vec2){
        let vector = new THREE.Vector3(vec.x,vec.y,vec.z);
        let origin = new THREE.Vector3(vec2.x,vec2.y,vec2.z);
        if(vector === origin){return null;}
        let direction = new THREE.Vector3().subVectors(vector,origin);
        let arrow = new THREE.ArrowHelper( direction.normalize(), origin,1 );
        
        return arrow.rotation;
    },
});
