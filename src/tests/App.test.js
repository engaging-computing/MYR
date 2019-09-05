import React from "react";
import store from "../reducers/index";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import * as Actions from "../actions/";
import * as layoutTypes from "../constants/LayoutTypes";
import * as types from "../constants/ActionTypes";

import IDE from "../containers/Ide";
import Header from "../components/structural/header/Header";
import Reference from "../components/reference/Reference";
import View from "../components/structural/View";
import Editor from "../components/editor/Editor";
import Sidebar from "../components/structural/header/Sidebar";
import SceneConfig from "../components/structural/header/SceneConfigMenu";
import Footer from "../components/structural/Footer";
import MyrTour from "../components/structural/header/MyrTour";

import user from "../reducers/user";
import scene from "../reducers/scene";
import editor from "../reducers/editor";


const generateMockProps = () => {
    return {
        logging: {
            login: jest.fn(),
            logout: jest.fn(),
        },
        sceneActions: {
            nameScene: jest.fn(),
            loadScene: jest.fn(),
            toggleCoordSky: jest.fn(),
            changeSkyColor: jest.fn(),
            changeFloorColor: jest.fn(),
            changeCamMode: jest.fn(),
            setCamera: jest.fn(),
            changePerspective: jest.fn(),
            changeView: jest.fn(),
            toggleFly: jest.fn(),
            toggleFloor: jest.fn(),
            loadSettings: jest.fn(),
            changeSetting: jest.fn(),
            addcollectionID: jest.fn(),
            setDesc: jest.fn(),
            setNameDes: jest.fn(),
        },
        actions: {
            render: jest.fn(),
            refresh: jest.fn(),
            recover: jest.fn(),
            fetchScene: jest.fn(),
            addPasswor: jest.fn(),
        },
        user: null,
        scene: {
            name: "",
            id: 0,
            desc: "",
            ts: 0,
            uid: -1,
            settings: {
                skyColor: "white",
                floorColor: "#222",
                camConfig: 0,
                showCoordHelper: false,
                canFly: false,
                showFloor: true,
                cameraPosition: "0 1.6 3",
                viewOnly: false,
                collectionID: ""
            },
        },
        projectActions: {
            asyncUserProj: jest.fn(),
            syncUserProj: jest.fn(),
            asyncExampleProj: jest.fn(),
            syncExampleProj: jest.fn(),
            deletePro: jest.fn(),
        },
        courseActions: {
            fetchCourses: jest.fn(),
            syncCourses: jest.fn(),
            nextLesson: jest.fn(),
            previousLesson: jest.fn(),
            fetchCourse: jest.fn(),
            setCurrentIndex: jest.fn(),
            loadLesson: jest.fn(),
            fetchLesson: jest.fn(),
            loadCours: jest.fn(),
        },
        projects: {
            userProjs: [],
            exampleProjs: [],
        },
        courses: {
            courses: [],
            course: {},
            currentIndex: 0,
            currentLesson: {
                name: "Loading....",
                id: -1,
                prompt: "Please wait",
                code: "// Loading"
            }
        },
        collectionActions: {
            asyncCollection: jest.fn(),
            asyncCollections: jest.fn(),
            deleteCollection: jest.fn(),
            syncClass: jest.fn(),
            syncClasse: jest.fn(),
        },
        collections: {
            collections: [],
            collection: []
        },
        layoutType: layoutTypes.IDE,
    };
};

configure({ adapter: new Adapter() });

describe("Header Component", () => {

    it("Header renders without crashing", () => {
        const mockProps = generateMockProps();
        const wrapper = shallow(<Header {...mockProps} />);
        expect(wrapper).toBeTruthy();
    });

});

describe("Editor Component", () => {
    it("should render editor", () => {
        const mockProps = generateMockProps();
        const wrapper = shallow(<Editor {...mockProps} />);
        expect(wrapper).toBeTruthy();
    });
});

describe("Footer", () => {
    it("Should render without crashing", () => {
        const mockProps = generateMockProps();
        const wrapper = shallow(<Footer {...mockProps} />);
        expect(wrapper).toBeTruthy();
    });
});

describe("MyrTour", () => {
    it("Should render without crashing", () => {
        const mockProps = generateMockProps();
        const wrapper = shallow(<MyrTour {...mockProps} />);
        expect(wrapper).toBeTruthy();
    });
});

describe("Reference Component", () => {
    it("Reference renders without crashing", () => {
        const wrapper = shallow(<Reference />);
        expect(wrapper).toBeTruthy();
    });
});

describe("SceneConfig Component", () => {
    const sceneActions = {
        changeView: () => { },
        toggleCoordSky: () => { },
        setCamera: () => { }
    };
    it("SceneConfig renders without crashing", () => {
        shallow(<SceneConfig sceneActions={sceneActions} scene={{ viewOnly: true }} />);
    });
    it("SceneConfig renders without crashing", () => {
        shallow(<SceneConfig sceneActions={sceneActions} scene={{ viewOnly: false }} />);
    });
});

