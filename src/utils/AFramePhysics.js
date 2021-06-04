import AFRAME from "aframe";
const THREE = AFRAME.THREE;
import {MaterialType} from "../components/structural/MaterialType.js";

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


//change the type of the material to the MeshBasicMaterial
AFRAME.registerComponent("basicmaterial",{
    schema:{
        default:""
    },
    init: function(){
        const color = this.el.getObject3D("mesh").material.color;
        this.el.getObject3D("mesh").material = new THREE.MeshBasicMaterial({
            color:color,
        });
    }
});

//change the material of a-grid to MeshBasicMaterial
AFRAME.registerComponent("gridmaterial",{
    schema:{
        default:""
    },
    init: function(){
        const texture = new THREE.TextureLoader().load("https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v1.16.3/assets/grid.png");
        texture.repeat = new THREE.Vector2(75,75);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        this.el.getObject3D("mesh").material = new THREE.MeshBasicMaterial({
            map: texture
        });
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

AFRAME.registerComponent("materialtype", {
    schema:{
        type:{
            default:""
        }
    },
    init: function(){
        let obj = this.el.getObject3D("mesh");
        let material;

        switch(this.data.type) {
            case MaterialType.TOON:
                material = new AFRAME.THREE.MeshToonMaterial();
                break;
            case MaterialType.MATTE:
                material = new AFRAME.THREE.MeshLambertMaterial();
                break;
            case MaterialType.BASIC:
                material = new AFRAME.THREE.MeshBasicMaterial();
                break;
            case MaterialType.PHYSICAL:
                material = new AFRAME.THREE.MeshPhysicalMaterial();
                break;
            default:
            case MaterialType.SPECULAR:
                material = new AFRAME.THREE.MeshPhongMaterial();
        }

        /*
        if(this.data.type === "toon") {
            material = new AFRAME.THREE.MeshToonMaterial();
        } else if(this.data.type === "matte") {
            material = new AFRAME.THREE.MeshLambertMaterial();
        } else if(this.data.type === "basic") {
            material = new AFRAME.THREE.MeshBasicMaterial();
        } else if(this.data.type === "physical") {
            material = new AFRAME.THREE.MeshPhysicalMaterial();
        } else {
            material = new AFRAME.THREE.MeshPhongMaterial();
        }
        */
        material.color.set(obj.material.color);
        //material.alphaMap.set(obj.material.alphaMap)

        let mesh = new AFRAME.THREE.Mesh(obj.geometry, material);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);

        this.el.setObject3D("group", group);
    }
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
