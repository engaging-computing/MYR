import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import View from "../structural/View";
import SelectProject from "../classroom/SelectProject.js";

import * as layoutTypes from "../../constants/LayoutTypes.js";

export const Classroom = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, classroomActions, classrooms }) => (
    <div className="App">
        <Header
            logging={authActions}
            sceneActions={sceneActions}
            actions={editorActions}
            user={user}
            scene={scene}
            text={editor.text}
            savedText={editor.savedText}
            message={editor.message}
            projectId={match.params.id}
            match={match}
            projectActions={projectActions}
            courseActions={courseActions}
            projects={projects}
            courses={courses}
            classroomActions={classroomActions}
            classrooms={classrooms}
            classroom={match.params.classroom}
            layoutType={layoutTypes.CLASSROOM}
            editorChange={editor.editorChange}
        />
        <div className="row no-gutters">
            <div id="interface" className="col-12 col-md-4">
                <SelectProject
                    selectedClassroom={match.params.classroom}
                    classroom={classrooms.classroom}
                    editorActions={editorActions}
                    user={user}
                    scene={scene}
                />
                <div className='classroom'>
                    <Editor text={editor.text} user={user} />
                </div>
            </div>
            <div id="scene" className="col-12 col-md-8">
                <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
            </div>
        </div>
        <Footer />
    </div>
);

export default Classroom;