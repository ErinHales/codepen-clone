import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import flow from 'lodash.flow';
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

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}
const dropSource = {
    drop(props, monitor, component) {
        console.log(props);
        if (monitor.getItem().penId) {
            let showcasePenId = props.showcase.penId;
            let gridPenId = monitor.getItem().penId;
            // Check if the item is already in the showcase
            if (showcasePenId !== gridPenId) {
                // This checks for duplicates in the small boxes
                let { css, html, js } = monitor.getItem();
                if (!component.state.imgUrl) {
                    props.addItem(props.gridItem, css, html, js, gridPenId);
                }
            }
        }        
    }
}
class Showcase_Layout extends Component {
    constructor() {
        super();
        this.state = {
            penId: '',
            css: '',
            js: '',
            html: '',
            penId: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.penId !== prevProps.penId) {
            this.setState({
                penId: this.props.penId,
                css: this.props.css,
                js: this.props.js,
                html: this.props.html
            })
        }
    }

    render() {
        const { connectDropTarget, connectDragSource, hovered, item, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;
        const srcDoc = `${this.state.html}<style>${this.state.css}</style><script>${this.state.js}</script>`;
        return connectDropTarget(
            connectDragSource(
                <div styles={{ opacity }} className="grid-item"  >
                    <div   className="frame-overlay">
                        <iframe  scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                    </div>
                    {/* <img style={{ opacity }} src={this.state.imgUrl ? this.state.imgUrl : ''} alt="" /> */}
                </div>
            )
        )
    }
}

export default flow(
    DropTarget('item', dropSource, collectTarget),
    DragSource('item', itemSource, collectSource)
)(Showcase_Layout);