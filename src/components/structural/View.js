import React, { Component, Fragment } from "react";
import { browserType } from "../../utils/browserType";
import "aframe";
import "three-pathfinding/dist/three-pathfinding";
import "aframe-extras/dist/aframe-extras.min.js";
import "aframe-physics-system";
import "aframe-environment-component";

/**
 * The View component return the aframe representation of the scene. This
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
    /**
     * The timer ID set to check if the welcome screen is open
     * It will use it to cancel the timer once the welcome screen is close
     */
    intervalID = 0;

    /**
     * Called when the MYR Scene is mounted (component has been rendererd to the DOM)
     * 
     * It check if the user's first time visiting, then it will set up a interval to see if the welcome screen is closed for every 1000ms
     * It also add a event listener to 
     *     stop key press of movement (arrow key and space) to scroll the page
     *     hide or show "interface" (editor) depends on when user enter or exit the VR(fullscreen) mode.
     */
    componentDidMount() { 
        if (!this.getCookie("hasVisited")) {
            this.intervalID = setInterval(this.checkForWelcomeScreen, 1000);
        }
        else {
            this.setState({ welcomeOpen: false });
        }
        window.addEventListener("keydown", function (e) {
            //KEYS: left and right: 37, 39; up and down: 38, 40; space: 32
            if ([32, 38, 40].indexOf(e.keyCode) > -1 && e.target === document.body) {
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
    
    /**
     * Called when MYR Scene is rendererd (DOM elements is changed/updated)
     * 
     * If the welcome screen is closed, it fires an event for "myr-view-rendererd" which added in
     *  change() & push() in Myr.js but these are unused functions that are not documented in reference. 
     */
    componentDidUpdate() {
        if (!this.state.welcomeOpen) {
            // Create the event
            let event = new CustomEvent("myr-view-rendered");

            // Dispatch/Trigger/Fire the event
            document.dispatchEvent(event);
        }   
    }

    /**
     * Called when the MYR Scene is unmounting (Being removed from the DOM)
     * 
     * It will check if the timerID for checking welcome screen is set, 
     * If so it will clear/stop the timer from checking.
     */
    componentWillUnmount() {
        if (this.intervalID !== 0) { clearInterval(this.intervalID); }
    }

    /**
     * On every interval (1000ms) it check whether the cookie hasVisited is set to true
     * If so, set state "welcomeOpen" to false (so it will render the scene) 
     * and stop the timer. 
     */
    checkForWelcomeScreen = () => {
        if (this.getCookie("hasVisited")) {
            this.setState({ welcomeOpen: false });
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
    }

    /**
     * Get value of cookie
     * @param {string} cookieName name of cookie
     * @returns {string} value of cookie if it exist, return empty string otherwise
     */
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

    /**
     * A helper function that converts MYR objects into a corresponded A-Frame DOM elements
     * 
     * @param {object} ent MYR object
     * @returns {HTMLElement} A-Frame entities
     */
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
            return <a-entity class="raycastable" key={ent.id} {...flattened} shadow={shadow} shadowcustomsetting ></a-entity>;
        }
    }
    /**
     * Helper fuctions that returns A-Frame elements that contains necessary configuration for light indicator based on light's type and properties
     * 
     * @param {object} ent Myr object
     * @returns A-Frame entities of light indicator
     */
    lightIndicatorHelper =(ent)=>{ 
        //this is a position for passing in to indicatorroation to determine the rotation of the light that use position as vector.
        let position =`position:${ent.position.x || 0} ${ent.position.y || 0} ${ent.position.z || 0};`;
        if(ent.light.target){
            position += `target:${ent.light.target.x || 0} ${ent.light.target.y || 0} ${ent.light.target.z || 0};`;
        } 

        //ambient light doesn't have an indicator
        switch(ent.light.type){
            case "point":
                return <a-entity id={ent.id+"Ind"} key={ent.id+"Ind"} pointlightindicator={`color: ${ent.color};`}></a-entity>;
            case "spot":
                let target = true;
                if(!ent.light.target) {
                    position = "";
                    target = false;
                }
                return <a-entity id={ent.id+"Ind"} key={ent.id+"Ind"} spotlightindicator={`color: ${ent.color}; target:${target}`} indicatorrotation={position}></a-entity>;
            case "directional":
                return <a-entity id={ent.id+"Ind"} key={ent.id+"Ind"} directionallightindicator={`color: ${ent.color};`} indicatorrotation={position}></a-entity>;
            case "hemisphere":
                return <a-entity id={ent.id+"Ind"} key={ent.id+"Ind"} hemispherelightindicator={`color: ${ent.color}; secondColor: ${ent.light.secondColor}`} ></a-entity>;
            default:
        }
    }

    /**
     * Helper function that returns configuration for shadow based on light's type
     * 
     * @param {object} light light properties
     * @returns {string} string of aframe configuration of shadow that will attach to the light attribute
     */
    lightShadowHelper = (light) =>{
        let newState = "";
        //ambient and hemisphere light doesn't cast shadow
        if(light.type !== "ambient" && light.type !== "hemisphere"){
            newState += "castShadow:true; shadowMapHeight:2000; shadowMapWidth:2000;";
            if(light.type === "spot"){
                newState += "shadowBias: -0.02; shadowCameraNear: 7;";
            }else if(light.type ==="directional"){
                newState += "shadowCameraNear: -40; shadowBias: -0.002; shadowCameraTop: 40; shadowCameraBottom: -40; shadowCameraLeft: -40; shadowCameraRight: 40;";
            }else if(light.type === "point"){
                newState += "shadowCameraFar: 25; shadowBias: -0.02;";
            }
        }else{
            newState += "castShadow: false;";
        }
        return newState;
    }

    /**
     * Help convert asset(model,image,etc) datas to A-Frame entitiy
     * 
     * @param {object} asset 
     * @returns {HTMLElement} a-asset-item of the object
     */
    assetsHelper = (asset) => {
        return (
            <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
        );
    }

    /**
     * It creates 2 different A-Frame camera. As for now, it will always be basicMoveCam.
     * 
     * @returns {HTMLElement} Camera elements
     */
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

    /**
     * Check point cam is a mode where there's a checkpoints in the scene where user can select them to teleport to that position 
     * to move around the scene compare to the regular movement.
     * 
     * Check point is currently not implemented in MYR to be an usable feature.
     * 
     * @returns {HTMLElement} Camera elements contains checkpoint control
     */
    checkpointCam = () => {
        return (
            <a-entity id="rig" movement-controls="controls: checkpoint" checkpoint-controls="mode: animate">
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
     * It returns camera basic with different movement control depends on the browser type
     *      Mobile:
     *          default movement controls with flying enabled
     *      VR:
     *          default movement controls with flying disabled
     *      Desktop:
     *          custom wasd-plus-control with controllable movement speed
     * 
     * @returns {HTMLElement} A-Frame camera elements with basic movement
     */
    basicMoveCam = () => {
        switch(browserType()) {
            case "mobile":
                return (
                    <a-entity id="rig" 
                        debug={true}
                        movement-controls="fly: true">
                        <a-camera
                            position={this.props.sceneConfig.settings.cameraPosition}
                            look-controls="pointerLockEnabled: true">
                            <a-cursor
                                raycaster="objects:.raycastable"
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
                        movement-controls>
                        <a-camera
                            position={this.props.sceneConfig.settings.cameraPosition}>
                            <a-cursor
                                raycaster="objects:.raycastable"
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
                            position={this.props.sceneConfig.settings.cameraPosition}
                            look-controls="pointerLockEnabled: true"
                            wasd-plus-controls={`acceleration: ${this.props.sceneConfig.settings.moveSpeed}`}>
                            <a-cursor
                                raycaster="objects:.raycastable"
                                position="0 0 -1"
                                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03;"
                                material="color: #CCC; shader: flat;" />
                        </a-camera>
                    </a-entity>
                );
        }
    }



    /**
    * Produces the grid on the ground and the coordinate lines
    * 
    * @returns {HTMLElements} A-Frame entitiy containing grid, tube for axies and text to label those axes 
    */
    coordinateHelper = () => {
        if (this.props.sceneConfig.settings.showCoordHelper) {
            return (
                <Fragment>
                    <a-grid height="53.33" width="53.33" position="-0.5 -0.26 -0.5" scale="1.5 1.5 1.5" material="shader:flat;"/>
                    <a-tube path="-35 -0.2 0, 35 -0.2 0" radius="0.05" material="color: red; shader:flat;"></a-tube>
                    <a-tube path="0 -0.2 -35, 0 -0.2 35" radius="0.05" material="color: blue; shader:flat;"></a-tube>
                    <a-text
                        color="#555"
                        rotation="0 0 0"
                        position="-0.0005 .1 0"
                        side="double"
                        align="center"
                        value="- X           X +"></a-text>
                    <a-text
                        color="#555"
                        rotation="0 90 0"
                        position="0 .1 -0.01"
                        side="double"
                        align="center"
                        value="+ Z          Z -"></a-text>
                    <a-text
                        color="#555"
                        rotation="0 90 90"
                        position="0 .1 0"
                        side="double"
                        value=" Y + "></a-text>
                </Fragment>
            );
        } else {
            return null;
        }
    }

    /**
     * Display the floor if the showFloor setting is true 
     * @returns 80x80 plane with showFloor color or null if the showFloor is false
     */
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

    /**
     * Main part for Rendering MYR Scene!
     * 
     * @returns {HTMLElement} A-Frame scene containing all the settings and MYR objects
     */
    render = () => {
        /* eslint-disable */
        return (
            !this.state.welcomeOpen ?
            <a-scene shadow="type:pcf;" physics="debug: false; friction: 3; restitution: .3;" embedded debug="false">
                <a-assets>
                    <a-mixin id="checkpoint"></a-mixin>
                    <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
                    <a-img id="reference" src={`${process.env.PUBLIC_URL}/img/coordHelper.jpg`} />
                    {this.props.assets ? this.props.assets.map((x) => this.assetsHelper(x)) : null}
                </a-assets>
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
                { // create the entities
                    Object.keys(this.props.objects).map(it => {
                        return this.helper(this.props.objects[it]);
                    })
                }
                <this.createCam />
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
