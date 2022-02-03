import AFRAME from "aframe";
const THREE = AFRAME.THREE;

/**
 * @summary Added a pushable effect to the MYR entities
 */
AFRAME.registerComponent("force-pushable", {
    schema: {
        force: { 
            type: "number",
            default: 10
        }
    },
    init: function () {
        this.pStart = new THREE.Vector3();
        this.sourceEl = this.el.sceneEl.querySelector("#rig");
        this.el.addEventListener("click", this.forcePush.bind(this));
    },
    forcePush: function () {
        let force,
            el = this.el,
            pStart = this.pStart.copy(this.sourceEl.children[0].getAttribute("position"));
        // Compute direction of force, normalize, then scale.
        force = el.body.position.vsub(pStart);
        force.normalize();
        force.scale(this.nextData.force, force);

        el.body.applyImpulse(force, el.body.position);
    }
});

/**
 * @summary This sets the side where the shadow should be cast on entity
 */
AFRAME.registerComponent("shadowcustomsetting", {
    schema:{
        default:""
    },
    init: function () {
        this.el.addEventListener("loaded", () => {
            let obj = this.el.getObject3D("mesh");
            if(obj) {
                obj.material.shadowSide = THREE.FrontSide;
            }
        });
        this.el.addEventListener("model-loaded", () => {
            let obj = this.el.getObject3D("mesh");
            if(obj) {
                obj.traverse((node) => {
                    if(node.material) {
                        node.material.shadowSide = THREE.FrontSide;
                    }
                });
            }
        });
    },
});


/**
 * @summary  Calculate and sets the rotation of the entity based on 2 points
 *              This is use for the light indicator that has the property of lighttarget (directional and spot light)
 */
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
