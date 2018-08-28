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
            js: '',
            scripts: ''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.penId !== this.props.penId) {
            let { penId, css, html, js, scripts } = this.props;
            this.setState({
                penId, css, html, js, scripts
            })
        }

    }

    render() {
        let { html, js, css, penId, scripts, } = this.state;
        let srcDoc;
        if (scripts) {
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

            srcDoc = `
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
        }
        else {
            srcDoc = `${html}<style>${css}</style><script>${js}</script>`;
        }
        const { connectDropTarget, isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDropTarget(
            connectDragSource(
                <div className="showcase-main">
                    <div style={{ opacity }} className="frame-overlay">
                        <iframe  scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                    </div>
                </div>
            )
        )
    }
}


export default flow(
    DropTarget('item', dropSource, collectTarget),
    DragSource('item', itemSource, collectSource)
)(Showcase_Main);
