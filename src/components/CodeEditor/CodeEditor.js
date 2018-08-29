import React, { Component } from 'react';
import JavaScript from './JS';
import HTML from './HTML';
import CSS from './CSS';
import "./Theme.css";
import axios from 'axios';
import SignUp from '../SignUp/SignUp'
import Login from '../Login/Login';
import PenSettings from '../PenSettings/PenSettings';
import NavBar2 from '../NavBar/NavBar2'

require('codemirror/lib/codemirror.css');


export default class CodeEditor extends Component {
    constructor() {
        super();

        this.state = {
            showSettings: false,
            showPopUp: false,
            showSignUp: false,
            isLoggedIn: false,
            visitingUsersId: null,
            userName: '',

            name: "name of pen",
            css: '',
            html: '',
            js: '',
            theme: "twilight",
            penUserId: null,

            behaviorSettings: {
                tabSize: 0,
                autoSave: false,
                autoUpdate: true,
            },
            jsSettings: {
                jsCdnList: []
            },
            cssSettings: {
                cssCdnList: []
            },
            htmlSettings: {
                htmlClassTag: '',
                head: '',
            },
            pageSelection: {
                htmlPage: true,
                cssPage: false,
                jsPage: false,
                behaviorPage: false
            }
        }

        this.settingsPageSelectionHandler = this.settingsPageSelectionHandler.bind(this)

        this.jsCdnSelectHandler = this.jsCdnSelectHandler.bind(this)
        this.removeJsCdn = this.removeJsCdn.bind(this)

        this.cssCdnSelectHandler = this.cssCdnSelectHandler.bind(this)
        this.removeCssCdn = this.removeCssCdn.bind(this)

        this.headStuffHandler = this.headStuffHandler.bind(this)
        this.classTagHandler = this.classTagHandler.bind(this)

        this.autoSaveHandler = this.autoSaveHandler.bind(this)
        this.autoUpdateHandler = this.autoUpdateHandler.bind(this)
        this.tabSizeHandler = this.tabSizeHandler.bind(this)
        this.updateName = this.updateName.bind(this)

        this.fork = this.fork.bind(this)
    }

    getPenData = (id) => {
        axios.get(`/api/pen/${id}`)
        .then(response => {
            this.setState({
                css: null,
                html: null,
                js: null,
                name: response.data.name
            })

            const { user_id: penUserId, html, css, js, username, scripts } = response.data;
            let { css: cssList, html: htmlScripts, js: jsList } = scripts
            const { html_tag_class, head_tag } = htmlScripts
            if (!cssList[0]) cssList = []
            if (!jsList[0]) jsList = []
            console.log(penUserId)

            this.setState({
                penUserId,
                css,
                html,
                js,
                userName: username,
                jsSettings: {
                    jsCdnList: jsList
                },
                cssSettings: {
                    cssCdnList: cssList
                },
                htmlSettings: {
                    htmlClassTag: html_tag_class,
                    head: head_tag
                }
            })
        })
        .catch()
    }

    componentWillMount() {
        axios.get('/api/users')
            .then(response => {
                if (response.data.username) {
                    this.setState({
                        isLoggedIn: true,
                        visitingUserId: response.data.userid
                    })
                }
            })
        const { id } = this.props.match.params
        if (id) {
            this.getPenData(id)
        }

    }

    // componentDidMount() {
    //     axios.get('/api/userinfo').then(response => {
    //         // console.log(response.data);
    //         this.setState({
    //             theme: response.data[0].theme
    //         })
    //     })
    //     axios.put(`/api/pen/view/${this.props.match.params.id}/${this.state.userid}`).catch(console.error());
    // }
    componentDidMount() {
        axios.get('/api/userinfo').then(response => {
            if (response.data[0]) {
                if(response.data[0].theme) {
                    this.setState({
                        theme: response.data[0].theme
                    })
                }
            }
        })
        if(this.props.match.params.id && this.state.userid) {
            axios.put(`/api/pen/view/${this.props.match.params.id}/${this.state.userid}`)
                .catch(console.error());
        }
    }

    updateTheme = (e) => {
        this.setState({
            theme: e.target.value
        })
    }
    ////// DATA FORMATING ///////
    penData = () => {
        const { name, html, css, js } = this.state
        return {
            name,
            forked: false,
            html,
            css,
            js,
            scripts: {
                html: {
                    html_tag_class: this.state.htmlSettings.htmlClassTag,
                    head_tag: this.state.htmlSettings.head
                },
                css: this.state.cssSettings.cssCdnList,
                js: this.state.jsSettings.jsCdnList
            }
        }
    }
    /////// SERVER INTERACTION //////////////
    savePen = () => {
        if (!this.state.isLoggedIn) {
            this.setState({ showPopUp: true })
            return
        }
        const { id } = this.props.match.params
        if (id) {
            axios.put(`/api/pen/${id}`, this.penData())
        }
        else {
            axios.post('/api/pen/', this.penData())
                .then(response => {
                    this.props.match.params.id = response.data[0].pen_id
                })
        }
    }

