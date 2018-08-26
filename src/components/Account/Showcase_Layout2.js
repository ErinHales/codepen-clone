import React, { Component } from 'react';
import Showcase_Layout from './Showcase_Layout';
import Showcase_Main from './Showcase_Main';
import Showcase_Trash from './Showcase_Trash';
import axios from 'axios';
class Showcase_Layout2 extends Component {
    constructor() {
        super();
        this.state = {
            showCaseLayout: [{ id: 1, html: '', css: '', js: '', penId: '' }, { id: 2, html: '', css: '', js: '', penId: '' }, { id: 3, html: '', css: '', js: '', penId: '' }, { id: 4, html: '', css: '', js: '', penId: '' }, { id: 5, html: '', css: '', js: '', penId: '' }, { id: 6, html: '', css: '', js: '', penId: '' }],
            showCaseMain: { id: 0, penId: '', css: '', html: '', js: '' }
        }
    }
    deleteItem = penId => {
        console.log(penId);
        axios.delete(`/api/layout/${penId}`)
            .then(() => {
                let index = this.state.showCaseLayout.findIndex(e => e.penId === penId);
                let layout = this.state.showCaseLayout.slice();
                layout[index].html = '';
                layout[index].css = '';
                layout[index].js = '';
                layout[index].penId = '';
                this.setState({
                    showCaseLayout: layout
                })
            })
            .catch(err => console.log(err))

    }
    addItem = (gridId, css, html, js, penId) => {
        let gridIndex = this.state.showCaseLayout[gridId - 1];
        console.log(gridId);
        console.log(penId);
        // This is to replace a grid item fromt the left side
        if (gridIndex.penId) {
            axios.put('/api/layout', { penId, gridId })
                .then(() => {
                    let index = gridId - 1;
                    let layout = this.state.showCaseLayout.slice();
                    layout[index].penId = penId;
                    layout[index].html = html;
                    layout[index].css = css;
                    layout[index].js = js;
                    this.setState({
                        showCaseLayout: layout
                    })
                })
        }
        // This ensures that there arent any duplicates 
        else if(this.state.showCaseLayout.findIndex(item => item.penId === penId) === -1) {
            let index = gridId - 1;
            let layout = this.state.showCaseLayout.slice();
            layout[index].penId = penId;
            layout[index].html = html;
            layout[index].css = css;
            layout[index].js = js;
            axios.post('/api/layout', { penId, gridId })
                .then(() => {
                    this.setState({
                        showCaseLayout: layout
                    })
                })
                .catch(err => console.log(err));
        }
    }
    switchShowcase = (grid, showcase) => {
        // This is the index that the showcase is going to be switched with
        axios.put('/api/layout/showcase', { penId: grid.penId, gridId: grid.gridItem, showcasePen: showcase.penId })
            .then(() => {
                let index = this.state.showCaseLayout.findIndex(e => e.id === grid.gridItem);
                let layout = this.state.showCaseLayout.slice();
                layout[index].html = showcase.html;
                layout[index].css = showcase.css;
                layout[index].js = showcase.js
                layout[index].penId = showcase.penId;

                let showCase = this.state.showCaseMain;
                showCase.penId = grid.penId;
                showCase.html = grid.html;
                showCase.css = grid.css;
                showCase.js = grid.js;
                this.setState({
                    showCaseLayout: layout,
                    showCaseMain: showCase
                })

            })
    }
    addShowcaseMain = (penId, css, html, js) => {
        // Before adding to the showcase check the grid if it exists
        if (this.state.showCaseLayout.findIndex(e => e.penId === penId) === -1) {
            axios.post('/api/layout', { penId, gridId: 0 })
                .then(() => {
                    let obj = this.state.showCaseMain;
                    obj.penId = penId;
                    obj.css = css;
                    obj.html = html;
                    obj.js = js;
                    this.setState({ showcaseMain: obj });
                })
                .catch(err => console.log(err));
        }
    }
    deleteShowcase = (penId) => {
        let obj = { penId: '', css: '', html: '', js: '' };
        axios.delete(`/api/layout/${penId}`)
            .then(() => {
                this.setState({ showCaseMain: obj })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="showcase-layout">
                <div className="showcase-header">
                    <p>To Your Profile</p>
                    <h2>Over Here</h2>
                </div>
                <div className="showcase-layout-container">
                    <Showcase_Main deleteShowcase={this.deleteShowcase} switchShowcase={this.switchShowcase} penId={this.state.showCaseMain.penId} css={this.state.showCaseMain.css} html={this.state.showCaseMain.html} js={this.state.showCaseMain.js} addShowcaseMain={this.addShowcaseMain} />
                    <div className="showcase-grid">
                        {this.state.showCaseLayout.map(item => {
                            return (
                                <Showcase_Layout showcase={this.state.showCaseMain} penId={item.penId} addItem={this.addItem} key={item.id} deleteItem={this.deleteItem} gridItem={item.id} css={item.css} html={item.html} js={item.js} />
                            )
                        })}
                    </div>
                    <Showcase_Trash />
                </div>
            </div>
        )
    }
}

export default Showcase_Layout2;