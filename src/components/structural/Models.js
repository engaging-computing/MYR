let ModelPack = new Map();
// Models that have been cleared for us to host
ModelPack.set("sword", "https://raw.githubusercontent.com/beewyka819/MYR/models/assets/gltf/sword_2.9.glb");
ModelPack.set("fish", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb");
ModelPack.set("milkTruck", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb");
ModelPack.set("fox", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb");
ModelPack.set("lantern", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb");
ModelPack.set("materialTestSpheres", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb");
ModelPack.set("fabricChair", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb");
ModelPack.set("cloth", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenCloth/glTF/SheenCloth.gltf");
ModelPack.set("duck", "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb");

// Below are models for which licenses need to be reviewed before hosting
// N/A

const defaultModel = {
    ModelPack: ModelPack,
};

export default function m(model = defaultModel) {
    return model;
}
