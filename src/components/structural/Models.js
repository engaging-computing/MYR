let ModelPack = new Map();
// Models that have been cleared for us to host
ModelPack.set("sword", "https://github.com/beewyka819/MYR/raw/models/assets/gltf/sword_2.9.glb");
ModelPack.set("test", "https://github.com/beewyka819/MYR/raw/models/assets/gltf/test.glb");
ModelPack.set("duck", "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb");

// Below are models for which licenses need to be reviewed before hosting
// N/A

const defaultModel = {
    ModelPack: ModelPack,
};

export default function m(model = defaultModel) {
    return model;
}
