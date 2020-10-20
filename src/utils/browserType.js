import { UAParser } from "ua-parser-js";

const MOBILE_TYPES = [
    "mobile",
    "tablet",
    "wearable"
];

export const browserType = () => {
    let parser = new UAParser();
    const device = parser.getDevice();

    if("xr" in navigator) {
        return "vr";
    }
    else if("getVRDisplays" in navigator && navigator.getVRDisplays().length > 0) {
        
        return "vr";
    }
    else if(MOBILE_TYPES.indexOf(device.type) === -1) {
        return "desktop";
    }
    else {
        return "mobile";
    }
};
