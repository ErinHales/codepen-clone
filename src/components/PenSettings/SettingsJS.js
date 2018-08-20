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
        // axios.get(cdn enpoint)
    }

    render() {
        const externalCdnList = this.state.externalCdnList.map( cdn => {
            return(
                <div>
                    {cdn}
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
            <div>
                <h3>Add External Scripts</h3> <div onClick={this.showPopUp} className={`popup${this.state.showPopUp ? ' show-popup' : ""}`}>asdf</div>
                <p>Any URL's added here will be added as {'<script>'}s in order, and run before the JavaScript in the editor. You can use the URL of any other Pen and it will include the JavaScript from that Pen.</p>
                <input value={this.state.cdnInput} onChange={(event) => this.cdnInputHandler(event.target.value)} type="text"/>
                {externalCdnList}
                {cdnList}
            </div>
        )
    }
}