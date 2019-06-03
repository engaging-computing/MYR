import React from 'react';
import Editor from '../Editor';
import Footer from '../Footer';
import Header from '../Header';
import View from '../View';

import * as layoutTypes from '../../constants/LayoutTypes.js';

class Ide extends React.Component {
    render() {
        return (
            <div className="App">
                <Header
                    viewOnly = {this.props.scene.settings.view}
                    logging={this.props.authActions}
                    sceneActions={this.props.sceneActions}
                    actions={this.props.editorActions}
                    user={this.props.user}
                    scene={this.props.scene}
                    text={this.props.editor.text}
                    message={this.props.editor.message}
                    projectId={this.props.match.params.id}
                    match={this.props.match}
                    projectActions={this.props.projectActions}
                    courseActions={this.props.courseActions}
                    projects={this.props.projects}
                    courses={this.props.courses}
                    classroomActions={this.props.classroomActions}
                    classrooms={this.props.classrooms}
                    layoutType={layoutTypes.IDE}
                />

                <div className="row no-gutters">
                    {
                        /*
                            Won't be able to save with this conditional rendering bc 
                            ace.edit('editor') wont be found when the editor is closed

                            1. Find way to save latest instance of editor before it unmounts
                            2. Don't allow saving while it is not rendered
                            3. 'Hide' editor in some way instead of unmounting it completely
                        */
                        this.props.scene.settings.viewOnly
                            ?
                                <div id="scene" className="col-12" >
                                    <View objects = {this.props.editor.objects} sceneConfig={this.props.scene} assets={this.props.editor.assets} />
                                </div>
                            :
                            <>
                                <div id="interface" className="col-12 col-md-4" >
                                    <Editor refresh = {this.props.editorActions.refresh} text={this.props.editor.text} user={this.props.user} sendEditorDataOnUnmount = {this.recieveEditorDataOnUnmount} sendTextOnUnmount = {this.recieveTextOnUnmount}/>
                                </div>
                                <div id="scene" className="col-12 col-md-8" >
                                    <View objects={this.props.editor.objects} sceneConfig={this.props.scene} assets={this.props.editor.assets} />
                                </div>
                            </>
                    }
                </div>
                <Footer />
             </div>
        );
    }
}

export default Ide;