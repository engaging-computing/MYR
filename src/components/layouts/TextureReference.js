import React from "react";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import TextureReferencePage from "../reference/TextureReferencePage";

import * as layoutTypes from "../../constants/LayoutTypes.js";

export const TextureReference = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, collectionActions, collections }) => (
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
            layoutType={layoutTypes.TEXTURE_REFERENCE}
        />
        <div className="row no-gutters">
            <TextureReferencePage />
        </div>
        <Footer />
    </div>
);

export default TextureReference;