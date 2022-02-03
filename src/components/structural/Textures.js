/**
 * List of textures' name and url for retrieval
 */
const TexturePack = [
    {title:"bricks",url:"/img/textures/bricks.jpg"},
    {title:"bark",url:"/img/textures/bark.jpg"},
    {title:"checkerboard",url:"/img/textures/checkerboard.jpg"},
    {title:"chevron",url:"/img/textures/chevron.jpg"},
    {title:"cobblestone",url:"/img/textures/cobblestone.jpg"},
    {title:"dirt",url:"/img/textures/dirt.jpg"},
    {title:"duck",url:"/img/textures/duck.jpg"},
    {title:"fabric",url:"/img/textures/fabric.jpg"},
    {title:"grass",url:"/img/textures/grass.jpg"},
    {title:"lava",url:"/img/textures/lava.jpg"},
    {title:"leaves",url:"/img/textures/leaves.jpg"},
    {title:"marble",url:"/img/textures/marble.jpg"},
    {title:"metal",url:"/img/textures/metal.jpg"},
    {title:"paint",url:"/img/textures/paint.jpg"},
    {title:"rug",url:"/img/textures/rug.jpg"},
    {title:"sand",url:"/img/textures/sand.jpg"},
    {title:"stone",url:"/img/textures/stone.jpg"},
    {title:"water",url:"/img/textures/water.jpg"},
    {title:"wood",url:"/img/textures/wood.jpg"}
];

const texture = {
    TexturePack: TexturePack,
};

export default function t(tex = texture) {
    return tex;
}
