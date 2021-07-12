import AFRAME from "aframe";
import {MaterialType} from "../components/structural/MaterialType.js";

AFRAME.registerComponent("materialinfo", {
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

        material.roughness = this.data.roughness;
        material.metalness = this.data.metalness;
        material.color = obj.material.color;
        material.side = obj.material.side;
        material.repeat = obj.material.repeat;
        material.opacity = obj.material.opacity;

        let mesh = new AFRAME.THREE.Mesh(obj.geometry, material);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);

        this.el.setObject3D("group", group);
    }
});