    deletePen = () => {
        axios.delete(`/api/pen/${this.props.match.params.id}`)
            .then(() => {
                this.props.history.push('/pens')
            })
            .catch(console.error)
    }


    ////////// UPDATING WORKING IFRAME /////////////
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

    //////////// SETTINGS MENU //////////////////
    //JS page Handlers
    jsCdnSelectHandler(data) {
        this.setState({
            jsSettings: {
                jsCdnList: [...this.state.jsSettings.jsCdnList, data.latest]
            }
        })
    }
    removeJsCdn(value) {
        this.setState({
            jsSettings: {
                jsCdnList: this.state.jsSettings.jsCdnList.filter(e => !e.startsWith(value))
            }
        })
    }

    //CSS page Handlers
    cssCdnSelectHandler(data) {
        this.setState({
            cssSettings: {
                cssCdnList: [...this.state.cssSettings.cssCdnList, data.latest]
            }
        })
    }
    removeCssCdn(value) {
        this.setState({
            cssSettings: {
                cssCdnList: this.state.cssSettings.cssCdnList.filter(e => !e.startsWith(value))
            }
        })
    }

    //HTML Page Handlers
    classTagHandler(value) {
        this.setState({
            htmlSettings: {
                htmlClassTag: value,
                head: this.state.htmlSettings.head
            }
        })
    }
    headStuffHandler(value) {
        this.setState({
            htmlSettings: {
                head: value,
                htmlClassTag: this.state.htmlSettings.htmlClassTag
            }
        })
    }

    // Behavior Page Handlers
    autoSaveHandler(value) {
        this.setState({
            behaviorSettings: Object.assign({}, this.state.behaviorSettings, { autoSave: value })
        })
    }
    autoUpdateHandler(value) {
        this.setState({
            behaviorSettings: Object.assign({}, this.state.behaviorSettings, { autoUpdate: value })
        })

    }
    tabSizeHandler(value) {
        this.setState({
            behaviorSettings: Object.assign({}, this.state.behaviorSettings, { tabSize: value })
        })
    }

    // settings page selection
    settingsPageSelectionHandler(pageName) {
        const pageChanger = {
            html: () => this.setState({
                pageSelection: Object.assign({}, this.state.pageSelection, {
                    htmlPage: true,
                    cssPage: false,
                    jsPage: false,
                    behaviorPage: false
                })
            }),
            css: () => this.setState({
                pageSelection: Object.assign({}, this.state.pageSelection, {
                    htmlPage: false,
                    cssPage: true,
                    jsPage: false,
                    behaviorPage: false
                })
            }),
            js: () => this.setState({
                pageSelection: Object.assign({}, this.state.pageSelection, {
                    htmlPage: false,
                    cssPage: false,
                    jsPage: true,
                    behaviorPage: false
                })
            }),
            behavior: () => this.setState({
                pageSelection: Object.assign({}, this.state.pageSelection, {
                    htmlPage: false,
                    cssPage: false,
                    jsPage: false,
                    behaviorPage: true
                })
            }),
        }
        pageChanger[pageName]()
        this.settingsPopUpHandler(true)
    }

    //// SETTINGS POPUP CONTROLLERS ////////
    settingsPopUpHandler = (value) => {
        this.setState({
            showSettings: value
        })
    }

    //////////// ACCOUNT VALIDATION //////////////
    closePopUp = (bool = false) => {
        if (bool) {
            this.setState({
                showPopUp: false,
                isLoggedIn: true,
                showSignUp: false
            })
            this.savePen()
        }
        else {
            this.setState({ showPopUp: false, showSignUp: false })
        }
    }
    popUpSwitch = () => {
        this.setState({ showSignUp: !this.state.showSignUp })
    }
    ///////////////////////////////

    updateName(e) {
        this.setState({
            name: e.target.value
        })
    }

    fork() {
        //show login pop up if not logged in , if logged in 
        if (!this.state.isLoggedIn) {
            this.setState({ showPopUp: true })
            return
        }
        else {
            let penData = this.penData()
            penData.forked = true
            axios.post('/api/pen/', penData)
                .then(response => {
                    this.props.history.push(`/editor/${response.data[0].pen_id}`)
                    this.getPenData(this.props.match.params.id)
                })
        }
    }

