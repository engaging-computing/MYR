import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import editor from "./editor";
import project from "./project";
import scene from "./scene";
import user from "./user";
import courses from "./course";
import collections from "./collections";
import referenceExample from "./referenceExample";

import thunk from "redux-thunk";

/**
 * @summary This combines all the reducers into a single reducer so it can pass it into store
 */
const reducer = combineReducers({
    editor,
    user,
    scene,
    project,
    courses,
    collections,
    referenceExample
});

/**
 * @summary Add third parties library along with the redux compose so it can use with other middleware and enhancers
 *              Redux devtools extension shows history of the changes to the redux store overtime when debugging.
 */
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

/**
 * @summary Create a store with the combined reducers and enhancers
 */
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
