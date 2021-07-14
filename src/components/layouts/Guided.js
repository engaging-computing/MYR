import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import Course from "../courses/Course";
import View from "../structural/View";

import * as layoutTypes from "../../constants/LayoutTypes.js";

/**
 * Create a layout for course page.
 * @param {object} param0 List of props that will be use in components
 * @returns {HTMLElement} Layout of the course page 
 */
export const Guided = ({ editor, user, scene, editorActions, authActions, projectActions, projects, courseActions, courses, course, match, sceneActions, collectionActions, collections }) => (
    <div className="App">
        <Header
            viewOnly={scene.settings.viewOnly}
            logging={authActions}
            sceneActions={sceneActions}
            actions={editorActions}
            user={user}
            scene={scene}
            text={editor.text}
            message={editor.message}
            match={match}
            projectId={match.params.id}
            projectActions={projectActions}
            projects={projects}
            courseActions={courseActions}
            courses={courses}
            course={course}
            courseName={match.params.shortname}
            layoutType={layoutTypes.GUIDED}
            collectionActions={collectionActions}
            collections={collections}
        />
        <div className="row no-gutters">
            {
                scene.settings.viewOnly
                    ?
                    <div id="scene" className="col-12">
                        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
                    </div>
                    :
                    <>
                        <div id="interface" className="col-12 col-md-4">
                            <Course lesson={courses.currentLesson} courses={courses} course={course} courseName={match.params.shortname} actions={editorActions} courseActions={courseActions} savedText={editor.savedText}/>
                            <div className='guided'>
                                <Editor refresh={editorActions.refresh} render={editorActions.render} text={editor.text} user={user} savedText={editor.savedText} />
                            </div>
                        </div>
                        <div id="scene" className="col-12 col-md-8">
                            <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
                        </div>
                    </>
            }
        </div>
        <Footer />
    </div>
);

export default Guided;