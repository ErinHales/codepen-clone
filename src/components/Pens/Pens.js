import React, { Component } from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';
import NavBar from '../NavBar/NavBar'

export default class Pens extends Component {
    constructor() {
        super();

        this.state = {
            pens: [],
            currentPage: 0,
            type: "new",
            filter: "all"  // popular, my
        }
    }

    getMostViewedPens() {
        axios.get(`/api/pens/0?type=views`)
            .then(res => {
                this.setState({
                    pens: [res.data],
                    currentPage: 0,
                    filter: "popular"
                })
            })
            .catch(err => console.log(err))
    }

    getMostRecentPens() {
        axios.get('/api/pens/0?type=new')
            .then(res => {
                this.setState({
                    pens: [res.data],
                    currentPage: 0,
                    filter: "all"
                })
            })
            .catch(err => console.log(err));
    }

    getUserPens() {
        axios.get('/api/pens/user/3/0?type=new')
            .then(res => {
                // console.log(res.data);
                this.setState({
                    pens: [res.data],
                    currentPage: 0,
                    filter: "my"
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getMostRecentPens();
    }

    nextPage() {
        let { type, currentPage, pens } = this.state;
        if (type !== "user" && !pens[currentPage + 1]) {
            axios.get(`/api/pens/${currentPage + 1}?type=${type}`)
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
                .catch(err => console.log(err));
        } else if (!pens[currentPage + 1]) {
            axios.get(`/api/pens/user/3/${currentPage + 1}?type=new`)
                .then(res => {
                    // console.log([res.data]);
                    if (res.data[0]) {
                        let copy = pens.slice();
                        copy.push(res.data);
                        console.log(copy);
                        this.setState({
                            pens: copy,
                            currentPage: currentPage + 1
                        })
                    }
                })
                .catch(err => console.log(err));
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

    render() {
        let { currentPage, pens } = this.state;
        if (pens[currentPage]) {
            var pensList = pens[currentPage].map(pen => {
                let { pen_id, name, username, img_url, views, comments, loves, scripts, html, css, js } = pen;
                return (
                    <Pen
                        key={pen_id}
                        id={pen_id}
                        profilePicture={img_url}
                        scripts={scripts}
                        html={html}
                        css={css}
                        js={js}
                        username={username}
                        penName={name}
                        views={views}
                        commentsNum={comments}
                        loves={loves} />
                );
            })
        }
        return (
            <div>
             <NavBar/>
                <div className="pensView">
                    <div className="pens-sizing-container">
                        <div className="pensHeader">
                            <h1>Explore Pens</h1>
                            <h4>View More Pens<i className="fa fa-arrow-right"></i></h4>
                        </div>
                        <div className="filterPens">
                            <button onClick={() => this.getMostRecentPens()} style={{ color: this.state.filter === "all" ? "white" : "#8F8F8F" }}>All Pens</button>
                            <button onClick={() => this.getMostViewedPens()} style={{ color: this.state.filter === "popular" ? "white" : null }}>Popular Pens</button>
                            <button onClick={() => this.getUserPens()} style={{ color: this.state.filter === "my" ? "white" : null }}>My Pens</button>
                        </div>
                        <div className="pensDisplay">
                            {pensList ? pensList : null}
                        </div>
                        <div className="paginationButtons">
                            <button className="nextButton" style={{ display: this.state.currentPage === 0 ? "none" : "block" }} onClick={() => this.getPrev()}><i className="fa fa-angle-left"></i>Prev</button>
                            <button className="nextButton" onClick={() => this.nextPage()}>Next<i className="fa fa-angle-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}