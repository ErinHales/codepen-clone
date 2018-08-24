import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}
const dropSource = {
    drop(props, monitor, component) {
        if (monitor.getItem().deleteShowcase) {
            console.log(monitor.getItem())
            monitor.getItem().deleteShowcase(monitor.getItem().penId);
        }
        else {
            console.log(monitor.getItem())
            monitor.getItem().deleteItem(monitor.getItem().penId);
        }





    }
}
class Showcase_Trash extends Component {
    render() {
        const { connectDropTarget, hovered, item, isDragging } = this.props;
        return connectDropTarget(
            <div className="delete-container">
                <i className="fa fa-trash"></i>
                <p>Drag Pens here to remove from your showcase</p>
            </div>
        )
    }
}

export default DropTarget('item', dropSource, collectTarget)(Showcase_Trash)