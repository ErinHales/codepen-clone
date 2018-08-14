import React, { Component } from 'react';
// import CodeMirror from 'react-codemirror';
import JavaScript from './JS';
import HTML from './HTML';
import CSS from './CSS';
import "./Theme.css";
// import "./CodeEditor.css";
require('codemirror/lib/codemirror.css');

export default class CodeEditor extends Component {
    constructor() {
        super();

        this.state = {
            css:
`body {
    background-color: pink;
}
`,
            html:
`<h1>Hello World</h1>
`,
            js:
`function magic(fairyDust) {
    return "I can fly. Also, I do believe in fairies";
}
`
        }
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
        return (
            <div>
                <div className="editorHead">
                    <div class="section">
                        <div className="divider"></div>
                        <div>
                            <button></button>
                            <h3>HTML</h3>
                        </div>
                    </div>
                    <div class="section">
                        <div className="divider"></div>
                        <div>
                            <button></button>
                            <h3>CSS</h3>
                        </div>
                    </div>
                    <div class="section">
                        <div className="divider"></div>
                        <div>
                            <button></button>
                            <h3>JS</h3>
                        </div>
                    </div>
                </div>
                <div className="editor">
                    <HTML updateHTML={this.updateHTML} html={this.state.html} />
                    <CSS updateCSS={this.updateCSS} css={this.state.css} />
                    <JavaScript updateJS={this.updateJS} js={this.state.js} />
                </div>
                <iframe class="penFrame" srcDoc={srcdoc} frameBorder="0" title="showPen"></iframe>
            </div>
        )
    }
}