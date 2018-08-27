import React, { Component } from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

export default class Search extends Component {
    constructor() {
        super();

        this.state = {
            input: "",
            currentPage: 0,
            filter: 'popularity',
            search: 'pens',
            pens: [],
            users: []
        }
    }

    search() {
        let { currentPage, filter, input } = this.state;
        if (this.state.search === "pens") {
            axios.get(`/api/search/pens/${currentPage}?type=${filter}&search=${input}`).then(response => {
                this.setState({
                    pens: [response.data],
                    currentPage: 0
                })
            })
        } else {
            axios.get(`/api/search/users?search=${input}`).then(response => {
                this.setState({
                    users: response.data,
                    currentPage: 0
                })
            })
        }
    }

    handleUpdate(e, prop) {
        this.setState({
            [prop]: e.target.value
        })
    }

    updateSearch(val) {
        this.setState({
            search: val
        })
        this.search();
    }

    nextPage() {
        let { currentPage, filter, input, pens } = this.state;
        axios.get(`/api/search/pens/${currentPage + 1}?type=${filter}&search=${input}`).then(response => {
            if (response.data[0]) {
                let copy = pens.slice();
                copy.push(response.data);
                this.setState({
                    pens: copy,
                    currentPage: currentPage + 1
                })
            }
        })
    }

    getPrev() {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }

    render() {
        let { currentPage, pens, search, users } = this.state;
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
        if (users[0]) {
            var usersList = users.map(user => {
                return (
                    <div className="user" key={user.id}>
                        <img src={user.img_url} alt="" />
                        <Link to={`/profile/${user.id}`}><h3>{user.name}</h3></Link>
                    </div>
                )
            })
        }
        return (
            <div>
                <NavBar />
                <div className="search">
                    <input type="text" placeholder={search === "pens" ? "Search Pens" : "Search Users"} value={this.state.input} onChange={(e) => this.handleUpdate(e, "input")} onKeyUp={(e) => e.keyCode === 13 ? this.search() : null} />
                    <div className="bar">
                        <h3 onClick={() => this.updateSearch("pens")} style={{ color: search === "pens" ? "white" : "lightgray" }}>Pens</h3>
                        <h3 onClick={() => this.updateSearch("users")} style={{ color: search === "users" ? "white" : "lightgray" }}>Users</h3>
                    </div>
                    <div className="filters">
                        <h4>Order results by</h4>
                        <div className="filterContainer">
                            <input name="filter" type="radio" value="popularity" id="popularity" onChange={(e) => this.handleUpdate(e, "filter")} defaultChecked></input>
                            <label for="popularity">Relevance & Popularity</label>
                            <input name="filter" type="radio" value="currency" id="currency" onChange={(e) => this.handleUpdate(e, "filter")}></input>
                            <label for="currency">Newest First</label>
                        </div>
                    </div>
                    <div className="penContainer">
                        {search === "users" ? usersList : pensList}
                    </div>
                    {search === "pens" && pens[0] ? (
                        <div className="paginationButtons">
                            <button className="nextButton" style={{ display: this.state.currentPage === 0 ? "none" : "block" }} onClick={() => this.getPrev()}><i className="fa fa-angle-left"></i>Prev</button>
                            <button className="nextButton" onClick={() => this.nextPage()}>Next<i className="fa fa-angle-right"></i></button>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}