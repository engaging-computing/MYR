import CookieHandler from "../../utils/CookieHandler";
import React, { Component } from "react";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";

class AndroidNotification extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: this.isAndroid() && this.isChrome() 
        };
    }
    /**
     * @returns {boolean} true if the device is on AndroidOS and cookie is false
     */
    isAndroid = () => {
        let ua = navigator.userAgent.toLowerCase();
        return (ua.indexOf("android") > -1 && !CookieHandler.getCookie("hasSeenNotification"));
    }

    /**
     * @returns {boolean} true if browser being used is Google Chrome
     */
    isChrome = () => {
        let isChrome = window.chrome;
        let winNav = window.navigator;
        let vendorName = winNav.vendor;
        let isOpera = typeof window.opr !== "undefined";
        let IEedge = winNav.userAgent.indexOf("Edg") > -1;

        return (isChrome !== null && typeof isChrome !== "undefined" && vendorName === "Google Inc." 
        && isOpera === false && IEedge === false);
    }

    /**
     * @returns Creates alert for Chrome users on Android to switch browsers
     */
    render = ()=>(
        <>
            { this.state.isOpen ? 
                <Alert severity="warning" action={
                    <Button color="inherit" size="small" onClick={()=>{
                        this.setState({isOpen:false});
                        CookieHandler.neverAgainCookie("hasSeenNotification");
                    }}>
                    DON'T SHOW AGAIN
                    </Button> } >Chrome on Android may have unexpected behavior. We recommend you switch to Firefox for the full experience.</Alert> : null}     
        </>
    )
}

export default AndroidNotification;