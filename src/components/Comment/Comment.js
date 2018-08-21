import React from 'react';

export default function Comment(props) {
    return (
        <div className="comment">
            <div className="commentHeader">
                <img src={props.image} alt="" />
                <h2>{props.name}</h2>
                <h3>on</h3>
                <h3>Oct 3, 2017</h3>
            </div>
            <p>{props.comment}</p>
        </div>
    )
}