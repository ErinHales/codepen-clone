import React, { Component } from 'react';
import PenSettingsNav from '../PenSettingsNav/PenSettingsNav'
import SettingsCSS from './SettingsCSS';
import SettingsHTML from './SettingsHTML';
import SettingsJS from './SettingsJS';
import Behavior from './Behavior';


export default class PenSettings extends Component {
    constructor(props) {
        super(props)   

        // Possible features: 
        //  Add style sheet from other pens
        this.state = {
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
            htmlPage: false,
            cssPage: false,
            jsPage: false,
            behaviorPage: true,
            toggleJsInfoPopUp: false
        }
        this.pageHandler = this.pageHandler.bind(this)

        this.jsCdnSelectHandler = this.jsCdnSelectHandler.bind(this)
        this.removeJsCdn = this.removeJsCdn.bind(this)
        
        this.cssCdnSelectHandler = this.cssCdnSelectHandler.bind(this)
        this.removeCssCdn = this.removeCssCdn.bind(this)

        this.headStuffHandler = this.headStuffHandler.bind(this)
        this.classTagHandler = this.classTagHandler.bind(this)

        this.autoSaveHandler = this.autoSaveHandler.bind(this)
        this.autoUpdateHandler = this.autoUpdateHandler.bind(this)
        this.tabSizeHandler = this.tabSizeHandler.bind(this)
    }

    pageHandler(pageName) {
        const pageChanger = {
            html: () => this.setState({
                htmlPage: true,
                cssPage: false,
                jsPage: false,
                behaviorPage: false
            }),
            css: () => this.setState({
                htmlPage: false,
                cssPage: true,
                jsPage: false,
                behaviorPage: false
            }),
            js: () => this.setState({
                htmlPage: false,
                cssPage: false,
                jsPage: true,
                behaviorPage: false
            }),
            behavior: () => this.setState({
                htmlPage: false,
                cssPage: false,
                jsPage: false,
                behaviorPage: true
            }),
        }
        pageChanger[pageName]()
    }

    //JS page Handlers
    jsCdnSelectHandler(data) {
        console.log(data)
        this.setState({
            jsSettings: {
                jsCdnList: [...this.state.jsSettings.jsCdnList, data.latest]
                }
        })
    }
    removeJsCdn(value) {
        console.log('fired')
        this.setState({
            jsSettings: {
                jsCdnList: this.state.jsSettings.jsCdnList.filter(e => !e.startsWith(value))
            }
        })
    }

    //CSS page Handlers
    cssCdnSelectHandler(data) {
        console.log(data)
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
        console.log('tag handler fired')
        this.setState({
            htmlSettings: {
                htmlClassTag: value
            }
        })
    }
    headStuffHandler(value) {
        this.setState({
            htmlSettings: {
                head: value
            }
        })
    }

    // Behavior Page Handlers
    autoSaveHandler(value) {
        console.log(2222,value)
        this.setState({
            behaviorSettings: Object.assign({}, this.state.behaviorSettings, {autoSave:value})
        })
    }
    autoUpdateHandler(value) {
        this.setState({
            behaviorSettings: Object.assign({}, this.state.behaviorSettings, {autoUpdate:value})
        })
        
    }
    tabSizeHandler(value) {
        this.setState({
            behaviorSettings : Object.assign({}, this.state.behaviorSettings, {tabSize:value})
        })
    }



    render() {
        let { htmlPage, cssPage, jsPage, behaviorPage} = this.state

        return (
            <div style={{ width: "100vw", backgroundColor: "black"}}>
                <div className="pen-settings-container" >
                    <PenSettingsNav 
                        htmlPage={htmlPage} 
                        cssPage={cssPage}
                        jsPage={jsPage}
                        behaviorPage={behaviorPage}
                        pageHandler={this.pageHandler} 
                    />
                    
                    {this.state.htmlPage ? 
                        <SettingsHTML 
                            htmlClassTag={this.state.htmlSettings.htmlClassTag}
                            head={this.state.htmlSettings.head}
                            classTagHandler={this.classTagHandler}
                            headStuffHandler={this.headStuffHandler}
                        /> 
                        : 
                        null
                    }
                    
                    {this.state.cssPage ? 
                        <SettingsCSS
                            cssCdnList={this.state.cssSettings.cssCdnList}
                            cssCdnSelectHandler={this.cssCdnSelectHandler}
                            removeCssCdn={this.removeCssCdn} 
                        /> 
                        : 
                        null
                    }
                    
                    {this.state.jsPage ? 
                        <SettingsJS
                            jsCdnList={this.state.jsSettings.jsCdnList}
                            jsCdnSelectHandler={this.jsCdnSelectHandler}
                            removeJsCdn={this.removeJsCdn}
                        /> 
                        : 
                        null
                    }

                    {this.state.behaviorPage ? 
                        <Behavior 
                            autoSaveHandler={this.autoSaveHandler}
                            autoUpdateHandler={this.autoUpdateHandler}
                            tabSizeHandler={this.tabSizeHandler}
                            tabSize={this.state.behaviorSettings.tabSize}
                            autoSave={this.state.behaviorSettings.autoSave}
                            autoUpdate={this.state.behaviorSettings.autoUpdate}
                        /> 
                        : 
                        null
                    }

                </div>
            </div>
        )

    }
}