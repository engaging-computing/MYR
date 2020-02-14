import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./utils/AframeReg";
import "./utils/AframeRegGeo";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";

import store from "./reducers/index";

import AppRoutes from "./routes";

ReactDOM.render(
    <Provider store={store}>
        <AppRoutes />
    </Provider>,
    document.getElementById("root"));
