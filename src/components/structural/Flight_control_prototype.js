import AFRAME from "aframe";
 
AFRAME.registerComponent("vertical_flight", {
//probably need to specify camera
    init: function () {              
        let currentHeight = this.el.object3D.position.y;
        this.onKeydown = this.onKeydown.bind(this); 

        window.addEventListener("keydown", function(e){
            if(e.keyCode === 16) { //Shift
                this.el.setAttribute("position", {
                    y: currentHeight - 0.1,
                });
            }
            if(e.keyCode === 32) { //Spacebar
                this.el.setAttribute("position", {
                    y: currentHeight + 0.1,
                });
            }
        });
    }, 

    remove: function () {
        window.removeEventListener("keydown", this.onKeydown);
    },

});
