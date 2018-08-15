import React, { Component } from 'react';
// import CodeMirror from 'react-codemirror';
import JavaScript from './JS';
import HTML from './HTML';
import CSS from './CSS';
import "./Theme.css";
import axios from 'axios';
require('codemirror/lib/codemirror.css');

// import "./CodeEditor.css";



export default class CodeEditor extends Component {
    constructor() {
        super();

        this.state = {
            name: "name of pen",
            css: 'body {\n\tbackground-color: pink;\n}',
            html: '<h1>Hello World</h1>',
            js: 'function magic(fairyDust) {\n\treturn "I can fly. Also, I do believe in fairies";\n}'
        }
    }

    componentDidMount() {
        axios.get('/api/pen/7').then(response => {
            this.setState({
                css: response.data.css,
                html: response.data.html,
                js: response.data.js,
                name: response.data.name
            })
        })
        
    }

    postPen = () => {
        // const { user_id, name, forked, html, css, js, scripts } = req.body
        // add user_id in the backend once we set up sessions
        let {name, css, html, js} = this.state;
        let scripts = {
            html:{
                html_tag_class: "test\n\t testttttsss", 
                head_tag: "test\n\t testttttsss"
            },
            css: ["asdfasdf"],
            js: ["asdfasdf","adqwerpsadf"]
        }
        let bodyObj = {user_id: 3, name, forked: false, html, css, js, scripts};
        axios.post('/api/pen/', bodyObj).catch(err => console.log(err));
    }

    updateCSS = (newCode) => {
        this.setState({
            css: newCode
        })
    }

    updateJS = (newCode) => {
        this.setState({
            js: newCode
        })
    }

    updateHTML = (newCode) => {
        this.setState({
            html: newCode
        })
    }

    render() {
        let srcdoc = `${this.state.html}<style>${this.state.css}</style><script>${this.state.js}</script>`;
        console.log(this.state.html);
        return (
            <div className="codeEditor">
                <div className="editorHead">
                <section className="editorSection">
                    <div>
                        <button><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings"/></button>
                        <h3>HTML</h3>
                    </div>
                    <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                </section>
                <section className="editorSection">
                    <div>
                        <button><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings"/></button>
                        <h3>CSS</h3>
                    </div>
                    <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                </section>
                <section className="editorSection">
                    <div>
                        <button><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings"/></button>
                        <h3>JS</h3>
                    </div>
                    <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                </section>
                </div>
                <div className="editor">
                    <HTML updateHTML={this.updateHTML} html={this.state.html} />
                    <CSS updateCSS={this.updateCSS} css={this.state.css} />
                    <JavaScript updateJS={this.updateJS} js={this.state.js} />
                </div>
                <div className="verticalResize"></div>
                <iframe className="penFrame" srcDoc={srcdoc} frameBorder="0" title="showPen"></iframe>
                <div className="penFooter">
                    <button>Console</button>
                    <button onClick={() => this.postPen()}>Save</button>
                    <button className="delete">Delete</button>
                </div>
            </div>
        )
    }
}