import React, {Component} from 'react';

export default class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            selected: 'pens'
        }
    }

    updateSelected = (selector) => {
        this.setState({
            selected: selector
        })
    }

    render() {
        let {selected} = this.state;
        return (
            <div className="searchBar">
                <input type="text" placeholder="Search" autofocus />
                <div>
                    <button onClick={() => this.updateSelected('pens')} style={{color: selected === "pens" ? "white" : "#757575"}}>Pens</button>
                    <button onClick={() => this.updateSelected('users')} style={{color: selected === "users" ? "white" : "#757575"}}>Users</button>
                </div>
            </div>
        )
    }
}