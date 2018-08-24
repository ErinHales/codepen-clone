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
        // if (monitor.getItem().deleteShowcase) {
        //     let { img, penId } = monitor.getItem();
        //     monitor.getItem().deleteShowcase(img, penId)
        // }
        // else {
        //     console.log(monitor.getItem());
        //     monitor.getItem().deleteItem(monitor.getItem().gridItem);
        // }

        monitor.getItem().deleteItem(monitor.getItem().gridItem);

        console.log(monitor.getItem());

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