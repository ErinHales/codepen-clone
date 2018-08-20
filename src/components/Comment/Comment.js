import React from 'react';

export default function Comment() {
    return (
        <div className="comment">
            <div className="commentHeader">
                <img src="http://i66.tinypic.com/5fkgw5.jpg" alt="" />
                <h2>Name</h2>
                <h3>on</h3>
                <h3>Date</h3>
            </div>
            <p>this is a comment</p>
        </div>
    )
}