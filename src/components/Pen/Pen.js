import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Pen extends Component {
    constructor() {
        super();

        this.state = {
            stats: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/stats/${this.props.id}`).then(response => {
            console.log(response.data)
            this.setState({
                stats: response.data
            })
        })
    }

    lovePost() {
        axios.post(`/api/pen/like/${this.props.id}`).catch(console.error());
    }

    render() {
        const srcDoc = `${this.props.html}<style>${this.props.css}</style><script>${this.props.js}</script>`
        return (
            <div className="showPen">
                <Link to={`/editor/${this.props.id}`}>
                    <div className="overlayContainer">
                        <div className="overlayContainer">
                            <div className="pen-iframe-container">
                                <iframe scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                            </div>
                            <div className="overlay">
                                <div className="text">This is a description a very long description thei aslfkjas fl sfas flk f sf aslkfj sdlfk sf  f sfkl sfkljs dfk f dksf kasldf sl;fd sl;df sf ksf lksf </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="penInfoContainer">
                    <div className="penInfo">
                        <img className="profilePicture" src={this.props.profilePicture} alt="" />
                        <div>
                            <h3 id="displayUserName">{this.props.penName}</h3>
                            <h5>{this.props.username}</h5>
                        </div>
                    </div>
                    <div className="penPopularity">
                        <h3><i className="fa fa-eye"></i>{this.props.views}</h3>
                        <Link to={`/comments/${this.props.id}`}><img src="https://www.drupal.org/files/issues/comment_6.png" alt="" /></Link>
                        <h3>{this.props.commentsNum}</h3>
                        <img src="http://www.clker.com/cliparts/H/J/r/l/7/T/grey-heart-hi.png" alt="" />
                        <h3>{this.props.loves}</h3>
                    </div>
                </div>
            </div>
        )
    }
}