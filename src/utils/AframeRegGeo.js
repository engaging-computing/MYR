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

        let arrowHead = new THREE.ConeGeometry(.5);
        let arrowPole = new THREE.CylinderGeometry(.1,.1, 2.5, 20, 4 );
    
        arrowHead.translate(0,1.8,0);
        arrowHead.rotateX(Math.PI);

        geometry.merge(arrowHead);
        geometry.merge(arrowPole);

        this.geometry = geometry;
    }   
});

AFRAME.registerGeometry("hemisphereLightIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let arrowHead = new THREE.ConeGeometry(.5);
        let arrowPole = new THREE.CylinderGeometry(.1,.1 ,1 ,20);
        arrowHead.translate(0,1.5,0);
        arrowPole.translate(0,0.5,0);

        geometry.merge(arrowHead);
        geometry.merge(arrowPole);

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



//Geoemtry for light's outline

AFRAME.registerGeometry("spotLightOutlineIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();
        
        let cone = new THREE.CylinderGeometry(1,.2,1.5,24,1,true);
        let circle = new THREE.CircleGeometry(.2,24);
        circle.rotateX(Math.PI/2);
        circle.translate(0,-.5,0);
        geometry.merge(circle);
        geometry.merge(cone);
        geometry.rotateX(-Math.PI/2);
    
        this.geometry = geometry;
    },    
});
AFRAME.registerGeometry("pointLightOutlineIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let sphere =new THREE.SphereGeometry( .35, 100, 100);
        geometry.merge(sphere);
        
        this.geometry = geometry;
    },    
});

AFRAME.registerGeometry("directionalLightOutlineIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let arrowHead = new THREE.ConeGeometry(.7,1.3);
        let arrowPole = new THREE.CylinderGeometry(.2,.2, 2.8, 20, 4 );
    
        arrowHead.translate(0,1.8,0);
        arrowHead.rotateX(Math.PI);

        geometry.merge(arrowHead);
        geometry.merge(arrowPole);

        this.geometry = geometry;
    }   
});

AFRAME.registerGeometry("hemisphereLightOutlineIndicator",{
    schema:{
        default:""
    },
    init: function(){
        let geometry = new THREE.Geometry();

        let arrowHead = new THREE.ConeGeometry(.7,1.3);
        let arrowPole = new THREE.CylinderGeometry(.2,.2 ,1.2 ,20,4);
        arrowHead.translate(0,1.5,0);
        arrowPole.translate(0,0.6,0);
        geometry.merge(arrowHead);
        geometry.merge(arrowPole);
        this.geometry = geometry;
    },
});
