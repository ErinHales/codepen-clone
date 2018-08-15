import React, { Component } from 'react';

export default function Pen() {
    return (
        <div>
            <iframe src={this.props.url} frameborder="0"></iframe>
            <div className="penInfoContainer">
                <img src={this.props.profile} alt=""/>
                <div>

                </div>
            </div>
        </div>
    )
}