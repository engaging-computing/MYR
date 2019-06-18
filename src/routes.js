import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Ide from './containers/Ide';
import Guided from './containers/Guided';
import Classroom from './containers/Classroom';
import Reference from './containers/Reference';
import ReferenceExample from './containers/ReferenceExample';

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.postpone(()=> {
      this.setState({ loading: false })
    })
  }

  componentWillUnmount() {
    this.postpone(() => {
      this.setState({ loading: true })
    })
  }

  postpone(f) {
    window.setTimeout(f, 0);
  }

  render() {
    if (this.state.loading) {
      return (
        <span className='spinner'>
          <div className='cube1'></div>
          <div className='cube2'></div>
        </span>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Ide} />
          <Route exact path='/reference' component={Reference} />
          <Route path='/course/:shortname' component={Guided} />
          <Route path='/class/:classroom' component={Classroom} />
          <Route path='/reference/:function' component={ReferenceExample} />
          <Route path='/:id' component={Ide} />
          <Redirect from="/lesson" exact to="/" />
          <Redirect from="/course" exact to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
