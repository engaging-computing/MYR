import React from 'react';
import Editor from '../Editor';
import Footer from '../Footer';
import Header from '../Header';
import View from '../View';

import * as layoutTypes from '../../constants/LayoutTypes.js';

class Ide extends React.Component {
    render() {
        let editorClass;
        if(this.props.scene.settings.viewOnly)
            editorClass = "col-0";
        else
            editorClass = "col-12 col-md-4"
        return (
            <div className="App">
                <Header
                    viewOnly = {this.props.scene.settings.viewOnly}
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
                    <div id="interface" className={editorClass} >
                        <Editor refresh = {this.props.editorActions.refresh} text={this.props.editor.text} user={this.props.user} sendEditorDataOnUnmount = {this.recieveEditorDataOnUnmount} sendTextOnUnmount = {this.recieveTextOnUnmount}/>
                    </div>
                    {
                        this.props.scene.settings.viewOnly
                            ?
                                <div id="scene" className="col-12" >
                                    <View objects = {this.props.editor.objects} sceneConfig={this.props.scene} assets={this.props.editor.assets} />
                                </div>
                            :
                            <>
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