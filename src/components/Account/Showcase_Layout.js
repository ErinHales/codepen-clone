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
        if (!monitor.getItem().hasOwnProperty('addShowcaseMain')) {
            let showcasePenId = props.showcase.penId;
            let gridPenId = monitor.getItem().penId;
            // Check if the item is already in the showcase
            if (showcasePenId !== gridPenId) {
                // This checks for duplicates in the small boxes
                let { css, html, js } = monitor.getItem();
                if (!component.state.imgUrl) {
                    props.addItem(props.gridItem, gridPenId);
                }
            }
        }
        else if (monitor.getItem().hasOwnProperty('addShowcaseMain') && props.penId) {

            monitor.getItem().switchShowcase(props, monitor.getItem());
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
            scripts: '',
            isEmpty: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.penId !== prevProps.penId) {
            this.setState({
                penId: this.props.penId,
                css: this.props.css,
                js: this.props.js,
                html: this.props.html,
                scripts: this.props.scripts
            })
        }
    }



    render() {
        let { html, js, css, penId, scripts, } = this.state;
        let srcDoc;
        let isEmpty = false;
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
            if(html || css || js){
                isEmpty = true;
            }
           
        }
        const { connectDropTarget, connectDragSource, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;
        return connectDropTarget(
            connectDragSource(
                <div className="grid-item"  >
                    <div styles={{ opacity }} className="frame-overlay">
                        <iframe style={{ backgroundColor: isEmpty ? 'white' : 'transparent' }} title={penId} scrolling="no" className="pen-iframe" srcDoc={srcDoc}></iframe>
                    </div>
                </div>
            )
        )
    }
}
export default flow(
    DropTarget('item', dropSource, collectTarget),
    DragSource('item', itemSource, collectSource)
)(Showcase_Layout);