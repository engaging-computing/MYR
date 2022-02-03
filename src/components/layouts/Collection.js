import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import View from "../structural/View";
import SelectProject from "../collection/SelectProject.js";

import * as layoutTypes from "../../constants/LayoutTypes.js";

/**
 * Create a layout for collection page.
 * @param {object} param0 List of props that will be use in components
 * @returns {HTMLElement} Layout of the collection page 
 */
export const Collection = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, collectionActions, collections }) => (
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
            collection={match.params.collection}
            layoutType={layoutTypes.COLLECTION}
        />
        <div className="row no-gutters">
            <div id="interface" className="col-12 col-md-4">
                <SelectProject
                    selectedCollection={match.params.collection}
                    collection={collections.collection}
                    editorActions={editorActions}
                    user={user}
                    scene={scene}
                    savedText={editor.savedText} 
                />
                <div className='collection'>
                    <Editor text={editor.text} user={user} savedText={editor.savedText} />
                </div>
            </div>
            <div id="scene" className="col-12 col-md-8">
                <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
            </div>
        </div>
        <Footer />
    </div>
);

export default Collection;