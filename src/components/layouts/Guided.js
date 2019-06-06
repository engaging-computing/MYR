import React from 'react';
import Editor from '../Editor';
import Header from '../Header';
import Footer from '../Footer';
import Course from '../Course';
import View from '../View';

import * as layoutTypes from '../../constants/LayoutTypes.js';

export const Guided = ({ editor, user, scene, editorActions, authActions, projectActions, projects, courseActions, courses, course, match, sceneActions }) => (
    <div className="App">
        <Header
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
        />
        <div className="row no-gutters">
            <div id="interface" className="col-12 col-md-4">
                <Course lesson={courses.currentLesson} courses={courses} course={course} courseName={match.params.shortname} actions={editorActions} courseActions={courseActions} />
                <div className='guided'>
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

export default Guided;