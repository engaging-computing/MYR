import { getDevice } from "ua-parser-js";

const MOBILE_TYPES = [
    "mobile",
    "tablet",
    "wearable"
];

const isMobile = () => { 
    let device = getDevice();
    if(MOBILE_TYPES.find(device) !== undefined) {
        return true;
    }
};

export default isMobile;