import React from "react";
import "../../css/KeyboardShortcut.css";


//TODO - have better description
const general = [
    {
        shortcut: ["Ctrl", "S"],
        description: "Save scene"
    },
    {
        shortcut: ["Ctrl", "Shift", "S"],
        description: "Pop up save tab"
    },
    {
        shortcut: ["Ctrl", "Enter"],
        description: "Render scene"
    },
];

const editor = [
    {
        shortcut: ["Ctrl", "/"],
        description: "Comment current or selected line"
    },
    {
        shortcut: ["Alt", "Shift","/"],
        description: "Block comment selected line"
    },
    {
        shortcut: ["Alt/Option", "Up"],
        description: "Move code up"
    },
    {
        shortcut: ["Alt/Option", "Down"],
        description: "Move code down"
    },
    {
        shortcut: ["Alt", "D"],
        description: "Delete line of code"
    }
];

const scene = [
    {
        shortcut: ["W"],
        description: "Move forward"
    },
    {
        shortcut: ["A"],
        description: "Slide left"
    },
    {
        shortcut: ["S"],
        description: "Move backward"
    },
    {
        shortcut: ["D"],
        description: "Slide right"
    },
    {
        shortcut: ["Space"],
        description: "Move up"
    },
    {
        shortcut: ["Shift"],
        description: "Move down"
    },
];

//TODO - Add close button

class KeyboardShortcut extends React.Component {
    shortcutHelper = (data) => {
        let shortcuts = [];
        data.shortcut.forEach((key,i)=>{
            shortcuts.push(<kbd>{key}</kbd>);
            if(i < data.shortcut.length-1){
                shortcuts.push(" + ");
            }
        });
        return (<p>{shortcuts} {data.description}</p>);
    };
    render(){
        return(<div>
            <section className="right">
                <p className="title">General Command</p>
                { // create the entities
                    general.map(e => {return this.shortcutHelper(e);})
                }
            </section>
            <section className="right">
                <p className="title">Editor Command</p>
                { // create the entities
                    editor.map(e => {return this.shortcutHelper(e);})
                }
            </section>
            <section className="right">
                <p className="title">MYR Command</p>
                { // create the entities
                    scene.map(e => {return this.shortcutHelper(e);})
                }
            </section>
        </div>);
    }
}


export default KeyboardShortcut;