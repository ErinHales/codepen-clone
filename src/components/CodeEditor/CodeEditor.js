import React, { Component } from 'react';
import JavaScript from './JS';
import HTML from './HTML';
import CSS from './CSS';
import "./Theme.css";
import axios from 'axios';
require('codemirror/lib/codemirror.css');


export default class CodeEditor extends Component {
    constructor() {
        super();

        this.state = {
            name: "name of pen",
            css: null,
            html: null,
            js: null
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillMount() {
        axios.get
        axios.get(`/api/pen/${this.props.match.params.id}`).then(response => {
            this.setState({
                css: response.data.css,
                html: response.data.html,
                js: response.data.js,
                name: response.data.name
            })
        })
    }

    savePen = () => {
        console.log("This is not set up yet");
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
                { this.state.html !== null ? <div className="editor">
                    <HTML updateHTML={this.updateHTML} html={this.state.html} />
                    <CSS updateCSS={this.updateCSS} css={this.state.css} />
                    <JavaScript updateJS={this.updateJS} js={this.state.js} />
                </div> : null }
                <div className="verticalResize"></div>
                <iframe className="penFrame" srcDoc={srcdoc} frameBorder="0" title="showPen"></iframe>
                <div className="penFooter">
                    <button>Console</button>
                    <button onClick={() => this.savePen()}>Save</button>
                    <button className="delete">Delete</button>
                </div>
            </div>
        )
    }
}