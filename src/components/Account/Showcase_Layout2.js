import React, { Component } from 'react';
import Showcase_Layout from './Showcase_Layout';
import Showcase_Main from './Showcase_Main';
import Showcase_Trash from './Showcase_Trash';

class Showcase_Layout2 extends Component {
    constructor() {
        super();
        this.state = {
            showCaseLayout: [{ id: 2, imgUrl: '', penId: '' }, { id: 3, imgUrl: '', penId: '' }, { id: 4, imgUrl: '', penId: '' }, { id: 5, imgUrl: '', penId: '' }, { id: 6, imgUrl: '', penId: '' }, { id: 7, imgUrl: '', penId: '' }],
            showCaseMain: { imgUrl: '', penId: '' },
        }
    }
    deleteItem = deleteId => {
        let index = this.state.showCaseLayout.findIndex(e => e.id === deleteId);
        let layout = this.state.showCaseLayout.slice();
        layout[index].imgUrl = '';
        this.setState({
            showCaseLayout: layout
        })
    }
    addItem = (gridItem, imgUrl, penId) => {
        let index = this.state.showCaseLayout.findIndex(e => e.id === gridItem);
        let layout = this.state.showCaseLayout.slice();
        layout[index].imgUrl = imgUrl;
        layout[index].penId = penId;
        this.setState({
            showCaseLayout: layout
        })
    }
    switchShowcase = (gridItem, gridImg, showcaseImg, showcasePenId, gridPenId) => {
        // This is the index that the showcase is going to be switched with
        let index = this.state.showCaseLayout.findIndex(e => e.id === gridItem);
        let layout = this.state.showCaseLayout.slice();
        layout[index].imgUrl = showcaseImg;
        layout[index].penId = showcasePenId;
        let obj = { imgUrl: gridImg, penId: gridPenId }
        this.setState({
            showCaseLayout: layout,
            showCaseMain: obj
        })
    }
    addShowcaseMain = (img, penId) => {
        let obj = { imgUrl: img, penId: penId }
        this.setState({ showCaseMain: obj })
    }
    render() {
        return (
            <div className="showcase-layout">
                <div className="showcase-header">
                    <p>To Your Profile</p>
                    <h2>Over Here</h2>
                </div>
                <div className="showcase-layout-container">
                    <Showcase_Main switchShowcase={this.switchShowcase} penId={this.state.showCaseMain.penId} img={this.state.showCaseMain.imgUrl} addShowcaseMain={this.addShowcaseMain} />
                    <div className="showcase-grid">
                        {this.state.showCaseLayout.map(item => {
                            return (
                                <Showcase_Layout penId={item.penId} addItem={this.addItem} key={item.id} deleteItem={this.deleteItem} gridItem={item.id} imgUrl={item.imgUrl} />
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