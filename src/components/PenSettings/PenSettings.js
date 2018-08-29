import React, { Component } from 'react';
import PenSettingsNav from '../PenSettingsNav/PenSettingsNav'
import SettingsCSS from './SettingsCSS';
import SettingsHTML from './SettingsHTML';
import SettingsJS from './SettingsJS';
import Behavior from './Behavior';
import PenDetails from './PenDetails';

export default class PenSettings extends Component {
    render() {

        return (
            <div className="pen-settings-container" >
                <PenSettingsNav
                    settingsPopUpHandler={this.props.settingsPopUpHandler}
                    page={this.props.pageSelection}
                    pageHandler={this.props.pageHandler}
                />

                {this.props.pageSelection === "html" ?
                    <SettingsHTML
                        htmlClassTag={this.props.htmlSettings.htmlClassTag}
                        head={this.props.htmlSettings.head}
                        classTagHandler={this.props.classTagHandler}
                        headStuffHandler={this.props.headStuffHandler}
                    />
                    :
                    null
                }

                {this.props.pageSelection === "css" ?
                    <SettingsCSS
                        cssCdnList={this.props.cssSettings.cssCdnList}
                        cssCdnSelectHandler={this.props.cssCdnSelectHandler}
                        removeCssCdn={this.props.removeCssCdn}
                    />
                    :
                    null
                }

                {this.props.pageSelection === "js" ?
                    <SettingsJS
                        jsCdnList={this.props.jsSettings.jsCdnList}
                        jsCdnSelectHandler={this.props.jsCdnSelectHandler}
                        removeJsCdn={this.props.removeJsCdn}
                    />
                    :
                    null
                }

                {this.props.pageSelection === "behavior" ?
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

                {this.props.pageSelection === "details" ?
                    <PenDetails
                        updateName={this.props.updateName}
                        name={this.props.name}
                        updateDescription={this.props.updateDescription}
                        description={this.props.description}
                    />
                    : null}
            </div>
        )
    }
}