import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const itemSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props, monitor, component) {
        if (monitor.didDrop()) {
        //     console.log(props);
        // console.log(monitor);
        // console.log(component);
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
        const { isDragging, connectDragSource, item, html, css, js } = this.props;
        console.log(html);
        console.log(css);
        const opacity = isDragging ? 0 : 1;
        const srcDoc = `${html}<style>${css}</style><script>${js}</script>`;
        return connectDragSource(
            <div style={{ opacity }} className="grid-item" >
                <div className="frame-overlay">
                    <iframe scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                </div>
            </div>
        )
    }
}
export default DragSource('item', itemSource, collect)(Showcase_Pens);