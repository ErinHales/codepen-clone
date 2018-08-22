import React, { Component } from 'react';
import JavaScript from './JS';
import HTML from './HTML';
import CSS from './CSS';
import "./Theme.css";
import axios from 'axios';
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login';
require('codemirror/lib/codemirror.css');


export default class CodeEditor extends Component {
    constructor() {
        super();

        this.state = {
            showPopUp: false,
            showSignUp: false,
            isLoggedIn: false,

            name: "name of pen",
            css:  '',
            html: '',
            js: '',
            userid: null
        }
    }

    componentWillMount() {
        axios.get('/api/users')
            .then(response => {
                if(response.data.username) {
                    this.setState({isLoggedIn: true})
                }
            })
        const { id } = this.props.match.params
            axios.get(`/api/pen/${id}`)
                .then(response => {
                    if(id) {
                        this.setState({
                            css: null,
                            html: null,
                            js: null
                        })
                    }
                    this.setState({
                        css: response.data.css,
                        html: response.data.html,
                        js: response.data.js,
                        name: response.data.name
                    })
                })
                .catch()
    
    }

    componentDidMount() {
        axios.put(`/api/pen/view/${this.props.match.params.id}/${this.state.userid}`).catch(console.error());
    }

    penData = () => {
        const {name, html, css, js} = this.state
        return {
            name,
            forked: false,
            html,
            css,
            js,
            scripts: {
                html: {
                    html_tag_class: '',
                    head_tag: ''
                },
                css: [],
                js: []
            }
        }
    }

    updatePen = () => {
        
        console.log("This is not set up yet");
    }

    savePen = () => {
        if(!this.state.isLoggedIn) {
            this.setState({showPopUp: true})
            return
        }
        const { id } = this.props.match.params
        if(id) {
            axios.put(`/api/pen/${id}`, this.penData())
        }
        else {
            axios.post('/api/pen/', this.penData())
            .then(response => {
                this.props.match.params.id = response.data[0].pen_id
            })
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
    closePopUp = (bool = false) => { 
        if(bool) {
            this.setState({
                showPopUp: false,
                isLoggedIn: true,
                showSignUp: false
            })
            this.savePen()
        }
        else {
            console.log('test')
            this.setState({showPopUp: false, showSignUp: false})
        }
    }
    popUpSwitch = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }
    deletePen = () => {
        axios.delete(`/api/pen/${this.props.match.params.id}`)
            .then()
            .catch(console.error)
    }

    render() {
        const popUp = (
            <div className="signup-popup">
            <div className="signup-popup-form-container">
                {this.state.showSignUp? 
                <SignUp closePopUp={this.closePopUp} />
                :
                <Login closePopUp={this.closePopUp} switch={this.popUpSwitch}/>
                }

            </div>
            <div onClick={() => this.closePopUp(false)} className="signup-popup-overlay"></div>
        </div>
        )

        let srcdoc = `${this.state.html}<style>${this.state.css}</style><script>${this.state.js}</script>`;
        return (
            <div className="codeEditor">
            {this.state.showPopUp ? popUp : null}
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
                    <button onClick={this.deletePen} className="delete">Delete</button>
                </div>
            </div>
        )
    }
}