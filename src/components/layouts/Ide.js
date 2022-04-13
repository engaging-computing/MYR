import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import View from "../structural/View";
import Banner from "../structural/header/Banner";
import AndroidNotification from "../structural/AndroidNotification";

import * as layoutTypes from "../../constants/LayoutTypes.js";

/**
 * Create a Layout for main MYR page.
 * @param {object} param0 List of props that will be use in components
 * @returns {HTMLElement} Layout of the MYR page
 */
export const Ide = ({ editor, editorActions, user, usersettings, userActions, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, collectionActions, collections }) => (
    <div className="App">
        <Banner 
            endpoint="/apiv1/notifications"
            redirected={
                new URLSearchParams(window.location.search).get("redirected") === "true"
            }
        />
        <AndroidNotification/>
        <Header
            viewOnly={scene.settings.viewOnly}
            logging={authActions}
            sceneActions={sceneActions}
            actions={editorActions}
            user={user}
            settings={usersettings}
            userActions={userActions}
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
            layoutType={layoutTypes.IDE}
        />
        <div className="row g-0">
            {
                scene.settings.viewOnly
                    ?
                    <div id="scene" className="col-12" >
                        <View objects={editor.objects} sceneConfig={scene} assets={editor.assets} />
                    </div>
                    :
                    <>
                        <div id="interface" className="col-12 col-md-4" >
                            <Editor refresh={editorActions.refresh} render={editorActions.render} text={editor.text} user={user} settings={usersettings} savedText={editor.savedText} userActions={userActions} />
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

export default Ide;
