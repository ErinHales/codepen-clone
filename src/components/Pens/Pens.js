import React, { Component } from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';

export default class Pens extends Component {
    constructor() {
        super();

        this.state = {
            pens: [],
            currentPage: 0,
            type: "new"
        }
    }

    getMostViewedPens() {
        axios.get(`/api/pens/0?type=views`)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    pens: [res.data],
                    currentPage: 0
                })
            })
            .catch(err => console.log(err))
    }

    getMostRecentPens() {
        axios.get('/api/pens/0?type=new')
            .then(res => {
                // console.log(res.data);
                this.setState({
                    pens: [res.data],
                    currentPage: 0
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
                    currentPage: 0
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getMostRecentPens();
    }

    nextPage() {
        let { type, currentPage, pens } = this.state;
        if (type !== "user") {
            axios.get(`/api/pens/${currentPage + 1}?type=${type}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data[0]) {
                        let copy = pens.slice();
                        copy.push(res.data);
                        console.log(copy);
                        this.setState({
                            pens: copy,
                            currentPage: this.state.currentPage + 1
                        })
                    }
                })
                .catch(err => console.log(err));
        } else {
            axios.get(`/api/pens/user/3/${currentPage + 1}?type=new`)
                .then(res => {
                    // console.log([res.data]);
                    if (res.data[0]) {
                        let copy = pens.slice();
                        copy.push(res.data);
                        console.log(copy);
                        this.setState({
                            pens: copy,
                            currentPage: this.state.currentPage + 1
                        })
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        let { currentPage, pens } = this.state;
        console.log(pens);
        if (pens[currentPage]) {
            var pensList = pens[currentPage].map(pen => {
                let { pen_id, name, username, img_url, views, comments, likes, scripts, html, css, js } = pen;
                return (
                    <Pen
                        key={pen_id}
                        profilePicture={img_url}
                        scripts={scripts}
                        html={html}
                        css={css}
                        js={js}
                        username={username}
                        penName={name}
                        views={views}
                        commentsNum={comments}
                        loves={likes} />
                );
            })
        }
        return (
            <div className="pensView">
                <div className="pens-sizing-container">
                    <div className="pensHeader">
                        <h1>Explore Pens</h1>
                        <h4>View More Pens</h4>
                    </div>
                    <div className="filterPens">
                        <button onClick={() => this.getMostRecentPens()}>All Pens</button>
                        <button onClick={() => this.getMostViewedPens()}>Popular Pens</button>
                        <button onClick={() => this.getUserPens()}>My Pens</button>
                    </div>
                    <div className="pensDisplay">
                        {pensList ? pensList : null}
                    </div>
                    <button className="nextButton" onClick={() => this.nextPage()}>Next<img className="buttonArrow" src="http://i66.tinypic.com/2gufexh.jpg" alt="arrow" /></button>
                </div>
            </div>
        )
    }
}