import AFRAME from "aframe";
const THREE = AFRAME.THREE;


/**
 * @summary Define spotlight indicator geometry
 *              Shape: cone
 */
AFRAME.registerComponent("spotlightindicator",{
    schema:{
        color:{
            default:"red"
        },
        target:{
            type: "boolean",
            default: false
        }
    },
    init: function(){
        const data = this.data;

        /*      define geometry     */
        let cone = new THREE.CylinderGeometry(.1,.75,1,24,1,true);
        let circle = new THREE.CircleGeometry(.1,24);
        
        if(data.target){
            circle.rotateX(Math.PI/2);
            circle.translate(0,0.5,0);
        }else{
            cone.rotateX(Math.PI/2);
            circle.translate(0,0,0.5);
        }

        let geometry = new THREE.Geometry(); 
        geometry.merge(circle);
        geometry.merge(cone);
    
        /*      define outline geometry */
        let outCone = new THREE.CylinderGeometry(.2,1,1.5,24,1,true);
        let outCircle = new THREE.CircleGeometry(.2,24);
        
        if(data.target) {
            outCircle.rotateX(-Math.PI/2);
            outCircle.translate(0,0.75,0);
        }else{
            outCone.rotateX(Math.PI/2);
            outCircle.translate(0,0,.75);
        }

        let outGeometry = new THREE.Geometry();
        outGeometry.merge(outCircle);
        outGeometry.merge(outCone);

        /*      define material     */
        const material = new THREE.MeshBasicMaterial({color: data.color, side: THREE.DoubleSide});
        const outMaterial = CreateOutlineMaterial(material);
    
        /*      group meshes together   */
        let mesh = new AFRAME.THREE.Mesh(geometry, material);
        let outlineMesh = new AFRAME.THREE.Mesh(outGeometry,outMaterial);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);
        group.add(outlineMesh);

        let el = this.el;
        el.setObject3D("group", group);
    }
});

/**
 * @summary Define pointlight indicator geometry
 *              Shape: sphere
 */
AFRAME.registerComponent("pointlightindicator", {
    schema:{
        color:{
            default:"red"
        }
    },
    init: function(){
        const data = this.data;

        /*      define geometry     */
        let geometry = new THREE.SphereGeometry( .25, 100, 100);

        /*      define outside geometry     */
        let outGeometry =new THREE.SphereGeometry( .35, 100, 100);

        /*      define material     */
        const material = new THREE.MeshBasicMaterial({color:data.color});
        const outMaterial = CreateOutlineMaterial(material);

        /*      define and group all the mesh       */
        let mesh = new THREE.Mesh(geometry, material);
        let outlineMesh = new THREE.Mesh(outGeometry, outMaterial);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);
        group.add(outlineMesh);
        
        let el = this.el;
        el.setObject3D("group", group);
    }
});

/**
 * @summary Define directionallight indicator geometry
 *              Shape: arrow
 */
AFRAME.registerComponent("directionallightindicator", {
    schema:{
        color:{
            default:"red"
        }
    },
    init: function(){
        const data = this.data;
        /*      define geometry     */
        let arrowHead = new THREE.ConeGeometry(.5);
        let arrowPole = new THREE.CylinderGeometry(.1,.1, 2.5, 20, 4 );
        
        arrowHead.translate(0,1.8,0);
        arrowHead.rotateX(Math.PI);
        
        let geometry = new THREE.Geometry();
        geometry.merge(arrowHead);
        geometry.merge(arrowPole);

        /*      define outside geometry     */  
        let outArrowHead = new THREE.ConeGeometry(.7,1.3);
        let outArrowPole = new THREE.CylinderGeometry(.2,.2, 2.8, 20, 4 );
        
        let outGeometry = new THREE.Geometry();
        outArrowHead.translate(0,1.8,0);
        outArrowHead.rotateX(Math.PI);

        outGeometry.merge(outArrowHead);
        outGeometry.merge(outArrowPole);

        /*      define material     */
        let material = new THREE.MeshBasicMaterial({color:data.color});
        let outMaterial = CreateOutlineMaterial(material);
        /*  define and group all the meshes together      */
        let mesh = new AFRAME.THREE.Mesh(geometry, material);
        let outlineMesh = new AFRAME.THREE.Mesh(outGeometry,outMaterial);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);
        group.add(outlineMesh);

        let el = this.el;
        el.setObject3D("group", group);
    }
});


/**
 * @summary Define hemispherelight indicator geometry
 *              Shape: Double arrow
 * Weird bug - there's circle exist in up cone and don't know why its there
 */
AFRAME.registerComponent("hemispherelightindicator",{
    schema: {
        color:{
            default:"red"
        },
        secondColor:{
            default:"red"
        }
    },
    init: function(){
        const data = this.data;
        
        /*      define geometry      */
        let geometry = new THREE.Geometry();
        
        //define parts of geometry
        let head = new THREE.ConeGeometry(.5);
        let pole = new THREE.CylinderGeometry(.1,.1 ,1 ,20);
        head.translate(0,1.5,0);
        pole.translate(0,0.5,0);
        
        //merge geometries
        let arrowGeo = new THREE.Geometry();
        arrowGeo.merge(head);
        arrowGeo.merge(pole);

        //get down matrix
        let temp = new THREE.Mesh(arrowGeo);
        temp.rotateX(Math.PI);
        temp.updateMatrix();
        
        geometry.merge(arrowGeo,new THREE.Matrix4(), 0);
        geometry.merge(arrowGeo, temp.matrix, 1);

        /*      define outline geometry      */
        let outGeometry = new THREE.Geometry();
        const outHead = new THREE.ConeGeometry(.7,1.3,20,12);
        const outPole = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 20);
        outHead.translate(0, 1.5, 0);
        outPole.translate(0, 0.6, 0);

        let outArrowGeo = new THREE.Geometry();
        outArrowGeo.merge(outHead);
        outArrowGeo.merge(outPole);

        outGeometry.merge(outArrowGeo, new THREE.Matrix4(), 0);
        outGeometry.merge(outArrowGeo, temp.matrix, 1);

        /*      define material     */
        const material = new THREE.MeshBasicMaterial({color: data.color});
        const secondMaterial = new THREE.MeshBasicMaterial({color:data.secondColor});
        const outMaterial = CreateOutlineMaterial(material);
        const outSecondMaterial = CreateOutlineMaterial(secondMaterial);

        /*  define and group all the meshes together      */
        let mesh = new AFRAME.THREE.Mesh(geometry, [material, secondMaterial]);
        let outlineMesh = new AFRAME.THREE.Mesh(outGeometry,[outMaterial, outSecondMaterial]);

        let group = new AFRAME.THREE.Group();
        group.add(mesh);
        group.add(outlineMesh);
        
        let el = this.el;
        el.setObject3D("group", group);
    } 
});


/**
 * Return MeshBasicMaterial with the inverse of the color of material from parameter
 * 
 * @param {THREE.Material} material
 */
function CreateOutlineMaterial(material) {
    let invertColor = ~material.color.getHex();
    return new THREE.MeshBasicMaterial({ color: invertColor, side: THREE.BackSide });
}