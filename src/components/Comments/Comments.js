import React, { Component } from 'react';
import Comment from '../Comment/Comment';

export default class Comments extends Component {
    render() {
        return (
            <div className="commentsPageContainer">
                <iframe className="commentsFrame" src="https://ozzy.site" title="comments" frameborder="0"></iframe>
                <div className="comments">
                    <div className="penInfoBar">
                        <div className="penInfoLeft">
                            <img className="profileImg" src="http://i66.tinypic.com/5fkgw5.jpg" alt="" />
                            <div>
                                <h5>A PEN BY</h5>
                                <section>
                                    <h3>username</h3>
                                    <button>follow</button>
                                </section>
                            </div>
                        </div>
                        <div className="penInfoRight">
                            <h3><i className="fa fa-eye"></i>254</h3>
                            <img src="https://www.drupal.org/files/issues/comment_6.png" alt="" />
                            <h3>3</h3>
                            <img src="http://www.clker.com/cliparts/H/J/r/l/7/T/grey-heart-hi.png" alt="" />
                            <h3>16</h3>
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
                            <Comment />
                        </div>
                        <h2 className="leaveComment">LEAVE A COMMENT</h2>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Be cool."></textarea>
                        <button className="submitComment">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}