import React, { Component } from 'react';
import axios from 'axios'

export default class SettingsJs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPopUp: false,
            cdnInput: '',
            jsCdnList: [], 
            externalCdnList: []
        }
        this.cdnInputHandler = this.cdnInputHandler.bind(this)
        this.showPopUp = this.showPopUp.bind(this)
        this.getExternalCdnList = this.getExternalCdnList.bind(this)
    }
    
    //// ON CLICK OUTSIDE OF INPUT OR EXTERNAL CDN ELEMENT
    componentWillMount() {
        document.addEventListener('mousedown', this.clearExternalResults, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clearExternalResults, false)
    }

    clearExternalResults = (e) => {
        // if both refs arent being interacted with clear external cdn list
        if( !this.results.contains(e.target) && !this.input.contains(e.target)) {
            this.setState({externalCdnList: []})
        }
    }
    ///////////
    showPopUp() {
        this.setState({showPopUp:!this.state.showPopUp})
    }

    jsCdnSelectHandler(data) {
        this.props.jsCdnSelectHandler(data)
        this.setState({externalCdnList: [], cdnInput: ''})
    }

    cdnInputHandler(value) {
        this.setState({cdnInput: value})
        this.getExternalCdnList()
    }

    getExternalCdnList() {
        axios.get(`/api/pen/searchcdn/js?search=${this.state.cdnInput}`)
            .then( res => {
                this.setState({
                    externalCdnList: res.data.filter(element => {
                        return this.props.jsCdnList.indexOf(element.latest) === -1
                    })
                })
            })
            .catch(console.error)
    }

    render() {
        const externalCdnList = this.state.externalCdnList.map( cdn => {
            return(
                <div key={cdn.name} onClick={() => this.jsCdnSelectHandler(cdn)} className="pen-settings-cdn-element">
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
        const cdnList = this.props.jsCdnList.map( item => {
            return (
                <div key={item} className="pen-settings-cdn-selected-element-container">
                    <div onClick={() => this.props.removeJsCdn(item)} className="pen-settings-cdn-selected-element-remove">x</div>
                    <div className="pen-settings-cdn-selected-element">
                        {item}
                    </div>
                </div>
            )
        })
        return (
            <div className="pen-settings-interface">
                <div onClick={this.showPopUp} className={`popup${this.state.showPopUp ? ' show-popup' : ""}`}>?</div>
                <h3 className="pen-settings-heading">Add External Scripts</h3> 
                <p className="pen-settings-description">Any URL's added here will be added as {'<script>'}s in order, and run before the JavaScript in the editor. You can use the URL of any other Pen and it will include the JavaScript from that Pen.</p>
                <div ref={input => this.input = input} className="pen-settings-input-container">
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
                <div ref={results => this.results = results} className="pen-settings-cdn-results-container">
                    {externalCdnList}
                </div>
                <div className="pen-settings-cdn-selected-container">
                    {cdnList}
                </div>
            </div>
        )
    }
}