import AFRAME from "aframe";
import * as THREE from "three";

AFRAME.registerComponent("force-pushable", {
    schema: {
        force: { default: 10 }
    },
    init: function () {
        this.pStart = new THREE.Vector3();
        this.sourceEl = this.el.sceneEl.querySelector("#rig");
        this.el.addEventListener("click", this.forcePush.bind(this));
    },
    forcePush: function () {
        let force,
            el = this.el,
            pStart = this.pStart.copy(this.sourceEl.getAttribute("position"));

        // Compute direction of force, normalize, then scale.
        force = el.body.position.vsub(pStart);
        force.normalize();
        force.scale(this.data.force, force);

        el.body.applyImpulse(force, el.body.position);
    }
});

/*AFRAME.registerComponent("flight-reader", {
    schema: {
        position:  {
            x: 0,
            y: 0,
            z: 0,
        }
    },
    init : function (schema) {
        //this.onKeydown = bind(this.onKeydown, this);
        //window.addEventListener('keydown', this.onKeydown);
        console.log(schema);
        console.log(this.props);
        let position = new THREE.Vector3();
        console.log(this.el.object3D.getWorldPosition(position));
        let test = this.el;
        document.addEventListener("keydown", function(e){
            console.log(66);
            console.log(test.object3D.getWorldPosition(position));
            if(e.keyCode === 16) { //Shift
                console.log(test);
                console.log(test.object3D.getWorldPosition(position));
                test.object3D.getWorldPosition(position);
                let x = position.x, y = position.y, z = position.z;
                y = y + 10;
                this.props.sceneActions.spaceUp(x, y, z); 
            }
            if(e.keyCode === 32) { //Spacebar
                test.object3D.getWorldPosition(position);
                let x = position.x, y = position.y, z = position.z;
                y = y - 10;
                this.props.sceneActions.shiftDown(x, y, z); 
            }
        });
    },
    tick: (function () {
        let position = new THREE.Vector3();
       // if(e.keyCode === 16) { //Shift
       //    console.log(55);
       //     this.el.object3D.getWorldPosition(position);
       //     let x = position.x, y = position.y, z = position.z;
       //     y = y + 10;
       //     this.props.sceneActions.spaceUp(x, y, z); 
       // }
       // if(e.keyCode === 32) { //Spacebar
       //     this.el.object3D.getWorldPosition(position);
       //     let x = position.x, y = position.y, z = position.z;
       //     y = y - 10;
       //     this.props.sceneActions.shiftDown(x, y, z); 
       // }
        return function () {
           this.el.object3D.getWorldPosition(position);
        };
    })
    //    onKeydown: function (evt) {
    //        var shortcutPressed = evt.keyCode === 73 && evt.ctrlKey && evt.altKey;
    //        if (!this.data || !shortcutPressed) { return; }
    //        this.injectInspector();
    //      },
});*/
