import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Pen extends Component {
    constructor() {
        super();

        this.state = {
            loved: false
        }
    }

    componentDidMount() {
        if (this.props.id) {
            axios.get(`/api/loved/pens/${this.props.id}`).then(response => {
                this.setState({
                    loved: response.data
                })
            })
        }
    }

    lovePost() {
        if (this.state.loved === false) {
            axios.post(`/api/pen/like/${this.props.id}`).then(response => {
                axios.put(`/api/stats/love/${this.props.id}`, { num: response.data[0].count }).catch(console.error());
            }).catch(console.error());
            this.setState({
                loved: true
            })
        } else {
            axios.delete(`/api/pen/like/${this.props.id}`).then(response => {
                axios.put(`/api/stats/love/${this.props.id}`, { num: response.data[0].count }).catch(console.error());
            }).catch(console.error());
            this.setState({
                loved: false
            })
        }
    }

    render() {
        let { loved } = this.state;
        let { html, css, js, id, profilePicture, penName, scripts, username, views, commentsNum, loves } = this.props;
        // const srcDoc = `${html}<style>${css}</style><script>${js}</script>`
        const { css: cssList, html: htmlScripts, js: jsList } = scripts
        let { html_tag_class: htmlClassTag, head_tag: head } = htmlScripts
        // removing null
        console.log(11111, htmlClassTag)
        if(!htmlClassTag){
            console.log('fired')
            htmlClassTag= ''
        }
        let stylesheetString = cssList.reduce((string, element) => {
            return string  + `<link rel='stylesheet' href='${element}'>`
        }, '')

        let jsLibraryString = jsList.reduce((string, element) => {
            return string  + `<script type='text/javascript' src='${element}'></script>`
        }, '')

        let srcDoc = `
        <html class='${htmlClassTag || ''}'>
            <head>
                ${stylesheetString}
                ${head || ''}            
            </head>
            <body>${html}</body>
            <style>${css}</style>
            ${jsLibraryString}
            
            <script>${js}</script>
        </html>`;
        return (
            <div className="showPen">
                <Link to={`/editor/${id}`}>
                    <div className="overlayContainer">
                        <div className="overlayContainer">
                            <div className="pen-iframe-container">
                                <iframe style={{backgroundColor: 'white'}} scrolling="no" className="pen-iframe" title={this.props.id} srcDoc={srcDoc}></iframe>
                            </div>
                            <div className="overlay">
                                <div className="text">This is a description a very long description thei aslfkjas fl sfas flk f sf aslkfj sdlfk sf  f sfkl sfkljs dfk f dksf kasldf sl;fd sl;df sf ksf lksf </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="penInfoContainer">
                    <div className="penInfo">
                        <img className="profilePicture" src={profilePicture} alt="" />
                        <div>
                            <h3 id="displayUserName">{penName}</h3>
                            <h5>{username}</h5>
                        </div>
                    </div>
                    <div className="penPopularity">
                        <i className="fa fa-eye"></i>
                        <h3>{views}</h3>
                        <Link to={`/comments/${id}`}><i className="fa fa-comment"></i></Link>
                        <h3>{commentsNum}</h3>
                        <i style={{color: loved ? "pink" : "lightgray"}} onClick={() => this.lovePost()} className="fa fa-heart"></i>
                        <h3>{loved ? loves + 1 : loves}</h3>
                    </div>
                </div>
            </div>
        )
    }
}