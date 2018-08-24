import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import flow from 'lodash.flow';

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}
const dropSource = {
    drop(props, monitor, component) {
        // console.log(props);
        // console.log(monitor.getItem());
        // console.log(component);
        let { html, css, js, penId } = monitor.getItem();
        // component.state.penId = penId;
        // component.state.css = css;
        // component.state.html = html;
        // component.state.js = js;

        props.addShowcaseMain(penId, css, html, js);
        // if (monitor.getItem().pen) {
        //     let currentPenId = props.penId
        //     let receivingPenId = monitor.getItem().pen.id;
        //     if (currentPenId != receivingPenId) {
        //         props.addShowcaseMain(monitor.getItem().pen.imgUrl, monitor.getItem().pen.id);
        //     }
        // }
        // else{
        //     let incomingPenId = monitor.getItem().penId;
        //     let showcasePenId = component.props.penId;
        //     let {gridItem, imgUrl} = monitor.getItem();
        //     let showcaseImg = component.props.img;
        //     props.switchShowcase(gridItem, imgUrl, showcaseImg, showcasePenId, incomingPenId);
        // }
    }
}

const itemSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
    }
}

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class Showcase_Main extends Component {
    constructor() {
        super();
        this.state = {
            penId: '',
            css: '',
            html: '',
            js: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
        // console.log(this.props)
        // if (this.props.penId !== prevProps.penId) {
        //     console.log(this.props.item)
        //     // let { penId, css, js, html } = this.props;
        //     // console.log(this.props);
        //     // this.setState({
        //     //     penId, css, js, html
        //     // })
        // }
        // console.log(this.props)

        // if( prevState.penId !== this.props.item.penId){
        //     let {penId, css, html, js} = this.props.item;
        //     this.setState({
        //         penId, css, html, js
        //     })
        // }
        // console.log(prevState)
    }

    render() {
        const { connectDropTarget, isDragging, hovered, item, connectDragSource } = this.props;
        const opacity = isDragging ? 0 : 1;
        const srcDoc = `${this.state.html}<style>${this.state.css}</style><script>${this.state.js}</script>`
        return connectDropTarget(
            connectDragSource(
                <div className="showcase-main">
                    <div style={{ opacity }} className="frame-overlay">
                        <iframe scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                    </div>
                    {/* <img style={{opacity}} src={this.state.imgUrl ? this.state.imgUrl : ''} alt="" /> */}
                </div>
            )
        )
    }
}


export default flow(
    DropTarget('item', dropSource, collectTarget),
    DragSource('item', itemSource, collectSource)
)(Showcase_Main);
