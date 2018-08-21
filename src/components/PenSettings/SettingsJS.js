import React, { Component } from 'react';
import axios from 'axios'

export default class SettingsJs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopUp: false,
            cdnInput: '',
            externalCdnList: []
        }
        this.cdnInputHandler = this.cdnInputHandler.bind(this)
        this.showPopUp = this.showPopUp.bind(this)
        this.getExternalCdnList = this.getExternalCdnList.bind(this)
    }

    showPopUp() {
        this.setState({showPopUp:!this.state.showPopUp})
    }

    cdnInputHandler(value) {
        this.setState({cdnInput: value})
        this.getExternalCdnList()
    }
    getExternalCdnList() {
        if(!this.state.cdnInput) {
            this.setState({externalCdnList: []})
            return
        }
        axios.get(`/api/pen/searchcdn/js?search=${this.state.cdnInput}`)
            .then( res => {
                this.setState({
                    externalCdnList: res.data
                })
            })
            .catch(console.error)
    }

    render() {
        const externalCdnList = this.state.externalCdnList.map( cdn => {
            return(
                <div className="pen-settings-cdn-element">
                    <div className="cdn-element-name-version-container">
                        <div>
                            {cdn.name}
                        </div>
                        <div>
                            {cdn.version}
                        </div>
                    </div>
                    <div className="cdn-element-description" >{cdn.description}</div>
                </div>
            )
        })
        const cdnList = this.props.cdnList.map( item => {
            return (
                <div>
                    {item}
                </div>
            )
        })
        return (
            <div className="pen-settings-interface">
                <h3 className="pen-settings-heading">Add External Scripts</h3> <div onClick={this.showPopUp} className={`popup${this.state.showPopUp ? ' show-popup' : ""}`}>asdf</div>
                <p className="pen-settings-description">Any URL's added here will be added as {'<script>'}s in order, and run before the JavaScript in the editor. You can use the URL of any other Pen and it will include the JavaScript from that Pen.</p>
                <div className="pen-settings-input-container">
                    <div className="pen-settings-input-icon">
                        <i 
                        style={{
                            fontSize: 20, 
                            color: '#535557',
                            marginLeft: 10,
                            marginTop:15,
                            left: 15, 
                            top: 15}} 
                            className="fa fa-search"></i>
                    </div>
                    <input 
                        placeholder="Search CDNjs (jQuery, Lodash, React, Angular, Vue.js, Ember...)"
                        className="pen-settings-input" 
                        value={this.state.cdnInput} 
                        onChange={(event) => this.cdnInputHandler(event.target.value)} type="text"/>
                </div>
                <div className="pen-settings-cdn-results-container">
                    {externalCdnList}
                </div>
                {cdnList}
            </div>
        )
    }
}