import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Ide from "./containers/Ide";
import Guided from "./containers/Guided";
import Collection from "./containers/Collection";
import Reference from "./containers/Reference";
import ReferenceExample from "./containers/ReferenceExample";

const router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Ide} />
                <Route exact path='/reference' component={Reference} />
                <Route path='/course/:shortname' component={Guided} />
                <Route path='/collection/:collection' component={Collection} />
                <Route path='/reference/:function' component={ReferenceExample} />
                <Route
                    path="/class/:className"
                    render={({ match }) => {
                        return <Redirect to={`/collection/${match.params.className}`} />;
                    }}
                />
                <Redirect from="/lesson" exact to="/" />
                <Redirect from="/course" exact to="/" />
                <Route path='/:id' component={Ide} />
            </Switch>
        </BrowserRouter>
    );
};

export default router;