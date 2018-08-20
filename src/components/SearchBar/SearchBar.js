import React, {Component} from 'react';

export default class SearchBar extends Component {
    render() {
        return (
            <div className="searchBar">
                <input type="text" placeholder="Search"/>
                <div>
                    <button type="radio"></button>
                    <h5>Pens</h5>
                    <button type="radio"></button>
                    <h5>Users</h5>
                </div>
            </div>
        )
    }
}