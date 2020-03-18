import React from "react";
import Editor from "../editor/Editor";
import Header from "../structural/header/Header";
import Footer from "../structural/Footer";
import View from "../structural/View";
import Banner from "../structural/header/Banner";

import * as layoutTypes from "../../constants/LayoutTypes.js";

export const Ide = ({ editor, editorActions, user, authActions, scene, sceneActions, projectActions, courseActions, projects, courses, match, collectionActions, collections }) => (
    <div className="App">
        <Banner 
            messages={[
                {
                    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu nulla cursus, faucibus massa at, rhoncus purus. Maecenas sed vehicula dolor. Donec ac elit dolor. Sed tempus enim vitae magna ornare congue. Nunc vitae nibh quis sem nullam." ,
                    color: "yellow",
                    title: "Notice",
                    link: "https://learnmyr.org",
                    linkButtonText: "Changes", 
                    fontColor: "black"
                },
                {
                    message: "This is a completely different banner with text" ,
                    color: "blue",
                    title: "Alert",
                    link: "https://learnmyr.org", 
                    fontColor: "green"
                }
            ]}
        />
        <Header
            viewOnly={scene.settings.viewOnly}
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
            layoutType={layoutTypes.IDE}
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
                        <div id="interface" className="col-12 col-md-4" >
                            <Editor refresh={editorActions.refresh} render={editorActions.render} text={editor.text} user={user} savedText={editor.savedText} />/>
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
