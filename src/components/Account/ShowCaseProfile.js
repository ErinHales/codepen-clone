import React, { Component } from 'react';
import Pen from '../Pen/Pen';
import {Link} from 'react-router-dom';

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

        if (pensList.length > 0) {
            return (

                <div className="showCaseContainer">
                    <div className="displayPensList">
                        {pensList}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="showCaseContainer">
                    <div className="showcase-empty">
                        <h2>Your Showcase Is Emtpy</h2>
                       <Link to='/showcase'> <button>Click here to update your showcase</button></Link>
                    </div>
                </div>
            )

        }

    }
}