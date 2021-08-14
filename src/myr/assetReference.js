import {texture} from "./textureReference";
import {model} from "./modelReference";

const asset = { 
    texture: texture,
    model: model,
};

export default function r(ref=asset) {
    return ref;
}