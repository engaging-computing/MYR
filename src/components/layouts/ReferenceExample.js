import React from 'react';
import Editor from '../Editor';
import Header from '../Header';
import Footer from '../Footer';
import ReferenceExampleBox from '../ReferenceExampleBox';
import View from '../View';

import * as layoutTypes from '../../constants/LayoutTypes.js';

import '../../css/ReferencePage.css';

export const ReferenceExample = ({ editor, user, scene, referenceExample, referenceExampleActions, editorActions, authActions, projectActions, projects, courseActions, courses, match, sceneActions, classroomActions, classrooms }) => (
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
            refExName={match.params.function}
            referenceExampleActions={referenceExampleActions}
            layoutType={layoutTypes.REF_EXAMPLE}
        />
        <div className="row no-gutters">
            <div id="interface" className="col-12 col-md-4">
                <ReferenceExampleBox referenceExample={referenceExample} />
                <div className='ref-ex-edit'>
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

export default ReferenceExample;