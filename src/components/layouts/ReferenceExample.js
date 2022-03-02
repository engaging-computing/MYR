import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import View from "../structural/View";
import RefExInfo from "../reference/RefExInfo";

import * as layoutTypes from "../../constants/LayoutTypes.js";

import "../../css/ReferencePage.css";

/**
 * Create a layout for example scene page
 * @param {object} param0 List of props that will be use in components
 * @returns {HTMLElement} Layout for example scene page
 */
export const ReferenceExample = ({ editor, user, scene, referenceExample, referenceExampleActions, editorActions, authActions, projectActions, projects, courseActions, courses, match, sceneActions, collectionActions, collections }) => (
    <div className="App">
        <Header
            logging={authActions}
            sceneActions={sceneActions}
            actions={editorActions}
            user={user}
            scene={scene}
            text={editor.text}
            message={editor.message}
            projectId={match.params.id}
            match={match}
            projectActions={projectActions}
            courseActions={courseActions}
            projects={projects}
            courses={courses}
            collectionActions={collectionActions}
            collections={collections}
            refExName={match.params.function}
            referenceExampleActions={referenceExampleActions}
            layoutType={layoutTypes.REF_EXAMPLE}
        />
        <div className="row no-gutters">
            {
                scene.settings.viewOnly
                    ?
                    <div id="scene" className="col-12" >
                        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
                    </div>
                    :
                    <>
                        <div id="interface" className="col-12 col-md-4">
                            <RefExInfo referenceExample={referenceExample} />
                            <div className='ref-ex-edit'>
                                <Editor refresh={editorActions.refresh} render={editorActions.render} text={editor.text} user={user} />
                            </div>
                        </div>
                        <div id="scene" className="col-12 col-md-8" >
                            <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
                        </div>
                    </>
            }
        </div>
        <Footer />
    </div>
);

export default ReferenceExample;