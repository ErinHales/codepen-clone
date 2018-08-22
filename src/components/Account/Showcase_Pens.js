import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props, monitor, component) {
        if(!monitor.didDrop()){
            return;
        }
        // return props.handleDrop(props.pen.id);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

class Showcase_Pens extends Component {
    render() {
        const { isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDragSource(
            <div className="grid-item" style={{ opacity }}>
                <img src={this.props.pen.imgUrl} alt="" />
            </div>
        )
    }
}
export default DragSource('item', itemSource, collect)(Showcase_Pens);