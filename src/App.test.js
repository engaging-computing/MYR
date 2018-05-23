import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './containers/App';
import IDE from './containers/Ide';
import Viewer from './containers/Viewer';
import Header from './components/Header';
import Reference from './components/Reference';
import Terminal from './components/Terminal';
import View from './components/View';

import { refresh, render, EDITOR_RENDER, EDITOR_REFRESH } from './actions/editorActions';
import { login, LOGIN, logout, LOGOUT } from './actions/authActions';
import { nameScene, NAME_SCENE, loadScene, LOAD_SCENE } from './actions/sceneActions';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  it('App without crashing', () => {
    const store = createStore(reducer);
    shallow(<App />, { context: { store } });
  });
});


describe('Header Component', () => {
  it('Header renders without crashing', () => {
    const store = createStore(reducer);
    shallow(<App><Header /></App>, { context: { store } });
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

describe('IDE Component', () => {
  it('View renders without crashing', () => {
    const store = createStore(reducer);
    shallow(<App><IDE /></App>, { context: { store } });
  });
});

describe('Viewer Component', () => {
  it('View renders without crashing', () => {
    const store = createStore(reducer);
    shallow(<App><Viewer /></App>, { context: { store } });
  });
});

describe('Editor Actions', () => {
  it('should return a REFRESH action', () => {
    let x = refresh("");
    expect(x.type).toEqual(EDITOR_REFRESH);
  });
  it('should return a RENDER action', () => {
    let x = render("test");
    expect(x.type).toEqual(EDITOR_RENDER);
    expect(x.text).toEqual("test");
  });
});

describe('Auth Actions', () => {
  it('should return a LOGIN action', () => {
    let user = {name: 'test', uid: '1'};
    let x = login(user);
    expect(x.type).toEqual(LOGIN);
    expect(x.user.name).toEqual('test');
    expect(x.user.uid).toEqual('1');
  });
  it('should return a LOGOUT action', () => {
    let x = logout();
    expect(x.type).toEqual(LOGOUT);
  });
});

describe('Scene Actions', () => {
  it('should return a Refresh action', () => {
    let x = nameScene('test');
    expect(x.type).toEqual(NAME_SCENE);
    expect(x.name).toEqual('test');
  });
  it('should return a Refresh action', () => {
    let x = loadScene('test');
    expect(x.type).toEqual(LOAD_SCENE);
    expect(x.id).toEqual('test');
  });
});

