import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Showcase_Pen from './Showcase_Pens';
import Showcase_Layout2 from './Showcase_Layout2';
import axios from 'axios';
class Showcase extends Component {
    constructor() {
        super();
        this.state = {
            // pens: [
            //     {id: 1, imgUrl: 'https://s.codepen.io/aibarra13/fullcpgrid/yEeMmY'},
            //     { id: 2, imgUrl: 'https://s.codepen.io/aibarra13/fullcpgrid/yEeMmY' },
            //     { id: 3, imgUrl: 'https://s.codepen.io/aibarra13/fullcpgrid/yEeMmY' },
            //     { id: 4, imgUrl: 'https://s.codepen.io/aibarra13/fullcpgrid/yEeMmY' }
            // ] 
            pens: [],
            currentPage: 0,
        }
    }
    getUserPens = () => {
        axios.get('/api/pens/user/3/2?type=new')
            .then(res => {
                this.setState({
                    pens: res.data
                })
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getUserPens();
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
                                        return <Showcase_Pen key={pen.pen_id} penId={pen.pen_id} css={pen.css} html={pen.html} js={pen.js} scripts={pen.scripts} user_id={pen.user_id} />
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