describe("Sidebar Component", () => {
    it("Terminal renders without crashing", () => {
        shallow(<Sidebar />);
    });
});

describe("View Component", () => {
    const generateMockProps = () => {
        return {
            objects: [{
                id: "1",
                position: { x: 1, y: 2, z: 3 },
                scale: { x: 1, y: 2, z: 3 },
                rotation: { x: 1, y: 2, z: 3 },
            }],
            sceneConfig: {
                settings: {
                    skyColor: "white",
                }
            }
        };
    };


    it("View renders without crashing", () => {
        shallow(<View {...generateMockProps()} />);
    });

});

describe("IDE Component", () => {
    it("View renders without crashing", () => {
        shallow(
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

describe("Editor Actions", () => {
    it("should return a REFRESH action", () => {
        let x = Actions.EditorActions.refresh("");
        expect(x.type).toEqual(types.EDITOR_REFRESH);
    });
    it("should return a RENDER action", () => {
        let x = Actions.EditorActions.render("test");
        expect(x.type).toEqual(types.EDITOR_RENDER);
    });

    it("should return a RECOVER action", () => {
        let x = Actions.EditorActions.recover();
        expect(x.type).toEqual(types.EDITOR_RECOVER);
    });
});

describe("Auth Actions", () => {
    it("should return a LOGIN action", () => {
        let user = { name: "test", uid: "1" };
        let x = Actions.AuthActions.login(user);
        expect(x.type).toEqual(types.LOGIN);
    });
    it("should return a LOGOUT action", () => {
        let x = Actions.AuthActions.logout();
        expect(x.type).toEqual(types.LOGOUT);
    });
});

describe("Scene Actions", () => {
    it("should return a Refresh action", () => {
        let x = Actions.SceneActions.nameScene("test");
        expect(x.type).toEqual(types.NAME_SCENE);
    });
    it("should return a Refresh action", () => {
        let x = Actions.SceneActions.loadScene("test");
        expect(x.type).toEqual(types.LOAD_SCENE);
    });
});

describe("User Reducer", () => {
    it("should return the initial state", () => {
        expect(user(undefined, {})).toEqual(
            {
                user: null
            }
        );
    });

    it("should handle LOGIN", () => {
        let testUser = { name: "user" };
        expect(
            user(undefined, {
                type: types.LOGIN,
                user: testUser
            })
        ).toEqual(
            {
                user: testUser
            }
        );
    });

    it("should handle LOGOUT", () => {
        expect(
            user(undefined, {
                type: types.LOGOUT,
            })
        ).toEqual({
            user: null
        }
        );
    });
});

describe("Scene Reducer", () => {
    const creatDefaultScene = () => {
        return {
            name: "",
            id: 0,
            desc: "",
            ts: 0,
            uid: -1,
            settings: {
                skyColor: "white",
                floorColor: "#222",
                camConfig: 0,
                showCoordHelper: false,
                canFly: false,
                showFloor: true,
                cameraPosition: "0 1.6 3",
                viewOnly: false,
                collectionID: ""
            }
        };
    };


    it("should return the initial state", () => {
        expect(scene(undefined, {})).toEqual(creatDefaultScene());
    });

    it("should NAME_SCENE", () => {
        expect(
            scene(undefined, { type: types.NAME_SCENE, name: "Test" }).name)
            .toEqual("Test");
    });

    it("should LOAD_SCENE", () => {
        let testObj = creatDefaultScene();
        testObj.id = 1;
        expect(
            scene(undefined, { type: types.LOAD_SCENE, data: testObj }))
            .toEqual(testObj);
    });
});

describe("Editor Reducer", () => {
    const initial_state = {
        text: "sphere()",
        objects: [],
        assets: [],
        errors: "Everything Looks Good"
    };

    it("should return the initial state", () => {
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
    it("should RENDER", () => {
        expect(
            editor(initial_state,
                {
                    type: types.EDITOR_RENDER,
                    text: "sphere();"
                }).text)
            .toEqual("sphere();");
    });
    it("should be a bad RENDER", () => {
        expect(
            editor(initial_state,
                {
                    type: types.EDITOR_RENDER,
                    text: "s\nERROR"
                }).message.text)
            .toEqual("Eval failed: ReferenceError: s is not defined");
    });
    it("should REFRESH", () => {
        expect(
            editor(initial_state,
                {
                    type: types.EDITOR_REFRESH,
                    text: ""
                }).text)
            .toEqual("");
    });
    it("should RECOVER", () => {
        expect(
            editor(initial_state, {
                type: types.EDITOR_RECOVER
            }).text)
            .toEqual("sphere();");
    });
});