    render() {

        const settingsMenu = (
            <div className="pen-settings-popup-container">
                <PenSettings
                    settingsPopUpHandler={this.settingsPopUpHandler}
                    htmlSettings={this.state.htmlSettings}
                    classTagHandler={this.classTagHandler}
                    headStuffHandler={this.headStuffHandler}

                    cssSettings={this.state.cssSettings}
                    cssCdnSelectHandler={this.cssCdnSelectHandler}
                    removeCssCdn={this.removeCssCdn}

                    jsSettings={this.state.jsSettings}
                    jsCdnSelectHandler={this.jsCdnSelectHandler}
                    removeJsCdn={this.removeJsCdn}

                    behaviorSettings={this.state.behaviorSettings}
                    autoSaveHandler={this.autoSaveHandler}
                    autoUpdateHandler={this.autoUpdateHandler}
                    tabSizeHandler={this.tabSizeHandler}

                    pageSelection={this.state.pageSelection}
                    pageHandler={this.settingsPageSelectionHandler}

                    savePen={this.savePen}
                />
                <div onClick={() => this.settingsPopUpHandler(false)} className="pen-settings-popup-overlay"></div>
            </div>
        )


        const popUp = (
            <div className="signup-popup">
                <div className="signup-popup-container-postition">
                    <div className="signup-popup-form-container">
                        {this.state.showSignUp ?
                            <SignUp closePopUp={this.closePopUp} />
                            :
                            <Login closePopUp={this.closePopUp} switch={this.popUpSwitch} />
                        }

                    </div>
                </div>
                <div onClick={() => this.closePopUp(false)} className="signup-popup-overlay"></div>
            </div>
        )

        let stylesheetString = this.state.cssSettings.cssCdnList.filter(element => element).reduce((string, element) => {
            return string + `<link rel='stylesheet' href='${element}'>`
        }, '')

        let jsLibraryString = this.state.jsSettings.jsCdnList.reduce((string, element) => {
            return string + `<script type='text/javascript' src='${element}'></script>`
        }, '')
        let srcdoc = `
        <html class='${this.state.htmlSettings.htmlClassTag || ''}'>
            <head>
                ${stylesheetString}
                ${this.state.htmlSettings.head || ''}            
            </head>
            <body>${this.state.html}</body>
            <style>${this.state.css}</style>
            ${jsLibraryString}
            
            <script>${this.state.js}</script>
        </html>`;
        console.log(this.state)
        return (
            <div>
            <NavBar2
                savePen={this.savePen}
                penUserId={this.state.penUserId}
                isUser={this.state.visitingUserId === this.state.penUserId}
                history={this.props.history}
                userName={this.state.userName}
                updateName={this.updateName}
                penName={this.state.name}
                isLoggedIn={this.state.isLoggedIn} 
                showSettings={this.state.showSettings} 
                settingsPopUpHandler={this.settingsPopUpHandler} 
                fork={this.fork}
            />
            <div className="codeEditor">
                {this.state.showPopUp ? popUp : null}
                {this.state.showSettings ? settingsMenu : null}
                <div className="editorHead">
                    <section className="editorSection">
                        <div>
                            <button
                                onClick={() => this.settingsPageSelectionHandler('html')}
                            ><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings" /></button>
                            <h3>HTML</h3>
                        </div>
                        <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                    </section>
                    <section className="editorSection">
                        <div>
                            <button
                                onClick={() => this.settingsPageSelectionHandler('css')}
                            ><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings" /></button>
                            <h3>CSS</h3>
                        </div>
                        <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                    </section>
                    <section className="editorSection">
                        <div>
                            <button
                                onClick={() => this.settingsPageSelectionHandler('js')}
                            ><img className="settingsImg" src="http://www.clker.com/cliparts/5/t/n/f/d/T/white-gear-hi.png" alt="settings" /></button>
                            <h3>JS</h3>
                        </div>
                        <button><img className="settingsImg" src="http://i66.tinypic.com/2gufexh.jpg" alt="down arrow" /></button>
                    </section>
                </div>
                {this.state.html !== null ? <div className="editor">
                    <HTML updateHTML={this.updateHTML} html={this.state.html} theme={this.state.theme} />
                    <CSS updateCSS={this.updateCSS} css={this.state.css} theme={this.state.theme} />
                    <JavaScript updateJS={this.updateJS} js={this.state.js} theme={this.state.theme} />
                </div> : null}
                <div className="verticalResize"></div>
                <iframe className="penFrame" srcDoc={srcdoc} frameBorder="0" title="showPen"></iframe>
                <div className="penFooter">
                    {/* <button>Console</button> */}
                    {this.state.visitingUserId === this.state.penUserId ? (
                        <button onClick={() => this.savePen()}>Save</button>
                    ) : (
                            null
                        )}
                    {this.state.visitingUserId === this.state.penUserId ? (
                        <button onClick={this.deletePen} className="delete">Delete</button>
                    ) : (
                            null
                        )}
                </div>
            </div>
            </div >
        )
    }
}