import React, { Component } from 'react';
import PenSettingsNav from '../PenSettingsNav/PenSettingsNav'
import SettingsCSS from './SettingsCSS';
import SettingsHTML from './SettingsHTML';
import SettingsJS from './SettingsJS';
import Behavior from './Behavior';


export default class PenSettings extends Component {
    constructor(props) {
        super(props)   


    }

    render() {
        console.log(this.props)
        let { htmlPage, cssPage, jsPage, behaviorPage} = this.props.pageSelection

        return (
            // <div style={{ width: "100vw", backgroundColor: "black"}}>
                <div className="pen-settings-container" >
                    <PenSettingsNav
                        settingsPopUpHandler={this.props.settingsPopUpHandler}
                        htmlPage={htmlPage} 
                        cssPage={cssPage}
                        jsPage={jsPage}
                        behaviorPage={behaviorPage}
                        pageHandler={this.props.pageHandler} 
                    />
                    
                    {this.props.pageSelection.htmlPage ? 
                        <SettingsHTML 
                            htmlClassTag={this.props.htmlSettings.htmlClassTag}
                            head={this.props.htmlSettings.head}
                            classTagHandler={this.props.classTagHandler}
                            headStuffHandler={this.props.headStuffHandler}
                        /> 
                        : 
                        null
                    }
                    
                    {this.props.pageSelection.cssPage ? 
                        <SettingsCSS
                            cssCdnList={this.props.cssSettings.cssCdnList}
                            cssCdnSelectHandler={this.props.cssCdnSelectHandler}
                            removeCssCdn={this.props.removeCssCdn} 
                        /> 
                        : 
                        null
                    }
                    
                    {this.props.pageSelection.jsPage ? 
                        <SettingsJS
                            jsCdnList={this.props.jsSettings.jsCdnList}
                            jsCdnSelectHandler={this.props.jsCdnSelectHandler}
                            removeJsCdn={this.props.removeJsCdn}
                        /> 
                        : 
                        null
                    }

                    {this.props.pageSelection.behaviorPage ? 
                        <Behavior 
                            autoSaveHandler={this.props.autoSaveHandler}
                            autoUpdateHandler={this.props.autoUpdateHandler}
                            tabSizeHandler={this.props.tabSizeHandler}
                            tabSize={this.props.behaviorSettings.tabSize}
                            autoSave={this.props.behaviorSettings.autoSave}
                            autoUpdate={this.props.behaviorSettings.autoUpdate}
                        /> 
                        : 
                        null
                    }

                </div>
            // </div>
        )

    }
}