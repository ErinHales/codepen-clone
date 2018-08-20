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
            tabSize: 0,
            autoSave: false,
            autoUpdate: true,
            externalJsCdn: [],
            externalStylesheets: [],
            htmlClassTag: '',
            head: '',
            htmlPage: false,
            cssPage: false,
            jsPage: true,
            behaviorPage: false,
            toggleJsInfoPopUp: false
        }
        this.pageHandler = this.pageHandler.bind(this)
        this.jsCdnHandler = this.jsCdnHandler.bind(this)
    }

    // JS PAGE HANDLERS
    jsCdnHandler(cdnString) {
        this.setState({
            externalJsCdn: [...this.state.externalJsCdn, cdnString]
        })
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



    render() {

        return (
            <div>
                <PenSettingsNav pageHandler={this.pageHandler} />
                {this.state.htmlPage ? <SettingsHTML /> : null}
                {this.state.cssPage ? <SettingsCSS /> : null}
                {this.state.jsPage ? <SettingsJS showPopUp={this.state.toggleJsInfoPopUp} cdnList={this.state.externalJsCdn} cdnHandler={this.jsCdnHandler}
                /> : null}
                {this.state.behaviorPage ? <Behavior /> : null}

            </div>
        )

    }
}