import AFRAME from "aframe";

export const browserType = () => {
    const device = AFRAME.utils.device;

    if(device.isMobile()) {
        return "mobile";
    }else if(device.getVRDisplay() && device.getVRDisplay().length >= 0) {
        return "vr";
    }
    return "desktop";
};
