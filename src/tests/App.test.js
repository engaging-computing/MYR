import React from 'react';
import store from '../store';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import IDE from '../containers/Ide';
import Header from '../components/Header';
import Reference from '../components/Reference';
import View from '../components/View';
import Editor from '../components/Editor';
import Sidebar from '../components/Sidebar';

import user from '../reducers/user';
import scene from '../reducers/scene';
import editor from '../reducers/editor';

import {
  refresh, EDITOR_REFRESH,
  render, EDITOR_RENDER,
  recover, EDITOR_RECOVER
} from '../actions/editorActions';

import {
  login, LOGIN,
  logout, LOGOUT
} from '../actions/authActions';

import {
  nameScene, NAME_SCENE,
  loadScene, LOAD_SCENE
} from '../actions/sceneActions';

configure({ adapter: new Adapter() });

describe('Header Component', () => {
  it('Header renders without crashing', () => {
    shallow(
      <Header
        logging={{ login: () => { }, logout: () => { } }}
        sceneActions={{ nameScene: () => { }, loadScene: () => { } }}
        actions={{ render: () => { }, refresh: () => { } }}
        user={null}
        scene={{
          name: "",
          id: "0",
          sceneConfig: {
            skyColor: "white",
            camConfig: 0
          }
        }}
        text=""
        message={{ text: "", time: 123 }}
        projectId={"GO9g0o5rwFc9fKR6I3ifvXjlmHM2_1527191123705"} />
      , { context: { store } });
  });
});

describe('Editor Component', () => {
  it('Editor renders without crashing', () => {
    shallow(<Editor />, { context: { store } });
  });
});

describe('Reference Component', () => {
  it('Reference renders without crashing', () => {
    shallow(<Reference />);
  });
});

describe('Sidebar Component', () => {
  it('Terminal renders without crashing', () => {
    shallow(<Sidebar />);
  });
});

describe('View Component', () => {
  let sceneConfig = {
    skyColor: 'white'
  };

  it('View renders without crashing', () => {
    shallow(<View sceneConfig={sceneConfig} />);
  });

});

describe('IDE Component', () => {
  it('View renders without crashing', () => {
    render(
      <IDE
        text=""
        objects={[]}
        assets={[]}
        user={{ name: "Test" }}
        scene={{
          name: "",
          id: "0",
          sceneConfig: {
            skyColor: "white",
            camConfig: 0
          }
        }}
        errors="" />,
      { context: { store } });
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

  // This needs to be tested more in depth
  it('should return a RECOVER action', () => {
    let x = recover();
    expect(x.type).toEqual(EDITOR_RECOVER);
  });
});

describe('Auth Actions', () => {
  it('should return a LOGIN action', () => {
    let user = { name: 'test', uid: '1' };
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

describe('User Reducer', () => {
  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(
      {
        user: null
      }
    );
  });

  it('should handle LOGIN', () => {
    let testUser = { name: "user" };
    expect(
      user(undefined, {
        type: LOGIN,
        user: testUser
      })
    ).toEqual(
      {
        user: testUser
      }
    );
  });

  it('should handle LOGOUT', () => {
    expect(
      user(undefined, {
        type: LOGOUT,
      })
    ).toEqual({
      user: null
    }
    );
  });
});

describe('Scene Reducer', () => {
  it('should return the initial state', () => {
    expect(scene(undefined, {})).toEqual(
      {
        camConfig: 0,
        cameraPosition: "0 1.6 0",
        id: "0",
        name: "",
        showCoordHelper: true,
        skyColor: "white",
        viewOnly: false
      }
    );
  });

  it('should NAME_SCENE', () => {
    expect(
      scene(undefined, { type: NAME_SCENE, name: "Test" }).name)
      .toEqual("Test");
  });

  it('should LOAD_SCENE', () => {
    expect(
      scene(undefined, { type: LOAD_SCENE, id: "1" }).id)
      .toEqual("1");
  });
});

describe('Editor Reducer', () => {
  const initial_state = {
    text: "sphere()",
    objects: [],
    assets: [],
    errors: "Everything Looks Good"
  };
  
  it('should return the initial state', () => {
    expect(
      editor(initial_state, {}))
      .toEqual(
        {
          text: "sphere()",
          objects: [],
          assets: [],
          errors: "Everything Looks Good"
        }
      );
  });

  // This is a bit ugly but most of MYR is tested in separate tests
  it('should RENDER', () => {
    expect(
      editor(initial_state,
        {
          type: EDITOR_RENDER,
          text: "sphere();"
        }).text)
      .toEqual("sphere();");
  });
  it('should be a bad RENDER', () => {
    expect(
      editor(initial_state,
        {
          type: EDITOR_RENDER,
          text: "s\nERROR"
        }).message.text)
      .toEqual("Eval failed: ReferenceError: s is not defined");
  });
  it('should REFRESH', () => {
    expect(
      editor(initial_state,
        {
          type: EDITOR_REFRESH,
          text: ""
        }).text)
      .toEqual("");
  });
  it('should RECOVER', () => {
    expect(
      editor(initial_state, {
        type: EDITOR_RECOVER
      }).text)
      .toEqual("sphere();");
  });
});