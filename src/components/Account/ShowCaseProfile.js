import React, { Component } from 'react';
import Pen from '../Pen/Pen';

export default class ShowCaseProfile extends Component {
    render() {
        let pensList = [];

        this.props.showcase.forEach(pen => {
            let { pen_id, name, description, views, comments, loves, scripts, html, css, js } = pen;
            pensList.push(
                <Pen
                    key={pen_id}
                    id={pen_id}
                    scripts={scripts}
                    html={html}
                    css={css}
                    js={js}
                    penName={name}
                    views={views}
                    commentsNum={comments}
                    loves={loves}
                    description={description}
                />
            )
        })
        let showcase = this.props.showcase[0];
        console.log(this.props.showcase);
        return (
            <div className="showCaseContainer">
                <div className="displayPensList">
                    {pensList}
                </div>
            </div>
        )
    }
}