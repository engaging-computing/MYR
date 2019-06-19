import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import editor from "./editor";
import project from "./project";
import scene from "./scene";
import user from "./user";
import courses from "./course";
import classrooms from "./classes";
import referenceExample from "./referenceExample";

import thunk from "redux-thunk";

const reducer = combineReducers({
    editor,
    user,
    scene,
    project,
    courses,
    classrooms,
    referenceExample
});

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
