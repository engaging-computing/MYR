import React, { Component } from "react";
import { browserType } from "../../utils/browserType";

/**
 * Welcome Scene component returns static aframe scene to embed in welcome screen
 */
class WelcomeScene extends Component {
    /**
     * Create basicMoveCam
     * Refer to basicMoveCam in View.js for more detail description
     */
    createCam = () => {
        switch(browserType()) {
            case "mobile":
                return (
                    <a-entity id="rig" 
                        debug={true}
                        movement-controls="fly: true">
                        <a-camera
                            position="0 1.6 3"
                            look-controls="pointerLockEnabled: true">
                            <a-cursor
                                position="0 0 -1"
                                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                                material="color: #CCC; shader: flat;" />
                        </a-camera>
                    </a-entity> 
                );
            case "vr":
                return (
                    <a-entity id="rig" 
                        debug={true}
                        tracked-controls="idPrefix: OpenVR">
                        <a-camera
                            position="0 1.6 3"
                            look-controls="pointerLockEnabled: true">
                            <a-cursor
                                position="0 0 -1"
                                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                                material="color: #CCC; shader: flat;" />
                        </a-camera>
                    </a-entity> 
                );
            case "desktop":
            default:
                return (
                    <a-entity id="rig" debug={true}>
                        <a-camera
                            position="0 1.6 3"
                            look-controls="pointerLockEnabled: true"
                            wasd-plus-controls>
                            <a-cursor
                                position="0 0 -1"
                                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                                material="color: #CCC; shader: flat;" />
                        </a-camera>
                    </a-entity>
                );
        }
    }

