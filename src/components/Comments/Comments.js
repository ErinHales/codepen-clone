import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { copyFile } from 'fs';

export default class Comments extends Component {
    constructor() {
        super();

        this.state = {
            penInfo: {},
            comments: [],
            input: ""
        }
    }

    componentDidMount() {
        axios.get(`/api/pen/${this.props.match.params.id}`).then(response => {
            this.setState({
                penInfo: response.data
            })
        })
        this.getComments()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.comments !== this.state.comments) {
            this.getComments();
        }
    }

    getComments = () => {
        axios.get(`/api/pen/comments/${this.props.match.params.id}`).then(response => {
            this.setState({
                comments: response.data
            })
        })
    }

    updateInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    leaveComment = () => {
        axios.post(`/api/pen/comment/${this.props.match.params.id}`, {comment: this.state.input}).then(response => {
            let copy = this.state.comments.slice();
            copy.unshift(response.data);
            this.setState({
                comments: copy,
                input: ''
            })
        }).catch(console.error);
        axios.put(`/api/stats/comments/${this.props.match.params.id}`, {commentNum: this.state.comments.length+1}).catch(console.error());
    }

    render() {
        let {html, css, js, views, comments, loves, name, img_url} = this.state.penInfo;
        const srcDoc = `${html}<style>${css}</style><script>${js}</script>`
        let commentArr = [];
        this.state.comments.forEach(comment => {
            return commentArr.push(<Comment key={comment.id} name={comment.name} image={comment.img_url} comment={comment.comment} />);
        })
        return (
            <div className="commentsPageContainer">
                <iframe className="commentsFrame" srcDoc={srcDoc} title="comments" frameBorder="0"></iframe>
                <div className="comments">
                    <div className="penInfoBar">
                        <div className="penInfoLeft">
                            <img className="profileImg" src={img_url ? img_url : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/186499/default-avatar.png"} alt="" />
                            <div>
                                <h5>A PEN BY</h5>
                                <section>
                                    <h3>{name}</h3>
                                    <button>follow</button>
                                </section>
                            </div>
                        </div>
                        <div className="penInfoRight">
                            <h3><i className="fa fa-eye"></i>{views ? views : 0}</h3>
                            <img src="https://www.drupal.org/files/issues/comment_6.png" alt="" />
                            <h3>{comments ? comments : 0}</h3>
                            <img src="http://www.clker.com/cliparts/H/J/r/l/7/T/grey-heart-hi.png" alt="" />
                            <h3>{loves ? loves : 0}</h3>
                        </div>
                    </div>
                    <div className="commentsContainer">
                        <div className="tags">
                            <h3>Description</h3>
                            <h3>Tags</h3>
                            <h3>License</h3>
                        </div>
                        <div className="descriptionBox">
                            <h3>Some description</h3>
                            <p>{`
Copyright (c) 2018 by Timothee Guignard (https://codepen.io/TimGuignard/pen/yERGbG)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            `}</p>
                        </div>
                        <h2>COMMENTS</h2>
                        <div>
                            {this.state.comments[0] ? commentArr : <div className="comment" style={{color: 
                            "white"}}>Sorry, there are no comments for this pen.</div>}
                        </div>
                        <h2 className="leaveComment">LEAVE A COMMENT</h2>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Be cool." onChange={(e) => this.updateInput(e)} value={this.state.input}></textarea>
                        <button className="submitComment" onClick={() => this.state.input ? this.leaveComment() : null}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}