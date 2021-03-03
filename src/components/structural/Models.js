let ModelPack = new Map();
ModelPack.set("sword", "https://github.com/beewyka819/MYR/raw/models/assets/gltf/sword_2.9.glb");
ModelPack.set("test", "https://github.com/beewyka819/MYR/raw/models/assets/gltf/test.glb");

const defaultModel = {
    ModelPack: ModelPack,
};

export default function m(model = defaultModel) {
    return model;
}