    /**
     * @returns aframe scene that same as dropsies scene from example project 
     */
    render() {
        return (
            <a-scene physics="debug: false; friction: 3; restitution: .3;" embedded debug="false">
                <a-assets>
                    <a-mixin id="checkpoint"></a-mixin>
                    <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
                </a-assets>
                <this.createCam/>
                <a-sky color={"#fff"} />
                <a-entity id="floor"
                    geometry="primitive: box;"
                    material={"color: #222"}
                    static-body="shape: box"
                    scale="80 .01 80"
                    position="0 -0.5 0"
                />
                <a-entity geometry="primitive: box;" id="box0" material="color: green;" position="25 -25 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box1" material="color: yellow;" position="25 0 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box2" material="color: red;" position="25 25 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box3" material="color: purple;" position="25 375 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box4" material="color: green;" position="24 -24 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box5" material="color: green;" position="24 1 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box6" material="color: yellow;" position="24 26 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box7" material="color: red;" position="24 376 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box8" material="color: purple;" position="23 -23 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box9" material="color: green;" position="23 2 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box10" material="color: green;" position="23 27 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box11" material="color: yellow;" position="23 377 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box12" material="color: red;" position="22 -22 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box13" material="color: purple;" position="22 3 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box14" material="color: green;" position="22 28 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box15" material="color: green;" position="22 378 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box16" material="color: yellow;" position="21 -21 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box17" material="color: red;" position="21 4 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box18" material="color: purple;" position="21 29 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box19" material="color: green;" position="21 379 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box20" material="color: green;" position="20 -20 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box21" material="color: yellow;" position="20 5 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box22" material="color: red;" position="20 30 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box23" material="color: purple;" position="20 380 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box24" material="color: green;" position="19 -19 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box25" material="color: green;" position="19 6 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box26" material="color: yellow;" position="19 31 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box27" material="color: red;" position="19 381 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box28" material="color: purple;" position="18 -18 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box29" material="color: green;" position="18 7 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box30" material="color: green;" position="18 32 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box31" material="color: yellow;" position="18 382 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box32" material="color: red;" position="17 -17 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box33" material="color: purple;" position="17 8 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box34" material="color: green;" position="17 33 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box35" material="color: green;" position="17 383 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box36" material="color: yellow;" position="16 -16 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box37" material="color: red;" position="16 9 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box38" material="color: purple;" position="16 34 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box39" material="color: green;" position="16 384 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box40" material="color: green;" position="15 -15 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box41" material="color: yellow;" position="15 10 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box42" material="color: red;" position="15 35 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box43" material="color: purple;" position="15 385 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box44" material="color: green;" position="14 -14 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box45" material="color: green;" position="14 11 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box46" material="color: yellow;" position="14 36 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box47" material="color: red;" position="14 386 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box48" material="color: purple;" position="13 -13 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box49" material="color: green;" position="13 12 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box50" material="color: green;" position="13 37 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box51" material="color: yellow;" position="13 387 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box52" material="color: red;" position="12 -12 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box53" material="color: purple;" position="12 13 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box54" material="color: green;" position="12 38 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box55" material="color: green;" position="12 388 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box56" material="color: yellow;" position="11 -11 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box57" material="color: red;" position="11 14 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box58" material="color: purple;" position="11 39 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box59" material="color: green;" position="11 389 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box60" material="color: green;" position="10 -10 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box61" material="color: yellow;" position="10 15 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box62" material="color: red;" position="10 40 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box63" material="color: purple;" position="10 390 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box64" material="color: green;" position="9 -9 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box65" material="color: green;" position="9 16 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box66" material="color: yellow;" position="9 41 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box67" material="color: red;" position="9 391 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box68" material="color: purple;" position="8 -8 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box69" material="color: green;" position="8 17 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box70" material="color: green;" position="8 42 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box71" material="color: yellow;" position="8 392 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box72" material="color: red;" position="7 -7 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box73" material="color: purple;" position="7 18 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box74" material="color: green;" position="7 43 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box75" material="color: green;" position="7 393 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box76" material="color: yellow;" position="6 -6 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box77" material="color: red;" position="6 19 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box78" material="color: purple;" position="6 44 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box79" material="color: green;" position="6 394 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box80" material="color: green;" position="5 -5 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box81" material="color: yellow;" position="5 20 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box82" material="color: red;" position="5 45 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box83" material="color: purple;" position="5 395 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box84" material="color: green;" position="4 -4 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box85" material="color: green;" position="4 21 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box86" material="color: yellow;" position="4 46 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box87" material="color: red;" position="4 396 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box88" material="color: purple;" position="3 -3 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box89" material="color: green;" position="3 22 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box90" material="color: green;" position="3 47 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box91" material="color: yellow;" position="3 397 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box92" material="color: red;" position="2 -2 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box93" material="color: purple;" position="2 23 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box94" material="color: green;" position="2 48 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box95" material="color: green;" position="2 398 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box96" material="color: yellow;" position="1 -1 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box97" material="color: red;" position="1 24 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box98" material="color: purple;" position="1 49 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box99" material="color: green;" position="1 399 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box100" material="color: green;" position="0 0 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box101" material="color: yellow;" position="0 25 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box102" material="color: red;" position="0 50 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box103" material="color: purple;" position="0 400 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box104" material="color: green;" position="-1 1 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box105" material="color: green;" position="-1 26 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box106" material="color: yellow;" position="-1 51 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box107" material="color: red;" position="-1 401 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box108" material="color: purple;" position="-2 2 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box109" material="color: green;" position="-2 27 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box110" material="color: green;" position="-2 52 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box111" material="color: yellow;" position="-2 402 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box112" material="color: red;" position="-3 3 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box113" material="color: purple;" position="-3 28 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box114" material="color: green;" position="-3 53 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box115" material="color: green;" position="-3 403 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box116" material="color: yellow;" position="-4 4 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box117" material="color: red;" position="-4 29 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box118" material="color: purple;" position="-4 54 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box119" material="color: green;" position="-4 404 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box120" material="color: green;" position="-5 5 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box121" material="color: yellow;" position="-5 30 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box122" material="color: red;" position="-5 55 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box123" material="color: purple;" position="-5 405 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box124" material="color: green;" position="-6 6 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box125" material="color: green;" position="-6 31 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box126" material="color: yellow;" position="-6 56 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box127" material="color: red;" position="-6 406 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box128" material="color: purple;" position="-7 7 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box129" material="color: green;" position="-7 32 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box130" material="color: green;" position="-7 57 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box131" material="color: yellow;" position="-7 407 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box132" material="color: red;" position="-8 8 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box133" material="color: purple;" position="-8 33 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box134" material="color: green;" position="-8 58 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box135" material="color: green;" position="-8 408 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box136" material="color: yellow;" position="-9 9 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box137" material="color: red;" position="-9 34 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box138" material="color: purple;" position="-9 59 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box139" material="color: green;" position="-9 409 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box140" material="color: green;" position="-10 10 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box141" material="color: yellow;" position="-10 35 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box142" material="color: red;" position="-10 60 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box143" material="color: purple;" position="-10 410 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box144" material="color: green;" position="-11 11 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box145" material="color: green;" position="-11 36 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box146" material="color: yellow;" position="-11 61 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box147" material="color: red;" position="-11 411 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box148" material="color: purple;" position="-12 12 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box149" material="color: green;" position="-12 37 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box150" material="color: green;" position="-12 62 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box151" material="color: yellow;" position="-12 412 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box152" material="color: red;" position="-13 13 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box153" material="color: purple;" position="-13 38 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box154" material="color: green;" position="-13 63 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box155" material="color: green;" position="-13 413 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box156" material="color: yellow;" position="-14 14 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box157" material="color: red;" position="-14 39 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box158" material="color: purple;" position="-14 64 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box159" material="color: green;" position="-14 414 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box160" material="color: green;" position="-15 15 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box161" material="color: yellow;" position="-15 40 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box162" material="color: red;" position="-15 65 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box163" material="color: purple;" position="-15 415 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box164" material="color: green;" position="-16 16 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box165" material="color: green;" position="-16 41 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box166" material="color: yellow;" position="-16 66 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box167" material="color: red;" position="-16 416 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box168" material="color: purple;" position="-17 17 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box169" material="color: green;" position="-17 42 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box170" material="color: green;" position="-17 67 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box171" material="color: yellow;" position="-17 417 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box172" material="color: red;" position="-18 18 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box173" material="color: purple;" position="-18 43 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box174" material="color: green;" position="-18 68 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box175" material="color: green;" position="-18 418 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box176" material="color: yellow;" position="-19 19 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box177" material="color: red;" position="-19 44 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box178" material="color: purple;" position="-19 69 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box179" material="color: green;" position="-19 419 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box180" material="color: green;" position="-20 20 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box181" material="color: yellow;" position="-20 45 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box182" material="color: red;" position="-20 70 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box183" material="color: purple;" position="-20 420 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box184" material="color: green;" position="-21 21 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box185" material="color: green;" position="-21 46 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box186" material="color: yellow;" position="-21 71 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box187" material="color: red;" position="-21 421 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box188" material="color: purple;" position="-22 22 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box189" material="color: green;" position="-22 47 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box190" material="color: green;" position="-22 72 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box191" material="color: yellow;" position="-22 422 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box192" material="color: red;" position="-23 23 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box193" material="color: purple;" position="-23 48 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box194" material="color: green;" position="-23 73 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box195" material="color: green;" position="-23 423 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box196" material="color: yellow;" position="-24 24 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box197" material="color: red;" position="-24 49 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box198" material="color: purple;" position="-24 74 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
                <a-entity geometry="primitive: box;" id="box199" material="color: green;" position="-24 424 -10" rotation="0 0 0" scale="1 1 1" dynamic-body="shape: box; mass: 5" ></a-entity>
            </a-scene >
        );
    }
}

export default WelcomeScene;
