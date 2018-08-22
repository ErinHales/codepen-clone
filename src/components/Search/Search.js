import React, {Component} from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';

export default class Search extends Component {
    constructor() {
        super();

        this.state = {
            input: "",
            currentPage: 0,
            filter: 'popularity',
            pens: []
        }
    }

    search() {
        let { currentPage, filter, input } = this.state;
        axios.get(`/api/search/pens/${currentPage}?type=${filter}&search=${input}`).then(response => {
            console.log(response.data);
            this.setState({
                pens: [response.data]
            })
        })
    }

    handleUpdate(e) {
        this.setState({
            input: e.target.value
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
            <div className="search">
                <input type="text" placeholder="Search Pens" value={this.state.input} onChange={(e) => this.handleUpdate(e)} onKeyUp={(e) => e.keyCode === "13" ? this.search() : null}/>
                <button onClick={() => this.search()}>search</button>
                <div>
                    <h3>Pens</h3>
                    <h3>Users</h3>
                </div>
                <h4>Order results by</h4>
                <div>
                    <h4>Relevance & Popularity</h4>
                    <h4>Newest First</h4>
                </div>
                <div className="penContainer">
                    {pensList}
                </div>
            </div>
        )
    }
}