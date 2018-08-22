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
            userid: null,
            theme: "abcdef"
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

    updateTheme = (e) => {
        this.setState({
            theme: e.target.value
        })
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
            <select className="themeSelector" onChange={(e) => this.updateTheme(e)}>
                <option value="abcdef">abcdef</option>
                <option value="ambiance">ambiance</option>
                <option value="base16-dark">base16-dark</option>
                <option value="bespin">bespin</option>
                <option value="blackboard">blackboard</option>
                <option value="cobalt">cobalt</option>
                <option value="colorforth">colorforth</option>
                <option value="dracula">dracula</option>
                <option value="duotone-dark">duotone-dark</option>
                <option value="erlang-dark">erlang-dark</option>
                <option value="gruvbox-dark">gruvbox-dark</option>
                <option value="hopscotch">hopscotch</option>
                <option value="isotope">isotope</option>
                <option value="lesser-dark">lesser-dark</option>
                <option value="liquibyte">liquibyte</option>
                <option value="lucario">lucario</option>
                <option value="material">material</option>
                <option value="mbo">mbo</option>
                <option value="mdn-like">mdn-like</option>
                <option value="midnight">midnight</option>
                <option value="monokai">monokai</option>
                <option value="night">night</option>
                <option value="oceanic-next">oceanic-next</option>
                <option value="panda-syntax">panda-syntax</option>
                <option value="paraiso-dark">paraiso-dark</option>
                <option value="pastel-on-dark">pastel-on-dark</option>
                <option value="railscasts">railscasts</option>
                <option value="rubyblue">rubyblue</option>
                <option value="seti">seti</option>
                <option value="shadowfox">shadowfox</option>
                <option value="the-matrix">the-matrix</option>
                <option value="tomorrow-night-bright">tomorrow-night-bright</option>
                <option value="tomorrow-night-eighties">tomorrow-night-eighties</option>
                <option value="twilight">twilight</option>
                <option value="vibrant-ink">vibrant-ink</option>
                <option value="xq-dark">xq-dark</option>
                <option value="yeti">yeti</option>
                <option value="zenburn">zenburn</option>

                <option value="xq-light">xq-light</option>
            </select>
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
                    <HTML updateHTML={this.updateHTML} html={this.state.html} theme={this.state.theme} />
                    <CSS updateCSS={this.updateCSS} css={this.state.css} theme={this.state.theme} />
                    <JavaScript updateJS={this.updateJS} js={this.state.js} theme={this.state.theme} />
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