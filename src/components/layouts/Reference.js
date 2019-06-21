import React from "react";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import ReferencePage from "../reference/ReferencePage";

import * as layoutTypes from "../../constants/LayoutTypes.js";

export const Reference = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, classroomActions, classrooms }) => (
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
            classroomActions={classroomActions}
            classrooms={classrooms}
            layoutType={layoutTypes.REFERENCE}
        />
        <div className="row no-gutters">
            <ReferencePage />
        </div>
        <Footer />
    </div>
);

export default Reference;