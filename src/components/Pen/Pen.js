import React from 'react';

export default function Pen(props) {
    return (
        <div className="showPen">
            {/* <iframe className="pensFrame" src={props.url} frameBorder="0" title="Pen view"></iframe> */}
            <img className="pensFrame" src={props.url} alt=""/>
            <div className="penInfoContainer">
                <div className="penInfo">
                    <img className="profilePicture" src={props.profile} alt="" />
                    <div>
                        <h3 id="displayUserName">{props.penName}</h3>
                        <h5>{props.username}</h5>
                    </div>
                </div>
                <div className="penPopularity">
                    <img id="viewIcon" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699369-icon-22-eye-512.png" alt="" />
                    <h3>{props.views}</h3>
                    <img src="https://www.drupal.org/files/issues/comment_6.png" alt="" />
                    <h3>{props.commentsNum}</h3>
                    <img src="http://www.clker.com/cliparts/H/J/r/l/7/T/grey-heart-hi.png" alt="" />
                    <h3>{props.loves}</h3>
                </div>
            </div>
        </div>
    )
}