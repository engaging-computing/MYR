/**
 * Map of textures' name and url and img url for retrieval
 */
let ModelPack = new Map();
// Models that have been cleared for us to host
ModelPack.set("sword", {model: "/models/sword.glb", image: "/img/models/sword.png"});
ModelPack.set("fish", {model: "/models/BarramundiFish.glb", image: "/img/models/fish.jpg"});
ModelPack.set("milkTruck", {model: "/models/CesiumMilkTruck.glb", image: "/img/models/milkTruck.gif"});
ModelPack.set("fox", {model: "/models/Fox.glb", image: "/img/models/fox.jpg"});
ModelPack.set("lantern", {model: "/models/Lantern.glb", image: "/img/models/lantern.jpg"});
ModelPack.set("fabricChair", {model: "/models/SheenChair.glb", image: "/img/models/fabricChair.jpg"});
ModelPack.set("duck", {model: "/models/Duck.glb", image: "/img/models/duck.png"});

// Below are models for which licenses need to be reviewed before hosting
// N/A

const defaultModel = {
    ModelPack: ModelPack,
};

export default function m(model = defaultModel) {
    return model;
}
