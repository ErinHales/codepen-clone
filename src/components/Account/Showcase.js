import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Showcase_Pen from './Showcase_Pens';
import Showcase_Layout2 from './Showcase_Layout2';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';
class Showcase extends Component {
    constructor() {
        super();
        this.state = {
            pens: [],
            currentPage: 0
        }
    }
    getUserPens = () => {
        axios.get(`/api/pens/user/0/${this.state.currentPage}?type=new`)
            .then(res => {
                console.log(res);
                this.setState({
                    pens: [res.data]
                })
            })
            .catch(err => console.log(err));
    }
    nextPage() {
        let { currentPage, pens } = this.state;
        if (!pens[currentPage + 1]) {
            axios.get(`/api/pens/user/0/${currentPage + 1}?type=new`)
                .then(res => {
                    if (res.data[0]) {
                        let copy = pens.slice();
                        copy.push(res.data);
                        this.setState({
                            pens: copy,
                            currentPage: currentPage + 1
                        })
                    }
                })
                .catch(console.error);
        } else {
            this.setState({
                currentPage: currentPage + 1
            })
        }
    }
    getPrev() {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }
    componentDidMount() {
        this.getUserPens();
    }
    displayAlert = async () => {
         setTimeout(() => {
            document.querySelector('.alert').style.display = 'block';
            setTimeout(() =>{
                document.querySelector('.alert').style.display = 'none';
            }, 1500)
        }, 875);
    //    document.querySelector('.alert').style.display = 'block';
}
render() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="component-showcase">
                <div className="alert">
                    <p>Showcase layout saved</p>
                </div>
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
                                    {this.state.pens[0] ? this.state.pens[this.state.currentPage].map((pen, index) => {
                                        return <Showcase_Pen key={pen.pen_id} penId={pen.pen_id} css={pen.css} html={pen.html} js={pen.js} scripts={pen.scripts} user_id={pen.user_id} />
                                    }) : null}
                                </div>
                                <div className="paginationButtons">
                                    <button className="nextButton" style={{ display: this.state.currentPage === 0 ? "none" : "block" }} onClick={() => this.getPrev()}><i className="fa fa-angle-left"></i>Prev</button>
                                    <button className="nextButton" onClick={() => this.nextPage()}>Next<i className="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                        <Showcase_Layout2 showAlert={this.displayAlert} />
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default DragDropContext(HTML5Backend)(Showcase);