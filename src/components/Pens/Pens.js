import React, {Component} from 'react';
import Pen from '../Pen/Pen';
import axios from 'axios';

export default class Pens extends Component {
    constructor() {
        super();

        this.state = {
            pens: [{
                id: 1,
                url: "http://i63.tinypic.com/bfnxv4.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i65.tinypic.com/25grn8k.jpg",
                username: "Erin Hales", 
                penName: "Weather Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            },
            {   
                id: 2,
                url: "http://i63.tinypic.com/iqvj49.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i66.tinypic.com/5fkgw5.jpg",
                username: "Erin Hales", 
                penName: "Calendar Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            },
            {
                id: 3,
                url: "http://i63.tinypic.com/iqvj49.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i66.tinypic.com/5fkgw5.jpg",
                username: "Erin Hales", 
                penName: "Calendar Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            },
            {
                id: 4,
                url: "http://i63.tinypic.com/iqvj49.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i66.tinypic.com/5fkgw5.jpg",
                username: "Erin Hales", 
                penName: "Calendar Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            },
            {
                id: 5,
                url: "http://i63.tinypic.com/iqvj49.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i66.tinypic.com/5fkgw5.jpg",
                username: "Erin Hales", 
                penName: "Calendar Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            },
            {
                id: 6,
                url: "http://i63.tinypic.com/iqvj49.jpg",
                penDescription: "this pen blah blah blah blah blah blah blah blah",
                profile: "http://i66.tinypic.com/5fkgw5.jpg",
                username: "Erin Hales", 
                penName: "Calendar Application",
                views: 23,
                commentsNum: 1,
                loves: 3
            }]
        }
    }
    getMostViewedPens(){
        axios.get('/api/pens/0?type=views')
            .then( res => {
                console.log(res.data)
                this.setState({
                    pens: res.data
                })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getMostViewedPens()
    }

    render() {

        let pensList = this.state.pens.map(pen => {
            let {pen_id, name, username, img_url, views, comments, likes, scripts, html, css, js } = pen;
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
        return (
            <div className="pensView">
                <div className="pens-sizing-container">
                    <div className="pensHeader">
                        <h1>Explore Pens</h1>
                        <h4>View More Pens</h4>
                    </div>
                    <div className="filterPens">
                        <h4>All Pens</h4>
                        <h4>Popular Pens</h4>
                        <h4>My Pens</h4>
                    </div>
                    <div className="pensDisplay">
                        {pensList}
                    </div>
                    <button>Next<img className="buttonArrow" src="http://i66.tinypic.com/2gufexh.jpg" alt="arrow"/></button>
                </div>
            </div>
        )
    }
}