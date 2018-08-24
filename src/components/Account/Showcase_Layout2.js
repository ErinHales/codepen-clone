import React, { Component } from 'react';
import Showcase_Layout from './Showcase_Layout';
import Showcase_Main from './Showcase_Main';
import Showcase_Trash from './Showcase_Trash';

class Showcase_Layout2 extends Component {
    constructor() {
        super();
        this.state = {
            showCaseLayout: [{ id: 1, html: '', css: '', js: '', penId: '' }, { id: 2, html: '', css: '', js: '', penId: '' }, { id: 3, html: '', css: '', js: '', penId: '' }, { id: 4, html: '', css: '', js: '', penId: '' }, { id: 5, html: '', css: '', js: '', penId: '' }, { id: 6, html: '', css: '', js: '', penId: '' }],
            showCaseMain: { penId: '', csss: '', htmls: '', js: '' }
        }
    }
    deleteItem = deleteId => {
        let index = this.state.showCaseLayout.findIndex(e => e.id === deleteId);
        let layout = this.state.showCaseLayout.slice();
        layout[index].html = '';
        layout[index].css = '';
        layout[index].js = '';
        layout[index].penId = '';
        this.setState({
            showCaseLayout: layout
        })
    }
    addItem = (gridItem, css, html, js, penId) => {
        if (this.state.showCaseLayout.findIndex(e => e.penId === penId) === -1) {
            let index = this.state.showCaseLayout.findIndex(e => e.id === gridItem);
            let layout = this.state.showCaseLayout.slice();
            layout[index].penId = penId;
            layout[index].html = html;
            layout[index].css = css;
            layout[index].js = js;
            this.setState({
                showCaseLayout: layout
            })
        }
    }
    switchShowcase = (gridItem, gridImg, showcaseImg, showcasePenId, gridPenId) => {
        // This is the index that the showcase is going to be switched with
        if (gridImg) {
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
    }
    addShowcaseMain = (penId, css, html, js) => {
      let obj = this.state.showCaseMain;
      obj.penId = penId;
      obj.css = css;
      obj.html = html;
      obj.js = js;
        this.setState({ showcaseMain: obj});
    }

    deleteShowcase = (imgUrl, penId) => {
        let obj = { imgUrl: '', penId: '' };
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
                    <Showcase_Main deleteShowcase={this.deleteShowcase} switchShowcase={this.switchShowcase} penId={this.state.showCaseMain.penId} css={this.state.showCaseMain.css} html={this.state.showCaseMain.html} js={this.state.showCaseMain.js} addShowcaseMain={this.addShowcaseMain} />
                    <div className="showcase-grid">
                        {this.state.showCaseLayout.map(item => {
                            return (
                                <Showcase_Layout  showcase={this.state.showCaseMain} penId={item.penId} addItem={this.addItem} key={item.id} deleteItem={this.deleteItem} gridItem={item.id} css={item.css} html={item.html} js={item.js} />
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