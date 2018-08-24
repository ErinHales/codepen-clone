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
        let { html, css, js, penId } = monitor.getItem();
        if (monitor.getItem().gridItem) {
            let grid = monitor.getItem();
            let showcase = component.state;
            props.switchShowcase(grid, showcase);
        }
        else {
            let { html, css, js, penId } = monitor.getItem();
            props.addShowcaseMain(penId, css, html, js);
        }
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
        if (prevProps.penId !== this.props.penId) {
            let { penId, css, html, js } = this.props;
            this.setState({
                penId, css, html, js
            })
        }

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
