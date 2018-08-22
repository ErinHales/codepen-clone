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
        // console.log(props);
        console.log(monitor.getItem());
        monitor.getItem().deleteItem(monitor.getItem().gridItem);
        // console.log(monitor)
        // console.log(component);
        // console.log(monitor);
        // // console.log(monitor.getItem());
        // let gridItem = props.gridItem.id;

        // let targetId = monitor.targetId;
        // if (monitor.getItem().gridItem) {
        //     console.log('hello');
        //     return;
        // }
        // else {
        //     let url = monitor.getItem().pen.imgUrl;
        //     let urls = []
        //     monitor.internalMonitor.registry.dropTargets.forEach(e => {
        //         urls.push(e.ref.current.state.imgUrl);
        //     });
        //     if (component.state.imgUrl !== url && urls.indexOf(url) === -1) {
        //         component.state.imgUrl = url;
        //     }
        //     return;
        // }

    }
}
class Showcase_Trash extends Component {
    render() {
        const { connectDropTarget, hovered, item, isDragging } = this.props;
        return connectDropTarget(
            <div className="delete-container">
                <i className="fa fa-trash"></i>
                <p>Drap Pens here to remove from your showcase</p>
            </div>
        )
    }
}

export default DropTarget('item', dropSource, collectTarget)(Showcase_Trash)