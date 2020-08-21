import React, { Component, Fragment } from "react";
import "aframe";
import "aframe-animation-component";
import "three-pathfinding/dist/three-pathfinding";
import "aframe-extras/dist/aframe-extras.min.js";
import "aframe-physics-system";
import "aframe-environment-component";
import * as THREE from "three";

/**
 * @summary - The View component return the aframe representation of the scene. This
 * system utilizes the entity component system(ECS) to build objects in the scene from different
 * components.
 */
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeOpen: true
        };
    }
    intervalID = 0;

    componentDidMount() {
        // Don't show editor if welcome screen is open
        if (!this.getCookie("hasVisited")) {
            this.intervalID = setInterval(this.checkForWelcomeScreen, 1000);
        }
        else {
            this.setState({ welcomeOpen: false });
        }
        window.addEventListener("keydown", function (e) {
            //KEYS: left and right: 37, 39; up and down: 38, 40; space: 32
            if ([38, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

        window.addEventListener("enter-vr", () => {
            document.getElementById("interface").style.visibility = "hidden";
        });

        window.addEventListener("exit-vr", () => {
            document.getElementById("interface").style.visibility = "visible";
        });
    }
    // This fires off an event when the system is fully rendered.
    componentDidUpdate() {
        if (!this.state.welcomeOpen) {
            // Create the event
            let event = new CustomEvent("myr-view-rendered");

            // Dispatch/Trigger/Fire the event
            document.dispatchEvent(event);

            let el = document.getElementById("rig");
            el.components["movement-controls"].velocity = new THREE.Vector3(0, 0, 0);
        }
        
    }

    componentWillUnmount() {
        if (this.intervalID !== 0) { clearInterval(this.intervalID); }
    }

    checkForWelcomeScreen = () => {
        if (this.getCookie("hasVisited")) {
            this.setState({ welcomeOpen: false });
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
    }

    getCookie = (cookieName) => {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // This renders json to aframe entities
    helper = (ent) => {
        if (ent) {
            let flattened = {
                ...ent,
                position: `${ent.position.x || 0} ${ent.position.y || 0} ${ent.position.z || 0}`,
                scale: `${ent.scale.x || 1} ${ent.scale.y || 1} ${ent.scale.z || 1}`,
                rotation: `${ent.rotation.x || 0} ${ent.rotation.y || 0} ${ent.rotation.z || 0}`
            };
            // If it is group then render children then render parent
            if (ent.group) {
                return (
                    <a-entity key={ent.id} {...flattened}>
                        {ent.els ? ent.els.map(it => this.helper(it)) : null}
                    </a-entity>
                );
            }
            if(ent.light){
                delete flattened.light;
                let target=null,indicator=null;
                if(ent.light.target){ 
                    //Since the target will override the rotation, we want to delete the rotation attribute so it won't have an effect on the rotation of indicator.
                    delete flattened.rotation;
                    ent.light.state +="target: #lighttarget;";
                    let target_position= `${ent.light.target.x || 0} ${ent.light.target.y || 0} ${ent.light.target.z || 0}`;
                    target = <a-entity id="lighttarget"  position={target_position}></a-entity>;
                }
                if(this.props.sceneConfig.settings.lightIndicator){
                    indicator = this.lightIndicatorHelper(ent);
                }
                if(this.props.sceneConfig.settings.castShadow){
                    ent.light.state += this.lightShadowHelper(ent.light);
                }
                return [<a-entity key={ent.id} id={ent.id} light={ent.light.state} {...flattened}>{indicator}</a-entity>,target];
            }
            let shadow;
            if(this.props.sceneConfig.settings.castShadow){
                shadow = "cast:true; receive:true;";
            }else{
                shadow = "cast:false; receive:false;";
            }

            if (ent.text) {
                delete flattened.text; // this takes care of a warning, may not be necessary
                return <a-text key={ent.id} {...flattened}></a-text>;
            }
            if (ent.tube) {
                return <a-tube path={ent.path} radius={ent.radius} material={ent.material} shadow={shadow} shadowcustomsetting></a-tube>;
            }
            return <a-entity key={ent.id} {...flattened} shadow={shadow} shadowcustomsetting ></a-entity>;
        }
    }
    //return elements that contains necessary configuration for light indicator based on light's type and properties
    lightIndicatorHelper =(ent)=>{ 
        //ambient light doesn't have an indicator
        if(ent.light.type !== "ambient"){
            //set the custom indicator geometry, material, and layer.
            let geo = `primitive: ${ent.light.type+"LightIndicator"};`;
            let geoOutline = `primitive: ${ent.light.type+"LightOutlineIndicator"};`;
            let mat = `color:${ent.color}; side:double;`;
            let layer = "type: mesh; layer:1;";

            //this is a position for passing in to indicatorroation component(aframe reg) to determine the rotation of the light that use position as vector.
            let position =`position:${ent.position.x || 0} ${ent.position.y || 0} ${ent.position.z || 0};`;
            //this is second position for indicator of hemisphere light
            let oppositePosition =`position: ${-ent.position.x || 0} ${-ent.position.y || 0} ${-ent.position.z || 0};`;

            //if there's target to set, we need to count that into the rotation of light.
            if(ent.light.target){
                if(ent.light.type === "spot") {
                    geo = "primitive: spotLightTargetIndicator";
                    geoOutline = "primitive: spotLightTargetOutlineIndicator";
                }
                position += `target:${ent.light.target.x || 0} ${ent.light.target.y || 0} ${ent.light.target.z || 0};`;
                oppositePosition += `target: ${-ent.light.target.x || 0} ${-ent.light.target.y || 0} ${-ent.light.target.z || 0};`;
            //if there's no target and light is spotlight, set position to the empty string so that the calculation won't effect the indicator
            } else if (ent.light.type === "spot") {
                position = "";
            }
            if(ent.light.type === "hemisphere"){
                return <a-entity>
                    <a-entity key={ent.id+"IndTop"} id={ent.id+"IndTop"} geometry={geo} material={mat} layer={layer} indicatorrotation={position}>
                        <a-entity key={ent.id+"IndBottom"} id={ent.id+"IndBottom"} geometry={geo} material={`color:${ent.light.groundColor};side:double;`} layer={layer} indicatorrotation={oppositePosition}></a-entity>
                    </a-entity>
                    <a-entity key={ent.id+"IndOutTop"} id={ent.id+"IndOut"} geometry={geoOutline} material={mat} outline layer={layer} indicatorrotation={position}>
                        <a-entity key={ent.id+"IndOutBottom"} id={ent.id+"IndOutBottom"} geometry={geoOutline} material={`color:${ent.light.secondColor};side:double;`} outline layer={layer} indicatorrotation={oppositePosition}></a-entity>;
                    </a-entity>
                </a-entity>;
            } 
            return <a-entity >
                <a-entity key={ent.id+"Ind"} id={ent.id+"Ind"} geometry={geo} material={mat} layer={layer} indicatorrotation={position}></a-entity>;
                <a-entity key={ent.id+"IndOut"} id={ent.id+"IndOut"} geometry={geoOutline} material={mat} outline layer={layer} indicatorrotation={position}></a-entity>;
            </a-entity>;
        }
        return null;
    }
    //return string that contains necessary configuration for shadow based on light's type
    lightShadowHelper = (light) =>{
        let newState = "";
        //ambient and hemisphere light doesn't cast shadow
        if(light.type !== "ambient" && light.type !== "hemisphere"){
            newState += "castShadow:true; shadowMapHeight:1024; shadowMapWidth:1024;";  
            if(light.type ==="directional"){
                newState += "shadowCameraNear: -40; shadowBias: -0.0011; shadowCameraTop: 40; shadowCameraBottom: -40; shadowCameraLeft: -40; shadowCameraRight: 40;";
            }else if(light.type === "point"){
                newState += "shadowCameraFar: 25; shadowBias: -0.02;";
            }else{
                newState += "shadowBias: -0.02; shadowCameraNear: 7;";
            }
        }else{
            newState += "castShadow: false;";
        }
        return newState;
    }

    assetsHelper = (asset) => {
        return (
            <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
        );
    }

    createCam = () => {
        switch (this.props.sceneConfig.settings.camConfig) {
            case 0:
                return this.basicMoveCam();
            case 1:
                return this.checkpointCam();
            default:
                return this.basicMoveCam();
        }
    }

    checkpointCam = () => {
        return (
            <a-entity id="rig" movement-controls="controls: checkpoint" checkpoint-controls="mode: animate">
                <a-camera
                    position={this.props.sceneConfig.settings.cameraPosition}
                    look-controls="pointerLockEnabled: true"
                >
                    <a-cursor
                        position="0 0 -1"
                        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                        material="color: #CCC; shader: flat;" />
                </a-camera>
            </a-entity>
        );
    }

    basicMoveCam = () => {
        return (
            <a-entity id="rig"
                debug={true}
                movement-controls={this.props.sceneConfig.settings.canFly ? "fly:true" : "fly:false"} >
                <a-camera
                    position={this.props.sceneConfig.settings.cameraPosition}
                    look-controls="pointerLockEnabled: true">
                    <a-cursor
                        position="0 0 -1"
                        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                        material="color: #CCC; shader: flat;" />
                </a-camera>
            </a-entity>
        );
    }



    /**
    * @summary - Produces the grid on the ground and the coordinate lines
    *
    */
    coordinateHelper = () => {
        if (this.props.sceneConfig.settings.showCoordHelper) {
            return (
                <Fragment>
                    <a-grid height="53.33" width="53.33" position="-0.5 -0.26 -0.5" scale="1.5 1.5 1.5"  layer="type:mesh;layer:1;"/>
                    <a-tube path="-35 -0.2 0, 35 -0.2 0" radius="0.05" material="color: red" layer="type:mesh;layer:1;"></a-tube>
                    <a-tube path="0 -0.2 -35, 0 -0.2 35" radius="0.05" material="color: blue" layer="type:mesh;layer:1;"></a-tube>
                    <a-text
                        color="#555"
                        rotation="0 0 0"
                        position="-0.0005 .1 0"
                        side="double"
                        align="center"
                        value="- X           X +"
                        layer="type:text;layer:1;"></a-text>
                    <a-text
                        color="#555"
                        rotation="0 90 0"
                        position="0 .1 -0.01"
                        side="double"
                        align="center"
                        value="+ Z          Z -"
                        layer="type:text;layer:1;"></a-text>
                    <a-text
                        color="#555"
                        rotation="0 90 90"
                        position="0 .1 0"
                        side="double"
                        value=" Y + "
                        layer="type:text;layer:1;"></a-text>
                </Fragment>
            );
        } else {
            return null;
        }
    }

    makeFloor = () => {
        if (this.props.sceneConfig.settings.showFloor) {
            return (
                <a-plane
                    id="floor"
                    geometry="primitive: box;"
                    color={this.props.sceneConfig.settings.floorColor}
                    material="side: double;"
                    static-body="shape: box"
                    scale="80 .01 80"
                    position="0 -0.5 0"
                    shadow={`cast: false; receive: ${this.props.sceneConfig.settings.castShadow}`}
                />
            );
        } else {
            return null;
        }
    }

    render = () => {
        /* eslint-disable */
        return (
            !this.state.welcomeOpen ?
                <a-scene stats scenelayer shadow="type:pcf;" physics="debug: false; friction: 3; restitution: .3;" embedded debug="false">
                    <a-assets>
                        <a-mixin id="checkpoint"></a-mixin>
                        <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
                        <a-img id="reference" src={`${process.env.PUBLIC_URL}/img/coordHelper.jpg`} />
                        {this.props.assets ? this.props.assets.map((x) => this.assetsHelper(x)) : null}
                    </a-assets>
                    <this.createCam />
                    <a-sky color={this.props.sceneConfig.settings.skyColor} />
                    <this.coordinateHelper />
                    <this.makeFloor />
                    {this.props.sceneConfig.settings.defaultLight ? 
                                <a-entity id="DefaultLight">                   
                                    <a-entity id="AmbientLight" light="type: ambient; color: #BBB"></a-entity>
                                    <a-entity id="DirectionalLight" light={"type: directional; color: #FFF; intensity: 0.6; " + this.lightShadowHelper({state: "",type: "directional"})} position="-3 3 1"></a-entity> 
                                </a-entity>  
                        : null
                    }
                    {this.props.sceneConfig.settings.lightIndicator||this.props.sceneConfig.settings.showCoordHelper ? 
                            <a-entity id="AltLayerLight">                   
                                <a-entity id="AmbientLight" light="type: ambient; color: #BBB" layer="type:light;layer:1;"></a-entity>
                                <a-entity id="DirectionalLight" light={"type: directional; color: #FFF; intensity: 0.6; " + this.lightShadowHelper({state: "",type: "directional"})} position="-3 3 1" layer="type:light;layer:1;"></a-entity> 
                            </a-entity>  
                        : null}
                    { // create the entities
                        Object.keys(this.props.objects).map(it => {
                            return this.helper(this.props.objects[it]);
                        })
                    }
                    

                    {this.props.sceneConfig.settings.camConfig === 1 ?
                        <a-entity position="0 0 0">
                            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 -25" color="#39BB82"></a-cylinder>
                            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 25" color="#39BB82"></a-cylinder>
                            <a-cylinder checkpoint radius="1" height="0.3" position="-25 1 25" color="#39BB82"></a-cylinder>
                            <a-cylinder checkpoint radius="1" height="0.3" position="25 1 -25" color="#39BB82"></a-cylinder>
                            <a-circle checkpoint radius="1" rotation="90 0 0" position="0 10 0" color="#39BB82"></a-circle>
                        </a-entity>
                        : null
                    }
                </a-scene>
                :
                null
        );
        /* eslint-enable */
    }
}

export default View;
