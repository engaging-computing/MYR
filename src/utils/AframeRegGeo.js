import AFRAME from "aframe";
import * as THREE from "three";

AFRAME.registerGeometry("spotLightIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();
        
        let cone = new THREE.CylinderGeometry(.75,.1,1,24,1,true);
        let circle = new THREE.CircleGeometry(.1,24);
        circle.rotateX(Math.PI/2);
        circle.translate(0,-.5,0);
        geometry.merge(circle);
        geometry.merge(cone);
        geometry.rotateX(-Math.PI/2);
    
        this.geometry = geometry;
    },    
});
AFRAME.registerGeometry("pointLightIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let sphere =new THREE.SphereGeometry( .25, 100, 100);
        geometry.merge(sphere);
        
        this.geometry = geometry;
    },    
});
AFRAME.registerGeometry("directionalLightIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        // if(!isNaN(data.target.x)){
        //     console.log("target exist");
        // }
        let cone = new THREE.ConeGeometry(.5);
        // let direction = new THREE.Vector3().subVectors(data.target, data.position);
        // let arrow = new THREE.ArrowHelper(direction.clone().normalize(), data.position);
        //let rotation = new THREE.Euler().setFromQuaternion(arrow.quaternion);
        //console.log(rotation);
        let edgeGeometry = new THREE.CylinderGeometry(.1,.1, 3, 20, 4 );
        //let cylinder = new THREE.CylinderGeometry(.1,.1 ,2 ,20);
        cone.translate(0,1.5,0);
        cone.rotateX(Math.PI);
        geometry.merge(cone);
        geometry.merge(edgeGeometry);

        this.geometry = geometry;
    },
    FindCosAngle: function(pos1, pos2){
        let dot = pos1.x*pos2.x +pos1.y*pos2.y+pos1.z*pos2.z;
        let mag1 = pos1.x*pos1.x + pos1.y*pos1.y + pos1.z * pos1.z;
        let mag2 = pos2.x*pos2.x + pos2.y*pos2.y + pos2.z * pos2.z;
        let dotproduct = dot/Math.sqrt(mag1*mag2);

        return Math.acos(dotproduct)*(180/Math.PI);
    },
   
});
AFRAME.registerGeometry("hemisphereLightIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let topCone = new THREE.ConeGeometry(.5);
        let bottomCone = new THREE.ConeGeometry(.5);
        let cylinder = new THREE.CylinderGeometry(.1,.1 ,2 ,20);
        topCone.translate(0,1.5,0);
        bottomCone.translate(0,1.5,0);
        bottomCone.rotateX(Math.PI);
        geometry.merge(topCone);
        geometry.merge(cylinder);
        geometry.merge(bottomCone);

        this.geometry = geometry;
    },
});
// AFRAME.registerGeometry("indicatorAmbient",{
//     schema:{
//         default:""
//     },
//     init: function(data){
//    },
// });
