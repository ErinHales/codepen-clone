import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Showcase_Pen from './Showcase_Pens';
import Showcase_Layout2 from './Showcase_Layout2';

class Showcase extends Component {
    constructor() {
        super();
        this.state = {
            pens: [
                { id: 1, imgUrl: 'data:image/jpeg;base64,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' },
                { id: 2, imgUrl: 'https://news.xbox.com/en-us/wp-content/themes/xbox/theme/img/default/img-default-small.jpg' },
                { id: 3, imgUrl: 'http://keras.io/img/keras-logo-small.jpg' },
                { id: 4, imgUrl: 'https://cdn-beta.tunein.com/assets/img/home/parallaxImages/nba-small-v1.jpg' }
            ]
            
        }
    }
    render() {
        return (
            <div className="component-showcase">
                <div className="showcase-container">
                    <div className="header">
                        <h1>Organize Your Profile Showcase</h1>
                        <p>Put yourself out there, being awesome is long tail. - Allan Branch</p>
                    </div>
                    <div className="showcase-body-container">
                        <div className="showcase-pens">
                            <div className="showcase-box">
                                <div className="showcase-header">
                                    <p>Find Your Pens &</p>
                                    <h2>Drag From Here</h2>
                                </div>
                                <div className="showcase-filter">
                                    <div className="filter-links">
                                        <p>Public</p>
                                        <p>Popular</p>
                                    </div>
                                    <div className="filter-box">
                                        <input placeholder="Search Your Pens..." type="text" />
                                    </div>
                                </div>
                                <div className="showcase-grid">
                                    {this.state.pens.map((pen, index) => {
                                        return <Showcase_Pen key={pen.id} pen={pen}  />
                                    })}
                                </div>
                            </div>
                        </div>
                    <Showcase_Layout2 />
                    </div>
                </div>
                <div className="showcase-footer">

                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Showcase);