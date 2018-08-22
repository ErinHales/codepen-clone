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
        if (!component.state.imgUrl) {
            props.addItem(props.gridItem, monitor.getItem().pen.imgUrl, monitor.getItem().pen.id);      
        }
    }
}
class Showcase_Layout extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
            gridItems: [],
            penId: []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.imgUrl !== prevProps.imgUrl) {
            this.setState({ imgUrl: this.props.imgUrl })
        }
    }
    componentDidMount() {
        this.setState({
            imgUrl: this.props.imgUrl
        })
    }
    render() {
        const { connectDropTarget, connectDragSource, hovered, item, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDropTarget(
            connectDragSource(
                <div className="grid-item" >
                    <img style={{ opacity }} src={this.state.imgUrl ? this.state.imgUrl : ''} alt="" />
                </div>
            )
        )
    }
}

export default flow(
    DropTarget('item', dropSource, collectTarget),
    DragSource('item', itemSource, collectSource)
)(Showcase_Layout);