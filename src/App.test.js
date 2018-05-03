import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './containers/App';
import Header from './components/Header';
import Reference from './components/Reference';
import Terminal from './components/Terminal';
import View from './components/View';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  it('App without crashing', () => {
    const store = createStore(reducer);
    shallow(<App />, { context: { store } });
  });
});


describe('Header Component', () => {
  it('Header renders without crashing', () => {
    shallow(<Header />);
  });
});

describe('Reference Component', () => {
  it('Reference renders without crashing', () => {
    shallow(<Reference />);
  });
});

describe('Terminal Component', () => {
  it('Terminal renders without crashing', () => {
    shallow(<Terminal />);
  });
});

describe('View Component', () => {
  it('View renders without crashing', () => {
    shallow(<View />);
  });
});
