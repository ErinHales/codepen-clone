import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import Pen from '../Pen/Pen';

const itemSource = {
    beginDrag(props) {
        return props;
    },
    endDrag(props, monitor, component) {
        if (monitor.didDrop()) {
            return;
        }
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
        const { isDragging, connectDragSource, item, html, css, js, pen_id, scripts, user_id } = this.props;
        const opacity = isDragging ? 0 : 1;

       
        let { css: cssList, html: htmlScripts, js: jsList } = scripts
        let { html_tag_class: htmlClassTag, head_tag: head } = htmlScripts

        // removing null
        if (!cssList[0]) cssList = []
        if (!jsList[0]) jsList = []
        if (!htmlClassTag) {
            htmlClassTag = ''
        }

        let stylesheetString = cssList.reduce((string, element) => {
            return string + `<link rel='stylesheet' href='${element}'>`
        }, '')

        let jsLibraryString = jsList.reduce((string, element) => {
            return string + `<script type='text/javascript' src='${element}'></script>`
        }, '')

        let srcDoc = `
        <html class='${htmlClassTag || ''}'>
            <head>
                ${stylesheetString}
                ${head || ''}            
            </head>
            <body>${html}</body>
            <style>${css}</style>
            ${jsLibraryString}
            
            <script>${js}</script>
        </html>`;

        // const srcDoc = `${html}<style>${css}</style><script>${js}</script>`;
        return connectDragSource(
            <div style={{ opacity }} className="grid-item" >
                <div className="frame-overlay">
                    <iframe style={{ backgroundColor: 'white' }} title={pen_id} scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                </div>
            </div>
        )
    }
}
export default DragSource('item', itemSource, collect)(Showcase_Pens);