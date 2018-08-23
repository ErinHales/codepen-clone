import React, { Component } from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';

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
                console.log(response.data);
                this.setState({
                    pens: [response.data]
                })
            })
        } else {
            axios.get(`/api/search/users?search=${input}`).then(response => {
                this.setState({
                    users: response.data
                })
            })
        }
    }

    handleUpdate(val, prop) {
        this.setState({
            [prop]: val
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
        if(users[0]) {
            var usersList = users.map(user => {
                return (
                    <div className="user" key={user.id}>
                        <img src={user.img_url} alt=""/>
                        <h3>{user.name}</h3>
                    </div>
                )
            })
        }
        return (
            <div className="search">
                <input type="text" placeholder="Search Pens" value={this.state.input} onChange={(e) => this.handleUpdate(e.target.value, "input")} onKeyUp={(e) => e.keyCode === 13 ? this.search() : null} />
                <div className="bar">
                    <h3 onClick={() => this.handleUpdate("pens", "search")} style={{color: search === "pens" ? "white" : "lightgray"}}>Pens</h3>
                    <h3 onClick={() => this.handleUpdate("users", "search")} style={{color: search === "users" ? "white" : "lightgray"}}>Users</h3>
                </div>
                <div className="filters">
                    <h4>Order results by</h4>
                    <div className="filterContainer">
                        <input name="filter" type="radio" value="popularity" id="popularity" onChange={(e) => this.handleUpdate(e.target.value, "filter")} defaultChecked></input>
                        <label for="popularity">Relevance & Popularity</label>
                        <input name="filter" type="radio" value="currency" id="currency" onChange={(e) => this.handleUpdate(e.target.value, "filter")}></input>
                        <label for="currency">Newest First</label>
                    </div>
                </div>
                <div className="penContainer">
                    { search === "users" ? usersList : pensList }
                </div>
            </div>
        )
    }
}