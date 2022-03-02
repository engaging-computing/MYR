import React from "react";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import ReferencePage from "../reference/ReferencePage";

import * as layoutTypes from "../../constants/LayoutTypes.js";

/**
 * Create a layout for reference page.
 * @param {object} param0 List of props that will be use in components
 * @returns {HTMLElement} Layout of the reference page 
 */
export const Reference = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, collectionActions, collections }) => (
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
            layoutType={layoutTypes.REFERENCE}
        />
        <div className="row no-gutters">
            <ReferencePage />
        </div>
        <Footer />
    </div>
);

export default Reference;