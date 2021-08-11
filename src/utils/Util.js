import AFRAME from "aframe";
const THREE = AFRAME.THREE;

/**
 * Generate jpeg image 
 * 
 * @param {number} width 
 * @param {number} height 
 * @returns 
 */
export function getScreenshot(width,height,quality=1.0,format="image/jpeg"){
    let scene = document.querySelector("a-scene").object3D;
    let camera = document.querySelector("[camera]").getObject3D("camera");

    let renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true});
    renderer.setSize(width,height);
    renderer.render(scene,camera);
    return renderer.domElement.toDataURL(format,quality);
}