/**
 * List of model reference
 */
const model = [
    {
        name: "sword",
        model: "sword",
        //example: "sword",
    }, 
    {
        name: "fish",
        model: "fish",
        //example: "fish",
    },    
    {
        name: "milkTruck",
        model: "milkTruck",
        //example: "milkTruck",
    },    
    {
        name: "fox",
        model: "fox",
        //example: "fox",
    },
    {
        name: "lantern",
        model: "lantern",
        //example: "lantern",
    },
    {
        name: "fabricChair",
        model: "fabricChair",
        //example: "fabricChair",
    },
    {
        name: "duck",
        model: "duck",
        //example: "duck",
    },
];
 
const modelReference = {
    model: model,
};

export default function r(ref = modelReference) {
    return ref;
}
