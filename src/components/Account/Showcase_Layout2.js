import React, { Component } from 'react';
import Showcase_Layout from './Showcase_Layout';
import Showcase_Main from './Showcase_Main';
import Showcase_Trash from './Showcase_Trash';
import axios from 'axios';
class Showcase_Layout2 extends Component {
    constructor() {
        super();
        this.state = {
            showCaseLayout: [{ id: 1, html: '', css: '', js: '', penId: '', scripts: '' }, { id: 2, html: '', css: '', js: '', penId: '', scripts: '' }, { id: 3, html: '', css: '', js: '', penId: '', scripts: '' }, { id: 4, html: '', css: '', js: '', penId: '', scripts: '' }, { id: 5, html: '', css: '', js: '', penId: '', scripts: '' }, { id: 6, html: '', css: '', js: '', penId: '', scripts: '' }],
            showCaseMain: { id: 0, penId: '', css: '', html: '', js: '', scripts: '' }
        }
    }
    deleteItem = async penId => {
        let updatedGrid = this.state.showCaseLayout.filter(e => e.penId != '').map(e => {
            let { id, penId } = e;
            return Object.assign({}, { id: id, penId });
        });
        let index = updatedGrid.findIndex(e => e.penId === penId);
        // if the deleted item is last in the grid then you could just delte
        if (index === updatedGrid.length - 1) {
            axios.delete(`/api/layout/${penId}`)
                .then(() => {
                    
                    this.updateGrid();
                    this.props.showAlert();
                })
                .catch(err => console.log(err))
        }
        else {
            updatedGrid.splice(index, 1);
            for (let i = index; i < updatedGrid.length; i++) {
                updatedGrid[i].id -= 1;
            }
            await axios.delete(`/api/layout/${penId}`);
            await axios.put('/api/layout/position', { updatedGrid })
                .then(() => {
                   
                    this.updateGrid();
                    this.props.showAlert();
                })
        }
    }
    addItem = (gridId, penId) => {
        let gridIndex = this.state.showCaseLayout[gridId - 1];

        // IF the showcase is empty and item to showcase
        if (!this.state.showCaseMain.penId) {
            this.addShowcaseMain(penId);
        }
        // This is to replace a grid item fromt the left side
        else if (gridIndex.penId) {
            axios.put('/api/layout', { penId, gridId })
                .then(() => {
                    
                    this.updateGrid();
                    this.props.showAlert();
                })
        }
        // This ensures that there arent any duplicates 
        else if (this.state.showCaseLayout.findIndex(item => item.penId === penId) === -1) {
            let gridIndex = 0;
            for (let i = 0; i < this.state.showCaseLayout.length; i++) {
                if (!this.state.showCaseLayout[i].penId) {
                    gridIndex = i;
                    break;
                }
            }
            axios.post('/api/layout', { penId, gridId: gridIndex + 1 })
                .then(() => {
                   
                    this.updateGrid();
                    this.props.showAlert();
                })
                .catch(err => console.log(err));
        }
    }
    switchShowcase = (grid, showcase) => {
        // This is the index that the showcase is going to be switched with
        axios.put('/api/showcase', { penId: grid.penId, gridId: grid.gridItem, showcasePen: showcase.penId })
            .then(() => {
                this.updateGrid();
                this.props.showAlert();
            })
    }
    addShowcaseMain = (penId) => {
        // before adding something to the showcase check if it exist in the gird
        if (this.state.showCaseLayout.findIndex(e => e.penId === penId) === -1) {
            // If it the item is in the grid and wants to be showcase then showcase needs to be update
            if (this.state.showCaseMain.penId) {
                axios.put('/api/showcase', { penId })
                    .then(() => {
                        this.updateGrid();
                        this.props.showAlert();
                    })
            }
            // Showcase is empty and there is no other items on the grid
            else {
                axios.post('/api/layout', { penId, gridId: 0 })
                    .then(() => {
                        this.updateGrid();
                        this.props.showAlert();
                    })
                    .catch(err => console.log(err));
            }

        }
    }
    updateGrid() {
        let showcaseLayoutCopy = [{ id: 1, html: '', css: '', js: '', penId: '' }, { id: 2, html: '', css: '', js: '', penId: '' }, { id: 3, html: '', css: '', js: '', penId: '' }, { id: 4, html: '', css: '', js: '', penId: '' }, { id: 5, html: '', css: '', js: '', penId: '' }, { id: 6, html: '', css: '', js: '', penId: '' }];
        let showcaseMainCopy = Object.assign({}, this.state.showCaseMain);
        axios.get('/api/layout')
            .then(res => {
                console.log(res);
                if (res.data.length > 0) {
                    res.data.forEach((item, index) => {
                        if (index === 0) {
                            showcaseMainCopy.penId = item.pen_id;
                            showcaseMainCopy.css = item.css;
                            showcaseMainCopy.html = item.html;
                            showcaseMainCopy.js = item.js;
                            showcaseMainCopy.scripts = item.scripts;
                        }
                        else {
                            showcaseLayoutCopy[index - 1].penId = item.pen_id;
                            showcaseLayoutCopy[index - 1].css = item.css;
                            showcaseLayoutCopy[index - 1].html = item.html;
                            showcaseLayoutCopy[index - 1].js = item.js;
                            showcaseLayoutCopy[index - 1].scripts = item.scripts;
                        }
                    })
                    this.setState({
                        showCaseLayout: showcaseLayoutCopy,
                        showCaseMain: showcaseMainCopy
                    })
                }
                else {
                    this.setState({
                        showCaseMain: { id: 0, penId: '', css: '', html: '', js: '', scripts: '' }
                    })
                }
            })
            .catch(err => console.log(err))
    }
    deleteShowcase = async (penId) => {
        let obj = { penId: '', css: '', html: '', js: '' };
        // If the showcase is deleted than all items on grid have to move one position
        let gridItems = this.state.showCaseLayout.slice();
        let updatedGrid = gridItems.filter(e => e.penId != '').map(e => {
            let { id, penId } = e;
            return Object.assign({}, { id: --id, penId });
        });
        if (updatedGrid.length > 0) {
            await axios.delete(`/api/layout/${penId}`)
                .catch(err => console.log(err));
            await axios.put('/api/layout/position', { updatedGrid })
                .then(() => {
                    
                    this.updateGrid();
                    this.props.showAlert();
                })
        }
        else {
            axios.delete(`/api/layout/${penId}`)
                .then(() => {
                    this.updateGrid();
                    this.props.showAlert();
                })
                .catch(err => console.log(err));
        }
    }
    componentDidMount() {
        this.updateGrid();
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