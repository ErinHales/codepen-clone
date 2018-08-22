import React, { Component } from 'react';

export default class SettingsHTML extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPopUp: false
        }
    }
    render() {
        return (
                <div className="pen-settings-interface">
                <div onClick={this.showPopUp} className={`popup${this.state.showPopUp ? ' show-popup' : ""}`}>?</div>
                <h3 className="pen-settings-heading">Add Class(es) to {`<html>`}</h3> 
                <div className="pen-settings-input-container">
                    <input
                        style={{
                            fontSize: 12,
                            padding: 11,
                            marginBottom: 25
                        }}
                        placeholder="e.g. single post post-1234"
                        className="pen-settings-input" 
                        value={this.props.htmlClassTag} 
                        onChange={(event) => this.props.classTagHandler(event.target.value)} type="text"/>
                </div>
                <h3 className="pen-settings-heading">Stuff for {`<head>`}</h3>
                <textarea 
                    className="pen-settings-textarea" 
                    name="head-content" 
                    id="head-content"
                    placeholder="e.g. <meta>, <link>, <script>"
                    onChange={event => this.props.headStuffHandler(event.target.value)}
                    value={this.props.head}></textarea>
            </div>
        )
    }
}